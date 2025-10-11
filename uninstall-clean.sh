#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== React Black Player - Complete Uninstall Script ===${NC}\n"

# Get the test project path
TEST_PROJECT_PATH="${1:-$(pwd)}"

echo -e "${YELLOW}Project Path:${NC} $TEST_PROJECT_PATH\n"

# Check if we're in a valid project directory
if [ ! -f "$TEST_PROJECT_PATH/package.json" ]; then
    echo -e "${RED}Error: No package.json found in $TEST_PROJECT_PATH${NC}"
    echo -e "${YELLOW}Usage: ./uninstall-clean.sh [project-path]${NC}"
    echo -e "${YELLOW}Or run from within your project directory: ./uninstall-clean.sh${NC}"
    exit 1
fi

cd "$TEST_PROJECT_PATH" || exit 1

echo -e "${GREEN}Step 1:${NC} Uninstalling react-black-player..."
if npm list react-black-player &>/dev/null; then
    npm uninstall react-black-player
    echo -e "${GREEN}✓ Package uninstalled${NC}"
else
    echo -e "${YELLOW}Package not installed${NC}"
fi

echo -e "\n${GREEN}Step 2:${NC} Removing node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo -e "${GREEN}✓ node_modules removed${NC}"
else
    echo -e "${YELLOW}node_modules not found${NC}"
fi

echo -e "\n${GREEN}Step 3:${NC} Removing package-lock.json..."
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo -e "${GREEN}✓ package-lock.json removed${NC}"
else
    echo -e "${YELLOW}package-lock.json not found${NC}"
fi

echo -e "\n${GREEN}Step 4:${NC} Removing all Vite cache directories..."
CACHE_REMOVED=false

if [ -d ".vite" ]; then
    rm -rf .vite
    echo -e "${GREEN}✓ .vite/ removed${NC}"
    CACHE_REMOVED=true
fi

if [ -d "dist/.vite" ]; then
    rm -rf dist/.vite
    echo -e "${GREEN}✓ dist/.vite/ removed${NC}"
    CACHE_REMOVED=true
fi

if [ -d "node_modules/.vite" ]; then
    rm -rf node_modules/.vite
    echo -e "${GREEN}✓ node_modules/.vite/ removed${NC}"
    CACHE_REMOVED=true
fi

if [ "$CACHE_REMOVED" = false ]; then
    echo -e "${YELLOW}No Vite cache found${NC}"
fi

echo -e "\n${GREEN}Step 5:${NC} Cleaning npm cache..."
npm cache clean --force
echo -e "${GREEN}✓ npm cache cleaned${NC}"

echo -e "\n${GREEN}Step 6:${NC} Verifying cleanup..."
if npm list react-black-player &>/dev/null; then
    echo -e "${RED}✗ Package still installed!${NC}"
else
    echo -e "${GREEN}✓ Package successfully removed${NC}"
fi

if [ -d "node_modules" ]; then
    echo -e "${RED}✗ node_modules still exists${NC}"
else
    echo -e "${GREEN}✓ node_modules removed${NC}"
fi

if [ -f "package-lock.json" ]; then
    echo -e "${RED}✗ package-lock.json still exists${NC}"
else
    echo -e "${GREEN}✓ package-lock.json removed${NC}"
fi

echo -e "\n${GREEN}=== Cleanup Complete! ===${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Run: npm install (to reinstall all dependencies)"
echo "2. Or install a different version: npm install <package>"
echo ""
echo -e "${YELLOW}To install react-black-player again:${NC}"
echo "npm install /Users/lynkto/Projects/cccc/react-black-player-1.0.1.tgz"
