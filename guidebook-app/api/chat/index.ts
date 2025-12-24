import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { generateSystemPrompt } from '../../src/shared/utils/systemPrompt.js';

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

// Cache system prompt (generated once, reused)
let cachedSystemPrompt: string | null = null;
// Use shorter TTL in development (5 minutes) to pick up changes faster
// In production, this could be longer (1 hour)
const SYSTEM_PROMPT_TTL = process.env.NODE_ENV === 'production' 
  ? 1000 * 60 * 60 // 1 hour in production
  : 1000 * 60 * 5; // 5 minutes in development
let promptCacheTime = 0;

async function getSystemPrompt(): Promise<string> {
  const now = Date.now();
  if (cachedSystemPrompt && (now - promptCacheTime) < SYSTEM_PROMPT_TTL) {
    return cachedSystemPrompt;
  }
  
  cachedSystemPrompt = await generateSystemPrompt();
  promptCacheTime = now;
  return cachedSystemPrompt;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }
    
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set');
      return Response.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }
    
    const { messages } = await request.json();
    
    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    // Convert UIMessages to CoreMessages for AI SDK
    const coreMessages = convertToCoreMessages(messages);
    
    // Validate message length (check last message text content)
    const lastCoreMessage = coreMessages[coreMessages.length - 1];
    if (!lastCoreMessage || lastCoreMessage.role !== 'user') {
      return Response.json({ error: 'Invalid message format' }, { status: 400 });
    }
    
    const lastMessageText = typeof lastCoreMessage.content === 'string' 
      ? lastCoreMessage.content 
      : lastCoreMessage.content.map((part: any) => part.type === 'text' ? part.text : '').join('');
    
    if (!lastMessageText || lastMessageText.length > 1000) {
      return Response.json({ error: 'Message too long' }, { status: 400 });
    }
    
    // Truncate conversation history to last 15 messages (manage context window)
    // System prompt is ~1000 tokens, 15 messages ~3000 tokens, response ~500 tokens
    // Total: ~4500 tokens, well within GPT-3.5-turbo's 16k limit
    const recentMessages = coreMessages.slice(-15);
    
    const systemPrompt = await getSystemPrompt();
    const result = await streamText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-3.5-turbo'),
      system: systemPrompt,
      messages: recentMessages,
      temperature: 0.7,
      // maxTokens removed - not supported in AI SDK v5, model will use default
    });
    
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error instanceof Error ? error.message : String(error));
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    // Don't expose internal error details
    if (error instanceof Error && error.message.includes('API key')) {
      return Response.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }
    
    return Response.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}

