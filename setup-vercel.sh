#!/bin/bash

echo "🚀 Wealthwise Vercel Deployment Setup"
echo "====================================="
echo ""

echo "📋 Follow these steps to set up automatic deployment:"
echo ""

echo "1️⃣  Create Vercel Project:"
echo "   • Go to: https://vercel.com/dashboard"
echo "   • Click 'New Project'"
echo "   • Import repository: Nova-KO/wealthview"
echo "   • Click 'Deploy'"
echo ""

echo "2️⃣  Get Vercel Configuration:"
echo "   • Vercel Token: https://vercel.com/account/tokens"
echo "   • Project ID: Your project → Settings → General"
echo "   • Organization ID: Same page as Project ID"
echo ""

echo "3️⃣  Add GitHub Secrets:"
echo "   • Go to: https://github.com/Nova-KO/wealthview/settings/secrets/actions"
echo "   • Add these secrets:"
echo "     - VERCEL_TOKEN"
echo "     - VERCEL_ORG_ID" 
echo "     - VERCEL_PROJECT_ID"
echo ""

echo "4️⃣  Test Deployment:"
echo "   • Make any change to your code"
echo "   • Commit and push:"
echo "     git add . && git commit -m 'test' && git push"
echo "   • Check: https://github.com/Nova-KO/wealthview/actions"
echo ""

echo "✅ Once setup is complete, every push to main will automatically deploy!"
echo "🌐 Your site will be live at: https://wealthview.vercel.app"
echo ""

echo "📖 For detailed instructions, see: DEPLOYMENT.md" 