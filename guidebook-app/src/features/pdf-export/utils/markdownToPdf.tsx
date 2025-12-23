import { marked } from 'marked';
import type { Tokens } from 'marked';
import { Text, View, Link } from '@react-pdf/renderer';
import type React from 'react';

/**
 * Parses markdown text to tokens
 * 
 * Handles edge cases:
 * - Empty or null text
 * - Very long text
 * - Malformed markdown
 * 
 * @param text - Markdown text to parse
 * @returns Array of markdown tokens (empty array if parsing fails)
 */
export function parseMarkdown(text: string): Array<Tokens.Generic> {
  // Handle empty or null text
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  // Handle very long text (warn but allow)
  if (text.length > 10000) {
    console.warn('Parsing very long markdown text:', text.length, 'characters');
  }
  
  try {
    const lexer = new marked.Lexer();
    const tokens = lexer.lex(text);
    return Array.isArray(tokens) ? (tokens as Array<Tokens.Generic>) : [];
  } catch (error) {
    // Handle malformed markdown gracefully
    console.warn('Markdown parsing error:', error);
    // Return a simple paragraph token with the text as-is
    return [{
      type: 'paragraph',
      raw: text,
      text: text,
      tokens: [{ type: 'text', raw: text, text: text }],
    } as Tokens.Paragraph];
  }
}

/**
 * Converts markdown tokens to @react-pdf/renderer components
 * 
 * @param tokens - Array of markdown tokens
 * @returns Array of React PDF elements
 */
export function renderMarkdownToPdf(
  tokens: Array<Tokens.Generic>
): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  let elementIndex = 0;

  for (const token of tokens) {
    const key = `md-${elementIndex++}`;
    switch (token.type) {
      case 'heading': {
        const heading = token as Tokens.Heading;
        const fontSize = heading.depth === 1 ? 18 : heading.depth === 2 ? 16 : 14;
        elements.push(
          <Text key={key} style={{ fontSize, fontWeight: 'bold', marginTop: 8, marginBottom: 4 }}>
            {heading.text}
          </Text>
        );
        break;
      }

      case 'paragraph': {
        const paragraph = token as Tokens.Paragraph;
        const textElements = renderInlineElements(paragraph.tokens || [], `${key}-inline`);
        elements.push(
          <View key={key} style={{ marginBottom: 8 }}>
            {textElements}
          </View>
        );
        break;
      }

      case 'list': {
        const list = token as Tokens.List;
        const listItems = list.items.map((item, index) => {
          const itemText = renderInlineElements(item.tokens || [], `${key}-item-${index}-inline`);
          return (
            <View key={`${key}-item-${index}`} style={{ marginBottom: 4, paddingLeft: 12 }}>
              <Text style={{ marginLeft: -8 }}>
                {list.ordered ? `${index + 1}. ` : '• '}
              </Text>
              {itemText}
            </View>
          );
        });
        elements.push(
          <View key={key} style={{ marginBottom: 8 }}>
            {listItems}
          </View>
        );
        break;
      }

      case 'code': {
        const code = token as Tokens.Code;
        elements.push(
          <Text key={key} style={{ fontFamily: 'Courier', fontSize: 10, marginBottom: 8 }}>
            {code.text}
          </Text>
        );
        break;
      }

      case 'blockquote': {
        const blockquote = token as Tokens.Blockquote;
        const quoteElements = renderMarkdownToPdf(blockquote.tokens || []);
        elements.push(
          <View key={key} style={{ marginLeft: 12, marginBottom: 8, borderLeft: '2 solid #ccc', paddingLeft: 8 }}>
            {quoteElements}
          </View>
        );
        break;
      }

      case 'hr': {
        elements.push(
          <View key={key} style={{ borderBottom: '1 solid #ccc', marginTop: 8, marginBottom: 8 }} />
        );
        break;
      }

      default:
        // For unknown token types, try to extract text
        if ('text' in token) {
          elements.push(
            <Text key={key} style={{ marginBottom: 4 }}>
              {(token as any).text}
            </Text>
          );
        }
        break;
    }
  }

  return elements;
}

/**
 * Renders inline markdown elements (bold, italic, links, etc.)
 * 
 * @param tokens - Array of inline tokens
 * @param keyPrefix - Prefix for generating unique keys
 * @returns Array of React PDF elements
 */
function renderInlineElements(tokens: Array<Tokens.Generic>, keyPrefix: string): React.ReactElement[] {
  const elements: React.ReactElement[] = [];
  let currentText = '';
  let currentStyle: Record<string, any> = {};
  let inlineIndex = 0;

  for (const token of tokens) {
    const key = `${keyPrefix}-${inlineIndex++}`;
    switch (token.type) {
      case 'text': {
        const textToken = token as Tokens.Text;
        currentText += textToken.text;
        break;
      }

      case 'strong': {
        const strongToken = token as Tokens.Strong;
        // Flush current text
        if (currentText) {
          elements.push(
            <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
              {currentText}
            </Text>
          );
          currentText = '';
        }
        // Render strong content
        const strongElements = renderInlineElements(strongToken.tokens || [], `${key}-strong`);
        elements.push(
          <Text key={key} style={{ ...currentStyle, fontWeight: 'bold' }}>
            {strongElements}
          </Text>
        );
        break;
      }

      case 'em': {
        const emToken = token as Tokens.Em;
        // Flush current text
        if (currentText) {
          elements.push(
            <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
              {currentText}
            </Text>
          );
          currentText = '';
        }
        // Render em content
        const emElements = renderInlineElements(emToken.tokens || [], `${key}-em`);
        elements.push(
          <Text key={key} style={{ ...currentStyle, fontStyle: 'italic' }}>
            {emElements}
          </Text>
        );
        break;
      }

      case 'link': {
        const linkToken = token as Tokens.Link;
        // Flush current text
        if (currentText) {
          elements.push(
            <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
              {currentText}
            </Text>
          );
          currentText = '';
        }
        // For external links, use Link component
        // For internal guidebook links, display as text with URL
        if (linkToken.href.startsWith('http://') || linkToken.href.startsWith('https://')) {
          const linkText = renderInlineElements(linkToken.tokens || [], `${key}-link`);
          elements.push(
            <Link key={key} src={linkToken.href} style={{ color: '#0066cc' }}>
              {linkText}
            </Link>
          );
        } else {
          // Internal link - display as text with URL
          const linkText = renderInlineElements(linkToken.tokens || [], `${key}-link`);
          elements.push(
            <Text key={key} style={{ ...currentStyle, color: '#0066cc' }}>
              {linkText} ({linkToken.href})
            </Text>
          );
        }
        break;
      }

      case 'code': {
        const codeToken = token as Tokens.Code;
        // Flush current text
        if (currentText) {
          elements.push(
            <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
              {currentText}
            </Text>
          );
          currentText = '';
        }
        elements.push(
          <Text key={key} style={{ ...currentStyle, fontFamily: 'Courier', fontSize: 10 }}>
            {codeToken.text}
          </Text>
        );
        break;
      }

      case 'br': {
        // Flush current text and add line break
        if (currentText) {
          elements.push(
            <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
              {currentText}
            </Text>
          );
          currentText = '';
        }
        elements.push(
          <Text key={key} style={currentStyle}>
            {'\n'}
          </Text>
        );
        break;
      }

      default:
        // For unknown inline tokens, try to extract text
        if ('text' in token) {
          currentText += (token as any).text;
        }
        break;
    }
  }

  // Flush any remaining text
  if (currentText) {
    elements.push(
      <Text key={`${keyPrefix}-text-${elements.length}`} style={currentStyle}>
        {currentText}
      </Text>
    );
  }

  return elements;
}

/**
 * Convenience function to parse and render a markdown string
 * 
 * Handles edge cases:
 * - Empty or null text
 * - Parsing errors
 * 
 * @param text - Markdown text to render
 * @returns React PDF element
 */
export function renderMarkdownString(text: string): React.ReactElement {
  // Handle empty or null text
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return (
      <View>
        <Text style={{ fontSize: 10, color: '#999', fontStyle: 'italic' }}>
          (No content)
        </Text>
      </View>
    );
  }
  
  try {
    const tokens = parseMarkdown(text);
    const elements = renderMarkdownToPdf(tokens);
    
    // Handle case where parsing returns no elements
    if (!elements || elements.length === 0) {
      return (
        <View>
          <Text style={{ fontSize: 10 }}>{text}</Text>
        </View>
      );
    }
    
    return (
      <View>
        {elements}
      </View>
    );
  } catch (error) {
    // Fallback: render as plain text if markdown rendering fails
    console.warn('Markdown rendering error:', error);
    return (
      <View>
        <Text style={{ fontSize: 10 }}>{text}</Text>
      </View>
    );
  }
}

