#!/bin/bash
# Script to configure GitHub Secrets for portfolio-cv
# Run this script after installing GitHub CLI (gh)

set -e

echo "🔐 Configuring GitHub Secrets for portfolio-cv"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo ""
    echo "Install it with:"
    echo "  macOS:  brew install gh"
    echo "  Ubuntu: sudo apt install gh"
    echo "  Or visit: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "🔑 Authenticating with GitHub..."
    gh auth login
fi

echo "📝 Setting up secrets..."
echo ""

# SonarQube Token
echo "Setting SONAR_TOKEN..."
gh secret set SONAR_TOKEN \
    --repo Maf38/portfolio-cv \
    --body "sqp_961b9a7b7951a8e0f4dcc49d65e5a189e57692a5"

# SonarQube Host URL
echo "Setting SONAR_HOST_URL..."
gh secret set SONAR_HOST_URL \
    --repo Maf38/portfolio-cv \
    --body "https://sonarqube.maflabs.fr"

echo ""
echo "✅ Secrets configured successfully!"
echo ""
echo "Verifying secrets..."
gh secret list --repo Maf38/portfolio-cv

echo ""
echo "🎉 Done! GitHub Actions can now access SonarQube."
