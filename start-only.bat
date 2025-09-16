@echo off
echo ========================================
echo 🚀 Quick Start - Samparka AI Forms
echo ========================================
echo.

echo 🚀 Starting backend server...
start "Samparka Server" cmd /k "cd /d %~dp0apps\server && npm run dev"

timeout /t 2 /nobreak > nul

echo 🚀 Starting web application...
start "Samparka Web" cmd /k "cd /d %~dp0apps\web && npm run dev"

echo.
echo ✅ Applications starting...
echo.
echo 🌐 Demo website: http://localhost:3000
echo 📊 Admin inbox: http://localhost:3000/inbox
echo 🔧 API health: http://localhost:3001/health
echo.
echo 📝 Note: It may take a few seconds for the applications to fully start.
echo.
pause
