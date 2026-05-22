#!/bin/bash

# Quick Setup Script for Blind Assistive Head Tech Guide
# Run with: bash setup.sh

echo "🚀 Setting up Blind Assistive Head Tech - Audio User Guide"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Update it with your OpenAI API key if needed."
else
    echo "✅ .env file already exists"
fi

# Show next steps
echo ""
echo "=================================================="
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. (Optional) Update .env with your OpenAI API key"
echo "2. Run: npm run dev"
echo "3. Open http://localhost:5173 in your browser"
echo "4. Test voice commands and features"
echo ""
echo "For deployment, see DEPLOYMENT.md"
echo "For more info, see README.md"
echo "=================================================="
