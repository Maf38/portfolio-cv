# Portfolio CV - Guide de Setup Complet

> Guide étape par étape pour mettre en place tous les outils de développement
> Date: 2025-11-09
> Pré-requis: Node.js 18+, Git, Docker (pour SonarQube local si besoin)

## 📋 Table des Matières

1. [Phase 0: Vérifications Pré-requis](#phase-0-vérifications-pré-requis)
2. [Phase 1: Initialisation Projet Angular](#phase-1-initialisation-projet-angular)
3. [Phase 2: Configuration Tailwind CSS](#phase-2-configuration-tailwind-css)
4. [Phase 3: Configuration ESLint + Prettier + SonarLint](#phase-3-configuration-eslint--prettier--sonarlint)
5. [Phase 4: Vérification Linters](#phase-4-vérification-linters)
6. [Phase 5: Configuration SonarQube](#phase-5-configuration-sonarqube)
7. [Phase 6: Git - Création et Protection Branches](#phase-6-git---création-et-protection-branches)
8. [Phase 7: Configuration GitHub Actions](#phase-7-configuration-github-actions)
9. [Phase 8: Import JIRA](#phase-8-import-jira)
10. [Workflows de Développement](#workflows-de-développement)

---

## Phase 0: Vérifications Pré-requis

### Vérifier installations

```bash
# Node.js version (minimum 18)
node --version
# Devrait afficher: v18.x.x ou v20.x.x

# npm version
npm --version

# Git version
git --version

# Angular CLI (installation si nécessaire)
npm install -g @angular/cli@latest

# Vérifier Angular CLI
ng version
```

### Clés et Tokens nécessaires

- [ ] **GitHub Personal Access Token** : Pour protection branches et GitHub Actions
- [ ] **SonarQube Token** : https://sonarqube.maflabs.fr/ (générer un token)
- [ ] **JIRA API Token** : https://maflabs.atlassian.net (déjà configuré dans .mcp.json)

---

## Phase 1: Initialisation Projet Angular

### Étape 1.1: Créer le projet Angular

```bash
cd /workspace-side-project/portfolio-cv

# Initialiser Angular avec standalone components
ng new . \
  --standalone \
  --routing \
  --style=css \
  --skip-git=false \
  --package-manager=npm

# Répondre aux questions:
# Would you like to add Angular routing? Yes
# Which stylesheet format would you like to use? CSS
```

### Étape 1.2: Vérifier que le projet fonctionne

```bash
# Lancer le serveur de dev
ng serve

# Ouvrir http://localhost:4200
# Devrait afficher la page d'accueil Angular par défaut
```

### Étape 1.3: Structure du projet créée

```
portfolio-cv/
├── src/
│   ├── app/
│   │   ├── app.component.ts      # Composant principal (standalone)
│   │   ├── app.config.ts         # Configuration de l'app
│   │   └── app.routes.ts         # Routes
│   ├── assets/                   # Déjà créé avec cv-data.json
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── tsconfig.app.json
```

---

## Phase 2: Configuration Tailwind CSS

### Étape 2.1: Installer Tailwind CSS

```bash
# Installer Tailwind et ses dépendances
npm install -D tailwindcss postcss autoprefixer

# Initialiser la configuration Tailwind
npx tailwindcss init
```

### Étape 2.2: Configurer Tailwind

Éditer `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy Theme (brittanychiang.com)
        navy: {
          darkest: '#0a192f',
          dark: '#112240',
          DEFAULT: '#1d2d50',
          light: '#233554',
        },
        slate: {
          lightest: '#ccd6f6',
          light: '#a8b2d1',
          DEFAULT: '#8892b0',
          dark: '#495670',
        },
        mint: {
          DEFAULT: '#64ffda',
          dark: '#57e6c5',
          light: '#7afde4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Étape 2.3: Importer Tailwind dans styles.css

Éditer `src/styles.css` :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

/* Reset et base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #0a192f;
  color: #ccd6f6;
  line-height: 1.6;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
```

### Étape 2.4: Tester Tailwind

Modifier `src/app/app.component.ts` pour tester :

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="min-h-screen bg-navy-darkest flex items-center justify-center">
      <h1 class="text-6xl font-bold text-slate-lightest">
        Hello <span class="text-mint">Tailwind</span>
      </h1>
    </div>
  `,
})
export class AppComponent {
  title = 'portfolio-cv';
}
```

Relancer `ng serve` et vérifier que les styles Tailwind s'appliquent.

---

## Phase 3: Configuration ESLint + Prettier + SonarLint

### Étape 3.1: Installer ESLint pour Angular

```bash
# Ajouter ESLint à Angular
ng add @angular-eslint/schematics

# Installer Prettier et intégrations
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
```

### Étape 3.2: Configurer ESLint

Créer `.eslintrc.json` à la racine :

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "prettier"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": ["warn", { "allow": ["warn", "error"] }],
        "prefer-const": "error",
        "curly": "error",
        "eqeqeq": ["error", "always"],
        "no-var": "error"
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility"
      ],
      "rules": {}
    }
  ]
}
```

### Étape 3.3: Configurer Prettier

Créer `.prettierrc.json` :

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

Créer `.prettierignore` :

```
# Directories
dist
node_modules
coverage
.angular

# Files
package-lock.json
*.log
```

### Étape 3.4: Ajouter scripts dans package.json

Éditer `package.json`, ajouter dans `"scripts"` :

```json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "format": "prettier --write \"src/**/*.{ts,html,css,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,css,scss,json}\""
  }
}
```

### Étape 3.5: Configurer VSCode pour SonarLint

Créer `.vscode/extensions.json` :

```json
{
  "recommendations": [
    "angular.ng-template",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "sonarsource.sonarlint-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

Créer `.vscode/settings.json` :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": ["javascript", "typescript", "html"],
  "sonarlint.connectedMode.project": {
    "projectKey": "portfolio-cv"
  }
}
```

---

## Phase 4: Vérification Linters

### Étape 4.1: Tester ESLint

```bash
# Lancer ESLint
npm run lint

# Devrait afficher: "All files pass linting" ou des warnings/errors à corriger
```

### Étape 4.2: Tester Prettier

```bash
# Vérifier formatage
npm run format:check

# Formater tous les fichiers
npm run format
```

### Étape 4.3: Fixer les erreurs de lint

```bash
# Auto-fix ce qui peut l'être
npm run lint:fix
```

### Étape 4.4: Configurer pre-commit hook (optionnel mais recommandé)

```bash
# Installer Husky
npm install -D husky lint-staged

# Initialiser Husky
npx husky init
```

Créer `.husky/pre-commit` :

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Ajouter dans `package.json` :

```json
{
  "lint-staged": {
    "src/**/*.{ts,html}": [
      "eslint --fix",
      "prettier --write"
    ],
    "src/**/*.{css,scss,json}": [
      "prettier --write"
    ]
  }
}
```

---

## Phase 5: Configuration SonarQube

### Étape 5.1: Créer le projet sur SonarQube

1. Aller sur https://sonarqube.maflabs.fr/
2. Se connecter
3. Créer nouveau projet :
   - **Project key** : `portfolio-cv`
   - **Display name** : Portfolio CV Angular
4. Générer un token :
   - Name : `github-actions`
   - Type : `Global Analysis Token`
   - **Copier le token** (il ne sera affiché qu'une fois)

### Étape 5.2: Créer sonar-project.properties

Créer `sonar-project.properties` à la racine :

```properties
# Project identification
sonar.projectKey=portfolio-cv
sonar.projectName=Portfolio CV Angular
sonar.projectVersion=1.0

# Source code
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.exclusions=**/node_modules/**,**/dist/**,**/coverage/**,**/*.spec.ts

# TypeScript/JavaScript
sonar.typescript.lcov.reportPaths=coverage/portfolio-cv/lcov.info
sonar.javascript.lcov.reportPaths=coverage/portfolio-cv/lcov.info

# Code coverage
sonar.coverage.exclusions=**/*.spec.ts,**/*.module.ts,**/main.ts,**/polyfills.ts,**/environment*.ts

# Encoding
sonar.sourceEncoding=UTF-8

# Quality Gate
sonar.qualitygate.wait=true
```

### Étape 5.3: Configurer coverage dans angular.json

Éditer `angular.json`, trouver la section `"test"` et ajouter :

```json
{
  "test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
      "codeCoverage": true,
      "codeCoverageExclude": [
        "src/**/*.spec.ts",
        "src/main.ts",
        "src/polyfills.ts"
      ]
    }
  }
}
```

### Étape 5.4: Ajouter script de test avec coverage

Dans `package.json`, ajouter :

```json
{
  "scripts": {
    "test:coverage": "ng test --no-watch --code-coverage --browsers=ChromeHeadless"
  }
}
```

### Étape 5.5: Tester SonarQube localement (optionnel)

```bash
# Installer SonarScanner (si pas déjà fait)
npm install -D sonarqube-scanner

# Lancer analyse locale
npx sonar-scanner \
  -Dsonar.host.url=https://sonarqube.maflabs.fr \
  -Dsonar.token=YOUR_SONAR_TOKEN
```

---

## Phase 6: Git - Création et Protection Branches

### Étape 6.1: Initialiser Git (si pas déjà fait)

```bash
cd /workspace-side-project/portfolio-cv

# Vérifier si git est initialisé
git status

# Si pas initialisé:
git init
git add .
git commit -m "PORTFOLIO-1: Initialize Angular 17 project with standalone components"
```

### Étape 6.2: Créer le repository GitHub

```bash
# Via GitHub CLI (recommandé)
gh repo create portfolio-cv --public --source=. --remote=origin

# OU manuellement sur github.com, puis:
git remote add origin https://github.com/YOUR_USERNAME/portfolio-cv.git
```

### Étape 6.3: Créer la branche develop

```bash
# Créer et push branche main
git branch -M main
git push -u origin main

# Créer branche develop
git checkout -b develop
git push -u origin develop

# Retour sur main
git checkout main
```

### Étape 6.4: Protéger les branches sur GitHub

Via interface GitHub :

1. Aller sur `Settings` > `Branches`
2. Cliquer `Add branch protection rule`

**Pour la branche `main`** :
- Branch name pattern : `main`
- ✅ Require a pull request before merging
- ✅ Require approvals : 0 (pour projet solo)
- ✅ Require status checks to pass before merging
  - Rechercher et ajouter : `lint`, `test`, `sonarqube`
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings
- ✅ Restrict pushes that create matching branches (personne ne peut push directement)

**Pour la branche `develop`** :
- Même config que `main`

### Étape 6.5: Configuration Git locale

Créer `.gitignore` (normalement déjà créé par Angular) :

```gitignore
# See http://help.github.com/ignore-files/ for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

# SonarQube
.scannerwork/

# Environment files (secrets)
.env
.env.local
```

---

## Phase 7: Configuration GitHub Actions

### Étape 7.1: Créer le workflow CI/CD

Créer `.github/workflows/ci-cd.yml` :

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    name: Lint Code
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check code formatting
        run: npm run format:check

  test:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: actions/upload-artifact@v4
        with:
          name: coverage-reports
          path: coverage/

  sonarqube:
    name: SonarQube Analysis
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones should be disabled for better analysis

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: SonarQube Scan
        uses: sonarsource/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: https://sonarqube.maflabs.fr

      - name: SonarQube Quality Gate check
        uses: sonarsource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for production
        run: npm run build -- --configuration production --base-href=/portfolio-cv/

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/portfolio-cv

  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: [build, sonarqube]
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/portfolio-cv

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/portfolio-cv/browser
          cname: portfolio.maflabs.fr  # Optionnel: si domaine custom
```

### Étape 7.2: Ajouter les secrets GitHub

1. Aller sur GitHub : `Settings` > `Secrets and variables` > `Actions`
2. Cliquer `New repository secret`
3. Ajouter :
   - **Name** : `SONAR_TOKEN`
   - **Secret** : (coller le token SonarQube généré plus tôt)

### Étape 7.3: Tester le workflow

```bash
# Créer une branche de test
git checkout -b feature/PORTFOLIO-1-test-ci

# Faire un petit changement
echo "# Portfolio CV" > README.md
git add README.md
git commit -m "PORTFOLIO-1: Add README for CI test"

# Push
git push -u origin feature/PORTFOLIO-1-test-ci

# Créer une Pull Request sur GitHub
gh pr create --base develop --title "PORTFOLIO-1: Test CI/CD pipeline" --body "Testing CI/CD setup"
```

Vérifier que tous les checks passent (lint, test, sonarqube, build).

---

## Phase 8: Import JIRA

### Étape 8.1: Créer le projet JIRA

Via interface JIRA (https://maflabs.atlassian.net) :

1. Cliquer `Create project`
2. Template : **Scrum**
3. Nom : `Portfolio CV`
4. Key : `PORTFOLIO` (ou `PCV`)
5. Créer

### Étape 8.2: Configurer le board

1. Board settings
2. Colonnes : `Backlog` | `To Do` | `In Progress` | `Code Review` | `Done`
3. Sprints : Créer `MVP Sprint 1` (5 jours)

### Étape 8.3: Créer les Epics (via MCP JIRA ou manuellement)

**Option A : Via interface JIRA** (plus simple pour démarrer)

Créer 4 Epics :

1. **PORTFOLIO-EPIC-1** : Project Setup & Infrastructure
2. **PORTFOLIO-EPIC-2** : Core Features Development
3. **PORTFOLIO-EPIC-3** : Testing & Quality Assurance
4. **PORTFOLIO-EPIC-4** : Deployment & Go-Live

**Option B : Via MCP JIRA** (automatisé, à implémenter)

Utiliser le serveur MCP JIRA configuré dans `.mcp.json`.

### Étape 8.4: Importer toutes les tasks

Référence : `docs/ACTION-PLAN.md` et `docs/EPICS.md`

Pour chaque Epic, créer les tasks listées (38 tasks au total).

**Exemple pour EPIC-1** :
- PORTFOLIO-1 : Initialize Angular 17+ project ✅ (fait)
- PORTFOLIO-2 : Install and configure Tailwind CSS ✅ (fait)
- PORTFOLIO-3 : Setup ESLint, Prettier, SonarLint ✅ (en cours)
- PORTFOLIO-4 : Create GitHub repo with branch protection ⏳
- PORTFOLIO-5 : Setup GitHub Actions CI/CD ⏳
- PORTFOLIO-6 : Integrate SonarQube ⏳
- PORTFOLIO-7 : Create documentation files ✅ (fait)

### Étape 8.5: Configuration labels JIRA

Créer les labels suivants :
- `type::setup`
- `type::feature`
- `type::test`
- `type::ci-cd`
- `type::documentation`
- `priority::critical`
- `priority::high`
- `priority::medium`
- `priority::low`
- `epic::infrastructure`
- `epic::features`
- `epic::quality`
- `epic::deployment`

---

## Workflows de Développement

Voir fichiers séparés :
- `docs/WORKFLOW-FEATURES.md` : Workflow de production des features
- `docs/WORKFLOW-TESTS.md` : Workflow de tests

---

## ✅ Checklist Finale de Vérification

Avant de commencer le développement, vérifier que :

### Infrastructure
- [ ] Angular 17+ fonctionne (`ng serve`)
- [ ] Tailwind CSS fonctionne (styles appliqués)
- [ ] ESLint passe (`npm run lint`)
- [ ] Prettier fonctionne (`npm run format`)
- [ ] SonarLint actif dans VSCode
- [ ] Tests passent (`npm test`)
- [ ] Coverage générée (`npm run test:coverage`)

### Git & GitHub
- [ ] Repository créé sur GitHub
- [ ] Branche `main` créée et protégée
- [ ] Branche `develop` créée et protégée
- [ ] Protection requiert PR + status checks
- [ ] `.gitignore` correct

### CI/CD
- [ ] GitHub Actions workflow créé
- [ ] Secret `SONAR_TOKEN` ajouté
- [ ] Workflow teste : lint ✅
- [ ] Workflow teste : test ✅
- [ ] Workflow teste : sonarqube ✅
- [ ] Workflow teste : build ✅
- [ ] Deploy configuré (main only)

### SonarQube
- [ ] Projet créé sur https://sonarqube.maflabs.fr/
- [ ] Token généré
- [ ] `sonar-project.properties` configuré
- [ ] Quality Gate défini

### JIRA
- [ ] Projet créé (`PORTFOLIO` ou `PCV`)
- [ ] Board Scrum configuré
- [ ] 4 Epics créés
- [ ] Labels créés
- [ ] Sprint MVP créé

### Documentation
- [ ] CLAUDE.md complet ✅
- [ ] UX-UI-GUIDELINES.md complet ✅
- [ ] EPICS.md complet ✅
- [ ] ACTION-PLAN.md complet ✅
- [ ] CV-CONTENT-EXHAUSTIVE.md complet ✅
- [ ] cv-data.json créé ✅
- [ ] SETUP-GUIDE.md (ce fichier) ✅
- [ ] WORKFLOW-FEATURES.md (à créer)
- [ ] WORKFLOW-TESTS.md (à créer)

---

## 🚀 Prêt à Développer !

Une fois toutes ces étapes complétées, vous pouvez commencer le développement avec :

```bash
# Créer une branche pour la première feature
git checkout develop
git pull origin develop
git checkout -b feature/PORTFOLIO-10-home-hero-section

# Développer...
# Commit selon conventions
git add .
git commit -m "PORTFOLIO-10: Create home page hero section with CTA"

# Push et créer PR
git push -u origin feature/PORTFOLIO-10-home-hero-section
gh pr create --base develop --title "PORTFOLIO-10: Home hero section" --body "Implements hero section as per UX guidelines"
```

---

**Dernière mise à jour** : 2025-11-09
**Status** : Guide complet - Ready for execution
**Prochaine étape** : Exécuter Phase 1 à Phase 7
