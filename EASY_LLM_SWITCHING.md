# 🔧 Easy LLM Switching Guide

## 🎯 Super Simple Setup

### Step 1: Copy the Template
```bash
copy env.template .env
```

### Step 2: Choose Your LLM Provider
Edit `.env` file and change **ONLY** this line:

```env
# For DeepSeek (recommended - better regional support)
LLM_PROVIDER=deepseek

# OR for OpenAI
LLM_PROVIDER=openai
```

### Step 3: Add Your API Key
Add your API key to the corresponding section:

```env
# If using DeepSeek
DEEPSEEK_API_KEY=sk-your-actual-deepseek-key-here

# If using OpenAI  
OPENAI_API_KEY=sk-your-actual-openai-key-here
```

## 🚀 That's It!

The system will automatically:
- ✅ Use the correct API endpoint
- ✅ Use the right model name
- ✅ Handle all configuration
- ✅ Show which provider is active

## 🔄 Switching Between Providers

### To Switch to DeepSeek:
1. Change `LLM_PROVIDER=deepseek` in `.env`
2. Add your `DEEPSEEK_API_KEY`
3. Restart the server

### To Switch to OpenAI:
1. Change `LLM_PROVIDER=openai` in `.env`
2. Add your `OPENAI_API_KEY`
3. Restart the server

## 📋 What You'll See

When the server starts, you'll see:
```
Using DEEPSEEK LLM Service
🚀 Server running on port 3001
```

Or:
```
Using OPENAI LLM Service
🚀 Server running on port 3001
```

## 🛡️ Security

- ✅ API keys are only in `.env` file
- ✅ No hardcoded keys in code
- ✅ `.env` is gitignored
- ✅ Single source of truth

## 🎉 Benefits

- **One Line Change**: Switch providers instantly
- **Single File**: All config in one `.env` file
- **Auto-Detection**: System handles everything
- **Clean Code**: No messy conditionals
- **Secure**: Keys only in environment

## 🔧 Advanced Usage

### Using Environment Variable
You can also set the provider via environment variable:
```bash
set LLM_PROVIDER=deepseek
npm run dev
```

### Fallback to Mock
If no API key is provided, the system automatically uses Mock AI responses for demo purposes.

## 🚨 Troubleshooting

### "Unknown LLM provider" Error
- Check that `LLM_PROVIDER` is exactly `deepseek` or `openai`
- No extra spaces or quotes

### API Key Not Working
- Make sure the key is in the correct section
- No quotes around the key value
- Key starts with `sk-`

### Server Not Starting
- Check that `.env` file exists
- Verify all required fields are present
- Restart the server after changes

## 🎯 Quick Commands

```bash
# Copy template
copy env.template .env

# Start server
npm run dev

# Check which provider is active
# Look at server startup logs
```

**That's it! Super simple LLM switching with just one line change!** 🚀
