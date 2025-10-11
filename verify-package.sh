#!/bin/bash

echo "=== React Black Player Package Verification ==="
echo ""

PACKAGE_PATH="/Users/lynkto/Projects/cccc/react-black-player-1.0.1.tgz"

echo "📦 Package Info:"
ls -lh "$PACKAGE_PATH"
echo ""

echo "🔍 Extracting and checking content..."
cd /tmp
rm -rf package 2>/dev/null
tar -xzf "$PACKAGE_PATH"

echo ""
echo "✅ Checking for .react-black-player class in CSS:"
if grep -q "\.react-black-player" /tmp/package/dist/style.css; then
    echo "   ✓ Found .react-black-player selectors in CSS"
    echo "   Count: $(grep -o "\.react-black-player" /tmp/package/dist/style.css | wc -l) occurrences"
else
    echo "   ✗ NOT found - package may not be updated"
fi

echo ""
echo "✅ Checking for old react-video-player classes:"
if grep -q "react-video-player" /tmp/package/dist/style.css; then
    echo "   ✗ OLD classes still present!"
else
    echo "   ✓ No old classes found - clean!"
fi

echo ""
echo "✅ Checking JavaScript bundle:"
if grep -q "react-black-player" /tmp/package/dist/index.esm.js; then
    echo "   ✓ Found react-black-player in JS bundle"
else
    echo "   ✗ NOT found in JS bundle"
fi

echo ""
echo "✅ CSS file size:"
ls -lh /tmp/package/dist/style.css | awk '{print "   " $5 " - " $9}'

echo ""
echo "✅ Outline removal styles:"
if grep -q "outline:none!important" /tmp/package/dist/style.css; then
    echo "   ✓ Outline removal styles present"
else
    echo "   ✗ Outline removal styles missing"
fi

echo ""
echo "📁 Package contents:"
tar -tzf "$PACKAGE_PATH" | grep "^package/dist/"

echo ""
echo "=== Package is ready to install ==="
echo ""
echo "Install command:"
echo "npm install $PACKAGE_PATH"

rm -rf /tmp/package
