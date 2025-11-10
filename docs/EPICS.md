# Portfolio CV - Epics & Features Structure

> Structure détaillée des epics et features pour JIRA
> Méthodologie: Scrum avec sprints 2 semaines (adapté à 5 jours pour MVP)
> Date: 2025-11-09

## 📋 Vue d'Ensemble des Epics

### MVP Scope (Sprint 1 - 5 jours)

| Epic ID | Epic Name | Tasks | Heures | Priority | Status |
|---------|-----------|-------|--------|----------|--------|
| EPIC-1 | Project Setup & Infrastructure | 7 | 6.5h | Critical | 🟡 To Do |
| EPIC-2 | Core Features Development | 20 | 36.5h | Critical | 🟡 To Do |
| EPIC-3 | Testing & Quality Assurance | 7 | 12.5h | High | 🟡 To Do |
| EPIC-4 | Deployment & Go-Live | 4 | 4h | High | 🟡 To Do |

**Total MVP**: 38 tasks, 59.5 heures (~7.5 jours)

### Post-MVP / Premium Features

| Epic ID | Epic Name | Heures | Priority | Status |
|---------|-----------|--------|----------|--------|
| EPIC-5 | Advanced Interactions & Animations | 8h | Medium | 📦 Backlog |
| EPIC-6 | Admin Panel for CV Editing | 12h | Low | 📦 Backlog |
| EPIC-7 | Blog & Articles Section | 15h | Low | 📦 Backlog |
| EPIC-8 | Dark/Light Theme Toggle | 6h | Low | 📦 Backlog |

---

## Epic 1: Project Setup & Infrastructure

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-1
**Summary**: Setup complete development environment with quality tools and CI/CD
**Description**:
Initialize Angular 17+ project with all required tooling for professional development: linting, testing, code quality scanning, and automated deployment pipeline. This epic ensures the foundation is solid before any feature development.

**Acceptance Criteria**:
- ✅ Angular 17+ project initialized with standalone components
- ✅ Tailwind CSS configured and working
- ✅ ESLint, Prettier, SonarLint integrated
- ✅ GitHub repo created with branch protection (main, develop)
- ✅ GitHub Actions CI/CD pipeline operational
- ✅ SonarQube integration on https://sonarqube.maflabs.fr/
- ✅ All documentation files created

**Business Value**: Ensures code quality, maintainability, and professional DevOps practices from day 1

**Dependencies**: None (first epic to execute)

**Labels**: `epic::infrastructure`, `priority::critical`

---

### Tasks Breakdown

#### PORTFOLIO-1: Initialize Angular 17+ project with standalone components
**Type**: Setup
**Priority**: Highest
**Estimate**: 0.5h

**Description**:
Create new Angular project using Angular CLI with standalone components architecture (no NgModules).

**Acceptance Criteria**:
- Angular 17+ installed globally (`npm install -g @angular/cli`)
- Project created: `ng new portfolio-cv --standalone --routing --style=css`
- Standalone components enabled by default
- Routing module configured
- Dev server runs without errors (`ng serve`)
- Project structure follows Angular best practices

**Technical Notes**:
```bash
ng new portfolio-cv \
  --standalone \
  --routing \
  --style=css \
  --skip-git=false
```

**Definition of Done**:
- [ ] Project created
- [ ] `ng serve` works
- [ ] Git initialized
- [ ] Initial commit made

---

#### PORTFOLIO-2: Install and configure Tailwind CSS
**Type**: Setup
**Priority**: Highest
**Estimate**: 0.5h

**Description**:
Add Tailwind CSS with JIT mode for rapid styling development.

**Acceptance Criteria**:
- Tailwind CSS installed via npm
- `tailwind.config.js` configured with content paths
- Base Tailwind directives in `src/styles.css`
- JIT mode enabled
- Custom colors defined (navy, slate, mint)
- Tailwind working in components

**Technical Notes**:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Definition of Done**:
- [ ] Tailwind installed
- [ ] Config file customized
- [ ] Base styles imported
- [ ] Test component styled with Tailwind classes works

---

#### PORTFOLIO-3: Setup ESLint, Prettier, and SonarLint
**Type**: Setup
**Priority**: High
**Estimate**: 1h

**Description**:
Configure code quality tools for consistent code style and linting.

**Acceptance Criteria**:
- ESLint installed with Angular rules
- Prettier installed and configured
- ESLint + Prettier integrated (no conflicts)
- SonarLint extension recommended in `.vscode/extensions.json`
- Scripts added to `package.json`: `lint`, `format`
- Pre-commit hooks configured (optional with Husky)

**Technical Notes**:
```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
npm install -D @angular-eslint/builder @angular-eslint/eslint-plugin
```

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@angular-eslint/recommended",
    "prettier"
  ]
}
```

**Definition of Done**:
- [ ] ESLint runs without errors
- [ ] Prettier formats code correctly
- [ ] No linting errors in existing code
- [ ] npm run lint passes

---

#### PORTFOLIO-4: Create GitHub repository with branch protection
**Type**: Setup
**Priority**: High
**Estimate**: 0.5h

**Description**:
Initialize Git repository, push to GitHub, and configure branch protection rules.

**Acceptance Criteria**:
- GitHub repository created (public or private)
- Branches created: `main`, `develop`
- Branch protection enabled on `main` and `develop`:
  - Require pull request before merging
  - Require status checks to pass (CI)
  - No direct pushes allowed
- `.gitignore` configured for Angular/Node.js
- README.md with project description
- Initial commit pushed

**Definition of Done**:
- [ ] Repo created on GitHub
- [ ] Branches protected
- [ ] Code pushed to `main`
- [ ] `develop` branch created

---

#### PORTFOLIO-5: Setup GitHub Actions CI/CD pipeline
**Type**: CI/CD
**Priority**: High
**Estimate**: 1.5h

**Description**:
Create GitHub Actions workflow for automated lint, test, build, and deployment.

**Acceptance Criteria**:
- Workflow file created: `.github/workflows/ci-cd.yml`
- Jobs defined:
  1. **Lint**: Run ESLint
  2. **Test**: Run unit tests (when added)
  3. **Build**: Build Angular project
  4. **Deploy**: Deploy to GitHub Pages (on `main` branch only)
- Workflow triggers on push to `main` and `develop`, and on PRs
- Status badges added to README

**Technical Notes**:
```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build --configuration production

  deploy:
    needs: [lint, build]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build -- --base-href=/portfolio-cv/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/portfolio-cv
```

**Definition of Done**:
- [ ] Workflow file created
- [ ] Pipeline runs on push
- [ ] All jobs pass
- [ ] Badges in README

---

#### PORTFOLIO-6: Integrate SonarQube code quality scanning
**Type**: CI/CD
**Priority**: High
**Estimate**: 1h

**Description**:
Add SonarQube analysis to CI/CD pipeline for continuous code quality monitoring.

**Acceptance Criteria**:
- SonarQube project created on https://sonarqube.maflabs.fr/
- Project key: `portfolio-cv`
- SonarQube token generated and added to GitHub Secrets
- `sonar-project.properties` configured
- SonarQube scan runs in GitHub Actions after tests
- Quality Gate defined: Coverage >80%, 0 bugs, 0 vulnerabilities

**Technical Notes**:
```properties
# sonar-project.properties
sonar.projectKey=portfolio-cv
sonar.organization=maflabs
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts
sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

```yaml
# Add to .github/workflows/ci-cd.yml
sonarqube:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm ci
    - run: npm run test:coverage
    - uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Definition of Done**:
- [ ] SonarQube project created
- [ ] Scan runs in CI
- [ ] Quality Gate configured
- [ ] First scan completes successfully

---

#### PORTFOLIO-7: Create project documentation files
**Type**: Documentation
**Priority**: Medium
**Estimate**: 1.5h

**Description**:
Create comprehensive documentation files for the project.

**Acceptance Criteria**:
- ✅ `CLAUDE.md`: Project context, conventions, stack (already created)
- ✅ `docs/UX-UI-GUIDELINES.md`: Design system from brittanychiang.com
- ✅ `docs/EPICS.md`: Epic and feature structure (this file)
- 🔄 `docs/CV-CONTENT.md`: Structured CV content from PDFs (to create)
- ✅ `docs/ACTION-PLAN.md`: Detailed action plan with JIRA tasks
- `README.md`: Updated with project info, badges, setup instructions

**Definition of Done**:
- [ ] All doc files created
- [ ] Content is complete and accurate
- [ ] Links between docs working
- [ ] README has badges and clear instructions

---

## Epic 2: Core Features Development

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-2
**Summary**: Develop all main features and pages for the portfolio MVP
**Description**:
Implement the 5 main pages (Home, About, Experience, Projects, CV) with all core features including navigation, timeline, project showcase, CV display and PDF export, and contact form.

**Acceptance Criteria**:
- ✅ Home page with hero section and intro
- ✅ About page with professional timeline
- ✅ Experience page with job cards and skills
- ✅ Projects page with grid and IFTT-Trading showcase
- ✅ CV page with web design and PDF export
- ✅ Contact page with form and social links
- ✅ Navigation component (sticky header)
- ✅ All pages responsive mobile/tablet/desktop

**Business Value**: Core product delivery - functional portfolio with all key features

**Dependencies**: EPIC-1 must be completed first

**Labels**: `epic::features`, `priority::critical`

---

### Feature Groups

#### Feature Group 1: Home Page
- PORTFOLIO-10: Create Home page hero section (2h)
- PORTFOLIO-11: Create Home page presentation section (1.5h)

**Total**: 3.5h

---

#### Feature Group 2: About Page
- PORTFOLIO-15: Create About page with professional timeline (3h)
- PORTFOLIO-16: Add education section to About page (1.5h) [Post-MVP]

**Total**: 4.5h (3h MVP)

---

#### Feature Group 3: Experience Page
- PORTFOLIO-20: Create Experience page with job cards (3h)
- PORTFOLIO-21: Add skills categorization to Experience page (2h) [Post-MVP]

**Total**: 5h (3h MVP)

---

#### Feature Group 4: Projects Page
- PORTFOLIO-25: Create Projects page showcase grid (2.5h)
- PORTFOLIO-26: Create detailed IFTT-Trading project modal/page (2h)

**Total**: 4.5h

---

#### Feature Group 5: CV Page
- PORTFOLIO-30: Create CV page with web design (3h)
- PORTFOLIO-31: Implement CV JSON data structure and loader (1.5h)
- PORTFOLIO-32: Implement PDF export with html2pdf.js (2h)
- PORTFOLIO-33: Add CV edit mode via JSON file (1.5h) [Post-MVP]

**Total**: 8h (6.5h MVP)

---

#### Feature Group 6: Contact Page
- PORTFOLIO-40: Create Contact page with form (2h)
- PORTFOLIO-41: Integrate contact form with EmailJS (1.5h) [Post-MVP]
- PORTFOLIO-42: Add social links section to Contact page (1h)

**Total**: 4.5h (3h MVP)

---

#### Feature Group 7: Navigation & Layout
- PORTFOLIO-50: Create main navigation component (2.5h)
- PORTFOLIO-51: Create footer component (1h) [Post-MVP]
- PORTFOLIO-52: Implement lazy loading for routes (1h)

**Total**: 4.5h (3.5h MVP)

---

**Epic 2 Total**: 34.5h (26.5h MVP)

---

## Epic 3: Testing & Quality Assurance

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-3
**Summary**: Ensure code quality and functional correctness through automated tests
**Description**:
Implement comprehensive E2E testing with Playwright, visual regression testing, and meet all quality gates (SonarQube, Lighthouse).

**Acceptance Criteria**:
- ✅ Playwright E2E tests covering all user flows
- ✅ Visual regression tests for all pages
- ✅ SonarQube Quality Gate passed
- ✅ Lighthouse scores >95 (Performance, Accessibility 100)
- ✅ Zero ESLint errors/warnings
- ✅ Bundle size optimized (<500KB gzip)

**Business Value**: Confidence in quality, maintainability, and user experience

**Dependencies**: EPIC-2 features must be developed first

**Labels**: `epic::quality`, `priority::high`

---

### Tasks Breakdown

#### Testing Tasks
- PORTFOLIO-60: Setup Playwright E2E testing framework (1h)
- PORTFOLIO-61: Write E2E tests for navigation flow (2h)
- PORTFOLIO-62: Write E2E tests for CV PDF export (1.5h)
- PORTFOLIO-63: Write E2E tests for contact form (1.5h)
- PORTFOLIO-64: Create visual regression tests with Playwright (2h)

**Subtotal**: 8h

#### Quality Tasks
- PORTFOLIO-70: Run SonarQube analysis and fix issues (2h)
- PORTFOLIO-71: Optimize Lighthouse scores (2h)
- PORTFOLIO-72: Optimize bundle size and lazy loading (1.5h) [Post-MVP]

**Subtotal**: 5.5h (4h MVP)

---

**Epic 3 Total**: 13.5h (12h MVP)

---

## Epic 4: Deployment & Go-Live

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-4
**Summary**: Deploy portfolio to production on GitHub Pages
**Description**:
Configure and execute production deployment to GitHub Pages with automated CI/CD pipeline, and finalize all documentation.

**Acceptance Criteria**:
- ✅ GitHub Pages configured and working
- ✅ Site accessible at public URL
- ✅ All features working in production
- ✅ README complete with badges and instructions
- ✅ All documentation up to date

**Business Value**: Portfolio is live and accessible to potential employers/clients

**Dependencies**: EPIC-2 and EPIC-3 must be completed

**Labels**: `epic::deployment`, `priority::high`

---

### Tasks Breakdown

- PORTFOLIO-80: Configure GitHub Pages deployment (1h)
- PORTFOLIO-81: Deploy to GitHub Pages production (0.5h)
- PORTFOLIO-82: Create comprehensive README.md (1.5h)
- PORTFOLIO-83: Update all documentation files (1h)

---

**Epic 4 Total**: 4h

---

## Epic 5: Advanced Interactions & Animations [Post-MVP]

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-5
**Summary**: Add advanced animations and micro-interactions
**Description**:
Enhance user experience with smooth animations, scroll-triggered effects, parallax, and micro-interactions.

**Acceptance Criteria**:
- ✅ Scroll-triggered fade-in animations for all sections
- ✅ Parallax effect on hero section
- ✅ Smooth page transitions
- ✅ Hover animations on all interactive elements
- ✅ Loading animations for async content

**Business Value**: Premium UX, memorable user experience

**Priority**: Medium
**Status**: 📦 Backlog
**Estimate**: 8h

---

## Epic 6: Admin Panel for CV Editing [Post-MVP]

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-6
**Summary**: Build admin interface for visual CV editing
**Description**:
Create authenticated admin panel with forms to edit CV content visually (instead of editing JSON file manually).

**Acceptance Criteria**:
- ✅ Admin login page (simple password)
- ✅ CV editor with forms for all sections
- ✅ Live preview of CV changes
- ✅ Save to JSON file
- ✅ Validation and error handling

**Business Value**: Easier CV updates without technical knowledge

**Priority**: Low
**Status**: 📦 Backlog
**Estimate**: 12h

---

## Epic 7: Blog & Articles Section [Post-MVP]

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-7
**Summary**: Add blog/articles section to share technical knowledge
**Description**:
Implement blog section with markdown support, article listing, and individual article pages.

**Acceptance Criteria**:
- ✅ Blog listing page with cards
- ✅ Individual article page
- ✅ Markdown rendering with syntax highlighting
- ✅ Tags and categories
- ✅ Search functionality

**Business Value**: Demonstrate expertise, improve SEO, engage visitors

**Priority**: Low
**Status**: 📦 Backlog
**Estimate**: 15h

---

## Epic 8: Dark/Light Theme Toggle [Post-MVP]

### Epic Details

**Epic Key**: PORTFOLIO-EPIC-8
**Summary**: Implement theme switcher (dark/light mode)
**Description**:
Add theme toggle with smooth transitions, persist user preference in localStorage.

**Acceptance Criteria**:
- ✅ Theme toggle button in navigation
- ✅ Light theme colors defined
- ✅ Smooth transition between themes
- ✅ Preference saved in localStorage
- ✅ Respects system preference (prefers-color-scheme)

**Business Value**: User preference, accessibility

**Priority**: Low
**Status**: 📦 Backlog
**Estimate**: 6h

---

## Roadmap Timeline

### Sprint 1 (MVP) - 5 jours

**Jour 1** (Setup):
- EPIC-1: Project Setup & Infrastructure (6.5h)

**Jour 2** (Core Pages 1):
- PORTFOLIO-50: Navigation (2.5h)
- PORTFOLIO-10, 11: Home page (3.5h)
- PORTFOLIO-15: About page (3h)

**Jour 3** (Core Pages 2):
- PORTFOLIO-20: Experience page (3h)
- PORTFOLIO-25, 26: Projects page (4.5h)

**Jour 4** (CV & Contact):
- PORTFOLIO-30, 31, 32: CV page (6.5h)
- PORTFOLIO-40, 42: Contact page (3h)

**Jour 5** (Tests & Deploy):
- EPIC-3: Testing (12h max - parallelize)
- EPIC-4: Deployment (4h)

---

### Post-MVP Features (Optional)

**Sprint 2** (2 semaines):
- EPIC-5: Advanced Animations
- EPIC-8: Theme Toggle
- Polish + Bug fixes

**Sprint 3** (2 semaines):
- EPIC-6: Admin Panel
- Performance optimizations

**Sprint 4** (3 semaines):
- EPIC-7: Blog section
- SEO improvements

---

## Success Metrics

### Functional Metrics
- ✅ All 5 pages functional and responsive
- ✅ CV exportable to PDF
- ✅ Navigation smooth and intuitive
- ✅ Contact form or social links working
- ✅ IFTT-Trading project showcased

### Quality Metrics
- ✅ SonarQube Quality Gate: PASSED
- ✅ Lighthouse Performance: >95
- ✅ Lighthouse Accessibility: 100
- ✅ Lighthouse Best Practices: 100
- ✅ Lighthouse SEO: 100
- ✅ ESLint: 0 errors, 0 warnings
- ✅ Playwright tests: 100% passing
- ✅ Bundle size: <500KB gzipped

### DevOps Metrics
- ✅ CI/CD pipeline: All jobs passing
- ✅ Automated deployment working
- ✅ Branch protection enforced
- ✅ Code review process in place

---

**Dernière mise à jour**: 2025-11-09
**Status**: Epic structure définie - Ready for JIRA import
**Total MVP**: 38 tasks, ~60 heures (optimisable à 50h)
