# Chatbot Local Development Setup

## The Issue

The chatbot API route (`/api/chat`) returns a 404 error in local development because Vite doesn't automatically serve API routes. These routes are designed to run as Vercel serverless functions.

## Solution Options

### Option 1: Use Full Dev Setup (Recommended for Local Development)

This runs both Vite and a local API server:

1. **Set up environment variables**:
   Create a `.env.local` file in the `guidebook-app` directory:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

2. **Run both servers**:
   ```bash
   npm run dev:full
   ```
   
   This will:
   - Start Vite on `http://localhost:5173`
   - Start API server on `http://localhost:3001`
   - Vite will proxy `/api/*` requests to the API server

### Option 2: Run Servers Separately

If you prefer to run them separately:

**Terminal 1** (Vite):
```bash
npm run dev
```

**Terminal 2** (API Server):
```bash
npm run dev:api
```

### Option 3: Use Vercel CLI

For production-like environment:

```bash
npm run dev:vercel
```

Note: This requires Vercel CLI and may need project linking.

## Production

When deployed to Vercel, the API routes in the `api/` directory are automatically detected and deployed as serverless functions. No additional configuration needed.

## Troubleshooting

### 404 Error on `/api/chat`
- Make sure both servers are running (if using Option 1 or 2)
- Check that `api/chat/route.ts` exists
- Verify environment variables are set in `.env.local`

### API Key Error
- Ensure `OPENAI_API_KEY` is set in `.env.local`
- The API key should not have the `VITE_` prefix (it's server-side only)
- Restart the API server after changing environment variables

