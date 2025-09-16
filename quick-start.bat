@echo off
echo ========================================
echo 🚀 Samparka AI Contact Forms - Quick Start
echo ========================================
echo.

echo 📋 Step 1: Setting up environment...
if not exist .env (
    echo Copying environment template...
    copy env.template .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo 📝 Step 2: Configure your LLM provider
echo.
echo 🔧 To use DeepSeek (recommended):
echo    1. Edit .env file
echo    2. Add: DEEPSEEK_API_KEY=sk-your-key-here
echo    3. Keep: LLM_PROVIDER=deepseek
echo.
echo 🔧 To use OpenAI:
echo    1. Edit .env file  
echo    2. Add: OPENAI_API_KEY=sk-your-key-here
echo    3. Change: LLM_PROVIDER=openai
echo.
echo 🔧 To use Demo Mode (no API key needed):
echo    Just leave the API keys empty - system will use mock responses
echo.

echo 📦 Step 3: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🏗️ Step 4: Building packages...
cd packages\playbooks && npm run build && cd ..\shared && npm run build && cd ..\..

echo.
echo 🗄️ Step 5: Setting up database...
cd apps\server
copy ..\..\.env .
npm run db:generate
npm run db:push
npm run db:seed
cd ..\..

echo.
echo 🚀 Step 6: Starting applications...
echo.
echo Starting backend server...
start "Samparka Server" cmd /k "cd apps\server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting web application...
start "Samparka Web" cmd /k "cd apps\web && npm run dev"

echo.
echo ✅ Setup complete! Applications starting...
echo.
echo 🌐 Demo website: http://localhost:3000
echo 📊 Admin inbox: http://localhost:3000/inbox
echo 🔧 API health: http://localhost:3001/health
echo.
echo 📖 For detailed setup instructions, see: EASY_LLM_SWITCHING.md
echo.
pause
