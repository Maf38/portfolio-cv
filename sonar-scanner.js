const { default: scanner } = require('sonarqube-scanner');
require('dotenv').config();

// Detect branch name from environment or git
const branchName = process.env.BRANCH_NAME || process.env.GITHUB_REF_NAME || 'main';
const isPR = process.env.IS_PR === 'true' || !!process.env.PR_NUMBER;

// Base configuration
const baseOptions = {
  'sonar.projectKey': 'portfolio-cv',
  'sonar.projectName': 'Portfolio CV Angular',
  'sonar.projectVersion': '1.0.0',
  'sonar.organization': 'maflabs',
  'sonar.sources': 'src',
  'sonar.tests': 'src',
  'sonar.test.inclusions': '**/*.spec.ts',
  'sonar.exclusions':
    '**/*.spec.ts,**/*.mock.ts,**/node_modules/**,**/dist/**,**/coverage/**,.angular/**',
  'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
  'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
  'sonar.sourceEncoding': 'UTF-8',
  'sonar.coverage.exclusions':
    '**/*.spec.ts,**/*.mock.ts,**/*.module.ts,**/*.config.ts,**/main.ts,**/environments/**',
  'sonar.qualitygate.wait': true,
  'sonar.qualitygate.timeout': 300,
};

// Add branch-specific options (requires Community Branch Plugin)
if (branchName !== 'main' && !isPR) {
  baseOptions['sonar.branch.name'] = branchName;
  console.log(`📊 Analyzing branch: ${branchName}`);
}

// Add PR-specific options (requires Community Branch Plugin)
if (isPR) {
  baseOptions['sonar.pullrequest.key'] = process.env.PR_NUMBER;
  baseOptions['sonar.pullrequest.branch'] = process.env.PR_BRANCH || branchName;
  baseOptions['sonar.pullrequest.base'] = process.env.PR_BASE_BRANCH || 'main';
  console.log(`🔀 Analyzing PR #${process.env.PR_NUMBER}: ${baseOptions['sonar.pullrequest.branch']} → ${baseOptions['sonar.pullrequest.base']}`);
}

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'https://sonarqube.maflabs.fr',
    token: process.env.SONAR_TOKEN,
    options: baseOptions,
  },
  () => {
    console.log('✅ SonarQube analysis completed');
    process.exit();
  },
  error => {
    console.error('❌ SonarQube analysis failed:', error);
    process.exit(1);
  }
);
