#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== React Black Player - Clean Installation Script ===${NC}\n"

# Get the test project path
TEST_PROJECT_PATH="${1:-/Users/lynkto/Projects/video-player-test}"
PACKAGE_PATH="/Users/lynkto/Projects/cccc/react-black-player-1.0.1.tgz"

echo -e "${YELLOW}Test Project Path:${NC} $TEST_PROJECT_PATH"
echo -e "${YELLOW}Package Path:${NC} $PACKAGE_PATH\n"

# Check if test project exists
if [ ! -d "$TEST_PROJECT_PATH" ]; then
    echo -e "${RED}Error: Test project directory not found at $TEST_PROJECT_PATH${NC}"
    echo -e "${YELLOW}Usage: ./install-clean.sh [test-project-path]${NC}"
    exit 1
fi

# Check if package exists
if [ ! -f "$PACKAGE_PATH" ]; then
    echo -e "${RED}Error: Package not found at $PACKAGE_PATH${NC}"
    exit 1
fi

cd "$TEST_PROJECT_PATH" || exit 1

echo -e "${GREEN}Step 1:${NC} Uninstalling old package..."
npm uninstall react-black-player 2>/dev/null || echo "Package not installed"

echo -e "\n${GREEN}Step 2:${NC} Removing node_modules and lock files..."
rm -rf node_modules package-lock.json

echo -e "\n${GREEN}Step 3:${NC} Removing all Vite cache directories..."
rm -rf .vite dist/.vite node_modules/.vite

echo -e "\n${GREEN}Step 4:${NC} Cleaning npm cache..."
npm cache clean --force

echo -e "\n${GREEN}Step 5:${NC} Installing new package..."
npm install "$PACKAGE_PATH"

echo -e "\n${GREEN}Step 6:${NC} Reinstalling all dependencies..."
npm install

echo -e "\n${GREEN}Step 7:${NC} Verifying installation..."
if npm list react-black-player &>/dev/null; then
    echo -e "${GREEN}✓ Package installed successfully!${NC}"
    echo -e "\n${YELLOW}Installed version:${NC}"
    npm list react-black-player
else
    echo -e "${RED}✗ Installation failed!${NC}"
    exit 1
fi

echo -e "\n${GREEN}Step 8:${NC} Checking package contents..."
if [ -d "node_modules/react-black-player/dist" ]; then
    echo -e "${GREEN}✓ Package dist folder found${NC}"
    ls -lh node_modules/react-black-player/dist/
else
    echo -e "${RED}✗ Package dist folder not found!${NC}"
    exit 1
fi

echo -e "\n${GREEN}=== Installation Complete! ===${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. If dev server is running, stop it (Ctrl+C)"
echo "2. Start the dev server: npm run dev"
echo "3. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)"
echo -e "\n${YELLOW}Import in your code:${NC}"
echo "import { ReactBlackPlayer } from 'react-black-player';"
echo "import 'react-black-player/dist/style.css';"
