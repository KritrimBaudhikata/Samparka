@echo off
echo ========================================
echo 🚀 Starting Samparka AI Contact Forms
echo ========================================
echo.

echo 📋 Checking environment...
if not exist .env (
    echo ❌ .env file not found!
    echo Please run quick-start.bat first to set up the project.
    pause
    exit /b 1
)

echo ✅ Environment file found

echo.
echo 🗄️ Checking database...
cd apps\server
if not exist prisma\dev.db (
    echo 📊 Database not found, creating...
    copy ..\..\.env .
    npm run db:generate
    npm run db:push
    npm run db:seed
    echo ✅ Database created and seeded
) else (
    echo ✅ Database exists
)

echo.
echo 🚀 Starting applications...
echo.

echo Starting backend server...
start "Samparka Server" cmd /k "cd /d %~dp0apps\server && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting web application...
start "Samparka Web" cmd /k "cd /d %~dp0apps\web && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Prisma Studio...
start "Prisma Studio" cmd /k "cd /d %~dp0apps\server && npm run db:studio"

echo.
echo ✅ Applications starting...
echo.
echo 🌐 Demo website: http://localhost:3000
echo 📊 Admin inbox: http://localhost:3000/inbox
echo 🔧 API health: http://localhost:3001/health
echo 🗄️ Database viewer: http://localhost:5555
echo.
echo 📝 Note: It may take a few seconds for the applications to fully start.
echo.
pause
