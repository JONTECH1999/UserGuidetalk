@echo off
REM Quick Setup Script for Blind Assistive Head Tech Guide
REM Run with: setup.bat

echo 🚀 Setting up Blind Assistive Head Tech - Audio User Guide
echo ==================================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed successfully!

REM Create .env file if it doesn't exist
if not exist .env (
    echo.
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ .env file created. Update it with your OpenAI API key if needed.
) else (
    echo ✅ .env file already exists
)

REM Show next steps
echo.
echo ==================================================
echo ✨ Setup complete!
echo.
echo Next steps:
echo 1. (Optional) Update .env with your OpenAI API key
echo 2. Run: npm run dev
echo 3. Open http://localhost:5173 in your browser
echo 4. Test voice commands and features
echo.
echo For deployment, see DEPLOYMENT.md
echo For more info, see README.md
echo ==================================================
