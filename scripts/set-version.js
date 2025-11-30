const fs = require('fs');
const path = require('path');

// Read version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Get build date
const buildDate = new Date().toISOString();

// Create version info object
const versionInfo = {
  version: version,
  buildDate: buildDate,
};

// Write to src/environments/version.ts
const versionFilePath = path.join(__dirname, '../src/environments/version.ts');
const versionFileContent = `// This file is auto-generated during build - DO NOT EDIT
export const VERSION_INFO = {
  version: '${version}',
  buildDate: '${buildDate}',
};
`;

fs.writeFileSync(versionFilePath, versionFileContent, 'utf8');

console.log(`✅ Version info generated: v${version} (${buildDate})`);
