@echo off
echo ========================================
echo 🛑 Stopping Samparka AI Contact Forms
echo ========================================
echo.

echo 🛑 Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
if %errorlevel% equ 0 (
    echo ✅ All Node.js processes stopped
) else (
    echo ℹ️ No Node.js processes were running
)

echo.
echo 🛑 Stopping all cmd windows with "Samparka" in title...
taskkill /f /fi "WINDOWTITLE eq Samparka Server*" 2>nul
taskkill /f /fi "WINDOWTITLE eq Samparka Web*" 2>nul

echo.
echo ✅ All applications stopped
echo.
pause
