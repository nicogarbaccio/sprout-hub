#!/bin/bash

# Pre-merge verification script for SproutHub
set -e

echo "🚀 Starting SproutHub Pre-Merge Verification..."
echo "=================================================="

# 1. Lint check
echo "📝 Running lint check..."
npm run lint

# 2. TypeScript build check
echo "🔧 Building for production..."
npm run build

# 3. Test PWA build
echo "📱 Testing PWA build..."
echo "Checking manifest and service worker..."
if [ -f "dist/manifest.webmanifest" ]; then
    echo "✅ PWA manifest found"
else
    echo "❌ PWA manifest missing"
    exit 1
fi

if [ -f "dist/sw.js" ]; then
    echo "✅ Service worker found"
else
    echo "❌ Service worker missing"
    exit 1
fi

# 4. iOS build test
echo "📱 Testing iOS Capacitor build..."
npm run ios:build

# 5. Run tests
echo "🧪 Running tests..."
npm run test

echo ""
echo "✅ All checks passed! Ready to merge to main."
echo "==================================================" 