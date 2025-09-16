# 🚀 Quick Setup Instructions

## ✅ Issues Fixed:
- ✅ Next.js config warning resolved
- ✅ TypeScript errors in widget fixed
- ✅ Accessibility issues resolved
- ✅ Inline styles moved to CSS classes
- ✅ Environment files created

## 🔑 LLM API Key (Optional - Demo Mode Available)

### 🎯 Super Simple Setup

1. **Copy the template**:
   ```bash
   copy env.template .env
   ```

2. **Choose your LLM provider** - Edit `.env` and change **ONLY** this line:
   ```env
   LLM_PROVIDER=deepseek  # or 'openai'
   ```

3. **Add your API key** to the corresponding section in `.env`

### Option 1: DeepSeek (Recommended - Better Regional Support)
1. **Go to DeepSeek Platform**: https://platform.deepseek.com/
2. **Sign up** for a free account
3. **Create an API key**
4. **Add to `.env`**:
   ```env
   LLM_PROVIDER=deepseek
   DEEPSEEK_API_KEY=sk-your-deepseek-key-here
   ```

### Option 2: OpenAI (Alternative)
1. **Go to OpenAI Platform**: https://platform.openai.com/api-keys
2. **Create a new secret key**
3. **Add to `.env`**:
   ```env
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-your-openai-key-here
   ```

### Option 3: Demo Mode (If No API Available)
If no API key is provided, the system automatically uses **Mock AI responses** for demonstration purposes.

**📖 For detailed instructions, see `EASY_LLM_SWITCHING.md`**

## 🚀 Start the Application

### Option 1: Use the batch file
```bash
start.bat
```

### Option 2: Manual start
```bash
# Terminal 1 - Backend
cd apps\server
npm run dev

# Terminal 2 - Frontend  
cd apps\web
npm run dev
```

## 🧪 Test the System

1. **Demo website**: http://localhost:3000
2. **Admin inbox**: http://localhost:3000/inbox
3. **API test page**: Open `test-api.html` in your browser
4. **Health check**: http://localhost:3001/health

## 💬 Try the AI Forms

1. **Sales Form**: "Hi, I'm interested in your product"
2. **Appointment Form**: "I need to book an appointment"  
3. **Support Form**: "I'm having trouble with the app"

## 🆘 Troubleshooting

### Server won't start?
- Make sure you added your OpenAI API key to `.env`
- Check that the key starts with `sk-`

### Widget errors?
- The widget builds with warnings but should work
- TypeScript errors are fixed with `!` assertions

### Database issues?
- Database is already created and seeded
- Sample data is ready to view in the inbox

## 📱 What's Working

- ✅ Database with sample leads
- ✅ API endpoints (chat, leads, health)
- ✅ Web interface with 3 form types
- ✅ Admin inbox with filtering
- ✅ Slack notifications (if webhook configured)
- ✅ Embeddable widget

The MVP is ready to showcase! 🎉
