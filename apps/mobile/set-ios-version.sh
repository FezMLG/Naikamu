#!/bin/bash
set -e

# Sets iOS MARKETING_VERSION and CURRENT_PROJECT_VERSION from package.json
# (version -> MARKETING_VERSION, codeVersion -> CURRENT_PROJECT_VERSION)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_JSON="$SCRIPT_DIR/package.json"
PBXPROJ="$SCRIPT_DIR/ios/Naikamu.xcodeproj/project.pbxproj"

VERSION=$(node -p "require('$PACKAGE_JSON').version")
BUILD=$(node -p "require('$PACKAGE_JSON').codeVersion")

if [[ -z "${VERSION}" || "${VERSION}" == "undefined" ]]; then
  echo "Missing 'version' in package.json."
  exit 1
fi

if [[ ! "${BUILD}" =~ ^[0-9]+$ ]]; then
  echo "Invalid 'codeVersion' in package.json: '${BUILD}'. It must be an integer."
  exit 1
fi

#---

sed -i '' -E "s/MARKETING_VERSION = [^;]+;/MARKETING_VERSION = ${VERSION};/g" "$PBXPROJ"
sed -i '' -E "s/CURRENT_PROJECT_VERSION = [^;]+;/CURRENT_PROJECT_VERSION = ${BUILD};/g" "$PBXPROJ"

echo "iOS version set to ${VERSION} (${BUILD})"

exit 0
