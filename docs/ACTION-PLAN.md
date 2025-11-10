# Portfolio CV Angular - Plan d'Action

> Document de planification détaillée avec méthodologie Scrum/JIRA
> Date: 2025-11-09
> Timeline: 3-5 jours (MVP)
> Méthodologie: Scrum avec JIRA integration

## Vue d'Ensemble

### Objectif
Créer un portfolio professionnel Angular moderne inspiré de brittanychiang.com avec CV éditable et exportable en PDF, en 3-5 jours.

### Approche Méthodologique
- **Outil de gestion**: JIRA (https://maflabs.atlassian.net)
- **Projet JIRA**: Portfolio CV (Clé: PORTFOLIO ou PCV)
- **Sprints**: 1 sprint de 5 jours (setup + development + tests)
- **Integration**: Git branches liées aux tickets JIRA
- **Conventions**: Toutes issues en anglais (comme IFTT project)

### Stack Technique Validée
- Angular 17+ (Standalone Components)
- Tailwind CSS
- Design inspiration: brittanychiang.com
- ESLint + SonarLint + SonarQube
- Playwright (E2E + Visual Tests)
- GitHub Actions CI/CD
- GitHub Pages deployment

---

## Phase 0: Setup Infrastructure (Jour 1 - 4h)

### Epic JIRA: PORTFOLIO-EPIC-1: Project Setup & Infrastructure

**Objectif**: Initialiser le projet avec tous les outils de qualité et CI/CD

#### Tasks JIRA

**PORTFOLIO-1**: Initialize Angular 17+ project with standalone components
- Description: Create new Angular project using `ng new` with standalone components and routing
- Acceptance Criteria:
  - Project created with Angular 17+
  - Standalone components enabled
  - Routing configured
  - No NgModules
- Estimate: 0.5h
- Priority: Highest
- Labels: `type::setup`, `priority::critical`

**PORTFOLIO-2**: Install and configure Tailwind CSS
- Description: Add Tailwind CSS with JIT mode and base configuration
- Acceptance Criteria:
  - Tailwind installed via npm
  - tailwind.config.js configured
  - Base styles imported in styles.css
  - JIT mode enabled
- Estimate: 0.5h
- Priority: Highest
- Labels: `type::setup`, `priority::critical`

**PORTFOLIO-3**: Setup ESLint, Prettier, and SonarLint
- Description: Configure linting and code quality tools
- Acceptance Criteria:
  - ESLint installed with Angular rules
  - Prettier configured
  - SonarLint integration tested
  - Pre-commit hooks configured (optional)
- Estimate: 1h
- Priority: High
- Labels: `type::setup`, `priority::high`

**PORTFOLIO-4**: Create GitHub repository with branch protection
- Description: Initialize Git repo, push to GitHub, protect main/develop branches
- Acceptance Criteria:
  - GitHub repo created
  - Branches: main, develop
  - Branch protection enabled (require PR, no direct push)
  - .gitignore configured
- Estimate: 0.5h
- Priority: High
- Labels: `type::setup`, `priority::high`

**PORTFOLIO-5**: Setup GitHub Actions CI/CD pipeline
- Description: Create workflow for lint, test, build, and deploy to GitHub Pages
- Acceptance Criteria:
  - Workflow file created (.github/workflows/ci-cd.yml)
  - Jobs: lint → test → build → deploy
  - Deploy to GitHub Pages on main branch
  - Status badges in README
- Estimate: 1.5h
- Priority: High
- Labels: `type::ci-cd`, `priority::high`

**PORTFOLIO-6**: Integrate SonarQube code quality scanning
- Description: Add SonarQube scanning to CI pipeline
- Acceptance Criteria:
  - SonarQube project created on https://sonarqube.maflabs.fr/
  - Scan runs in GitHub Actions
  - Quality Gate configured (>80% coverage, 0 bugs)
  - Sonar token in GitHub Secrets
- Estimate: 1h
- Priority: High
- Labels: `type::ci-cd`, `priority::high`, `epic::quality`

**PORTFOLIO-7**: Create project documentation files
- Description: Create CLAUDE.md, UX-UI-GUIDELINES.md, EPICS.md, CV-CONTENT.md
- Acceptance Criteria:
  - CLAUDE.md: Project context and conventions ✅ (already created)
  - UX-UI-GUIDELINES.md: Design system from brittanychiang.com
  - EPICS.md: Epic and feature structure
  - CV-CONTENT.md: Structured CV content from PDFs
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::documentation`, `priority::medium`

---

## Phase 1: Development MVP (Jours 2-4)

### Epic JIRA: PORTFOLIO-EPIC-2: Core Features Development

**Objectif**: Développer toutes les pages principales et fonctionnalités du portfolio

#### Tasks JIRA - Home Page

**PORTFOLIO-10**: Create Home page hero section
- Description: Implement hero section with name, title, tagline, CTA button
- Acceptance Criteria:
  - Hero component created (standalone)
  - Responsive design (mobile-first)
  - Tailwind styles following UX guidelines
  - Smooth animations on load
- Estimate: 2h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `page::home`

**PORTFOLIO-11**: Create Home page presentation section
- Description: Brief introduction with photo and bio
- Acceptance Criteria:
  - Presentation component created
  - Profile picture integrated
  - Bio text from CV-CONTENT.md
  - Responsive layout
- Estimate: 1.5h
- Priority: High
- Labels: `type::feature`, `priority::high`, `page::home`

#### Tasks JIRA - About Page

**PORTFOLIO-15**: Create About page with professional timeline
- Description: Timeline component showing 6 years of experience
- Acceptance Criteria:
  - Timeline component (vertical, inspired by brittanychiang.com)
  - Data from CV-CONTENT.md
  - Animations on scroll
  - Responsive design
- Estimate: 3h
- Priority: High
- Labels: `type::feature`, `priority::high`, `page::about`

**PORTFOLIO-16**: Add education section to About page
- Description: Education timeline with degrees and certifications
- Acceptance Criteria:
  - Education component
  - Data from CV-CONTENT.md
  - Visual consistency with experience timeline
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::feature`, `priority::medium`, `page::about`

#### Tasks JIRA - Experience Page

**PORTFOLIO-20**: Create Experience page with job cards
- Description: Professional experience page inspired by brittanychiang.com
- Acceptance Criteria:
  - Job card components (dumb component)
  - Experience container (smart component)
  - Hover effects and animations
  - Tech stack badges for each job
- Estimate: 3h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `page::experience`

**PORTFOLIO-21**: Add skills categorization to Experience page
- Description: Skills organized by category (Backend, Frontend, DevOps, etc.)
- Acceptance Criteria:
  - Skills grid component
  - Categories from CV-CONTENT.md
  - Visual skill level indicators (optional)
  - Filter by category (optional)
- Estimate: 2h
- Priority: Medium
- Labels: `type::feature`, `priority::medium`, `page::experience`

#### Tasks JIRA - Projects Page

**PORTFOLIO-25**: Create Projects page showcase grid
- Description: Project cards grid with featured IFTT-Trading
- Acceptance Criteria:
  - Project card component (reusable)
  - Grid layout responsive
  - Featured project highlighted (IFTT-Trading)
  - Hover effects
- Estimate: 2.5h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `page::projects`

**PORTFOLIO-26**: Create detailed IFTT-Trading project modal/page
- Description: Detailed view of IFTT-Trading project
- Acceptance Criteria:
  - Project detail component
  - Architecture diagrams (screenshots)
  - Tech stack list
  - Links to GitHub/demo
  - Screenshots of UI
- Estimate: 2h
- Priority: High
- Labels: `type::feature`, `priority::high`, `page::projects`

#### Tasks JIRA - CV Page

**PORTFOLIO-30**: Create CV page with web design
- Description: CV page with professional layout using Tailwind
- Acceptance Criteria:
  - CV component rendering from JSON data
  - Design coherent with rest of portfolio
  - Print-friendly styles (CSS @media print)
  - Sections: Profile, Experience, Education, Skills
- Estimate: 3h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `page::cv`

**PORTFOLIO-31**: Implement CV JSON data structure and loader
- Description: JSON file with CV data and service to load it
- Acceptance Criteria:
  - cv-data.json in assets/data/
  - CVService to load and parse JSON
  - TypeScript interfaces for CV data
  - Data from CV-CONTENT.md
- Estimate: 1.5h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `page::cv`

**PORTFOLIO-32**: Implement PDF export with html2pdf.js
- Description: Export CV to PDF maintaining web design
- Acceptance Criteria:
  - html2pdf.js library integrated
  - Export button on CV page
  - PDF maintains Tailwind styles
  - Filename: "CV_[Name]_[Date].pdf"
  - Good quality (A4, 300dpi)
- Estimate: 2h
- Priority: High
- Labels: `type::feature`, `priority::high`, `page::cv`

**PORTFOLIO-33**: Add CV edit mode via JSON file
- Description: Instructions/UI to edit CV by modifying JSON file
- Acceptance Criteria:
  - Documentation on how to edit cv-data.json
  - (Optional) Simple form to generate JSON
  - Validation of JSON structure
- Estimate: 1.5h
- Priority: Low (post-MVP)
- Labels: `type::feature`, `priority::low`, `page::cv`

#### Tasks JIRA - Contact Page

**PORTFOLIO-40**: Create Contact page with form
- Description: Contact form with validation
- Acceptance Criteria:
  - Contact form component (Reactive Forms)
  - Fields: Name, Email, Subject, Message
  - Validation (required, email format)
  - Error messages
- Estimate: 2h
- Priority: High
- Labels: `type::feature`, `priority::high`, `page::contact`

**PORTFOLIO-41**: Integrate contact form with EmailJS or Formspree
- Description: Send contact form to email without backend
- Acceptance Criteria:
  - EmailJS or Formspree configured
  - Form submission working
  - Success/error messages
  - Email received in inbox
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::feature`, `priority::medium`, `page::contact`

**PORTFOLIO-42**: Add social links section to Contact page
- Description: Social media icons and links
- Acceptance Criteria:
  - Social links component
  - Icons: GitHub, LinkedIn, Email
  - Hover effects
  - Open in new tab
- Estimate: 1h
- Priority: Medium
- Labels: `type::feature`, `priority::medium`, `page::contact`

#### Tasks JIRA - Navigation & Layout

**PORTFOLIO-50**: Create main navigation component
- Description: Sticky navigation bar with smooth scroll
- Acceptance Criteria:
  - Navigation component (standalone)
  - Sticky header
  - Smooth scroll to sections
  - Active link highlighting
  - Mobile hamburger menu
- Estimate: 2.5h
- Priority: Highest
- Labels: `type::feature`, `priority::critical`, `component::nav`

**PORTFOLIO-51**: Create footer component
- Description: Footer with copyright and links
- Acceptance Criteria:
  - Footer component
  - Copyright notice
  - Social links
  - "Made with Angular" badge
- Estimate: 1h
- Priority: Low
- Labels: `type::feature`, `priority::low`, `component::footer`

**PORTFOLIO-52**: Implement lazy loading for routes
- Description: Optimize performance with lazy-loaded routes
- Acceptance Criteria:
  - All feature routes lazy-loaded
  - Loading spinner between routes
  - Preloading strategy configured
- Estimate: 1h
- Priority: Medium
- Labels: `type::optimization`, `priority::medium`

---

## Phase 2: Quality & Tests (Jour 5)

### Epic JIRA: PORTFOLIO-EPIC-3: Testing & Quality Assurance

**Objectif**: Garantir la qualité du code et des fonctionnalités

#### Tasks JIRA - Testing

**PORTFOLIO-60**: Setup Playwright E2E testing framework
- Description: Install and configure Playwright
- Acceptance Criteria:
  - Playwright installed
  - playwright.config.ts configured
  - Test structure created (tests/ folder)
  - CI integration prepared
- Estimate: 1h
- Priority: High
- Labels: `type::test`, `priority::high`, `epic::quality`

**PORTFOLIO-61**: Write E2E tests for navigation flow
- Description: Test navigation between all pages
- Acceptance Criteria:
  - Test: Homepage → About → Experience → Projects → CV → Contact
  - Test: Click all nav links
  - Test: Smooth scroll working
  - Test: Mobile menu navigation
- Estimate: 2h
- Priority: High
- Labels: `type::test`, `priority::high`, `epic::quality`

**PORTFOLIO-62**: Write E2E tests for CV PDF export
- Description: Test PDF export functionality
- Acceptance Criteria:
  - Test: Click export button
  - Test: PDF file generated
  - Test: PDF filename correct
  - Test: PDF content validates
- Estimate: 1.5h
- Priority: High
- Labels: `type::test`, `priority::high`, `epic::quality`

**PORTFOLIO-63**: Write E2E tests for contact form
- Description: Test contact form validation and submission
- Acceptance Criteria:
  - Test: Form validation (required fields)
  - Test: Email format validation
  - Test: Successful submission
  - Test: Error handling
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::test`, `priority::medium`, `epic::quality`

**PORTFOLIO-64**: Create visual regression tests with Playwright
- Description: Snapshot tests for all pages
- Acceptance Criteria:
  - Snapshots for all pages (desktop + mobile)
  - Baseline screenshots committed
  - CI fails on visual changes
- Estimate: 2h
- Priority: Medium
- Labels: `type::test`, `priority::medium`, `epic::quality`

#### Tasks JIRA - Quality & Performance

**PORTFOLIO-70**: Run SonarQube analysis and fix issues
- Description: Ensure SonarQube Quality Gate passes
- Acceptance Criteria:
  - SonarQube scan runs successfully
  - 0 bugs, 0 vulnerabilities
  - Code coverage >80%
  - Technical debt <1h
  - Quality Gate: PASSED
- Estimate: 2h
- Priority: Highest
- Labels: `type::quality`, `priority::critical`, `epic::quality`

**PORTFOLIO-71**: Optimize Lighthouse scores
- Description: Achieve Lighthouse scores >95
- Acceptance Criteria:
  - Performance >95
  - Accessibility 100
  - Best Practices 100
  - SEO 100
  - Issues documented if <100
- Estimate: 2h
- Priority: High
- Labels: `type::optimization`, `priority::high`, `epic::quality`

**PORTFOLIO-72**: Optimize bundle size and lazy loading
- Description: Reduce bundle size and improve load times
- Acceptance Criteria:
  - Main bundle <500KB (gzip)
  - All routes lazy-loaded
  - Images optimized (WebP)
  - Tree-shaking verified
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::optimization`, `priority::medium`, `epic::quality`

---

## Phase 3: Deployment & Documentation (Jour 5)

### Epic JIRA: PORTFOLIO-EPIC-4: Deployment & Go-Live

**Objectif**: Déployer sur GitHub Pages et finaliser la documentation

#### Tasks JIRA

**PORTFOLIO-80**: Configure GitHub Pages deployment
- Description: Setup automated deployment to GitHub Pages
- Acceptance Criteria:
  - GitHub Pages enabled in repo settings
  - Base href configured for GitHub Pages
  - Deployment workflow in CI/CD
  - Custom domain configured (optional)
- Estimate: 1h
- Priority: Highest
- Labels: `type::deployment`, `priority::critical`

**PORTFOLIO-81**: Deploy to GitHub Pages production
- Description: First production deployment
- Acceptance Criteria:
  - Site accessible at [username].github.io/portfolio-cv
  - All pages working
  - No console errors
  - Assets loading correctly
- Estimate: 0.5h
- Priority: Highest
- Labels: `type::deployment`, `priority::critical`

**PORTFOLIO-82**: Create comprehensive README.md
- Description: Document project with setup, features, tech stack
- Acceptance Criteria:
  - README with badges (build, quality, coverage)
  - Features list
  - Tech stack
  - Setup instructions
  - Screenshots
  - Demo link
- Estimate: 1.5h
- Priority: Medium
- Labels: `type::documentation`, `priority::medium`

**PORTFOLIO-83**: Update all documentation files
- Description: Final update of all docs
- Acceptance Criteria:
  - CLAUDE.md updated
  - UX-UI-GUIDELINES.md complete
  - EPICS.md finalized
  - CV-CONTENT.md verified
  - SPECIFICATIONS.md updated
- Estimate: 1h
- Priority: Low
- Labels: `type::documentation`, `priority::low`

---

## Estimation Totale

### Par Epic

| Epic | Tasks | Heures | Jours (8h) |
|------|-------|--------|------------|
| EPIC-1: Project Setup | 7 tasks | 6.5h | 0.8 jours |
| EPIC-2: Core Features | 20 tasks | 36.5h | 4.6 jours |
| EPIC-3: Testing & Quality | 7 tasks | 12.5h | 1.6 jours |
| EPIC-4: Deployment | 4 tasks | 4h | 0.5 jours |
| **TOTAL** | **38 tasks** | **59.5h** | **~7.5 jours** |

### Ajustement pour MVP 3-5 jours

**Stratégie**: Prioriser les features critiques, reporter les nice-to-have

**Tasks à reporter (post-MVP)**:
- PORTFOLIO-16: Education section (1.5h) → Can be added to About manually
- PORTFOLIO-21: Skills filter (2h) → Simple grid first
- PORTFOLIO-33: CV edit UI (1.5h) → JSON editing via file is OK for MVP
- PORTFOLIO-41: Email integration (1.5h) → Static contact info first
- PORTFOLIO-51: Footer (1h) → Simple copyright text
- PORTFOLIO-72: Bundle optimization (1.5h) → If already <500KB

**Heures gagnées**: 9h (~1 jour)

**Estimation ajustée MVP**: 50.5h → **~6-7 jours** (en travaillant ~8h/jour)

**Pour atteindre 3-5 jours**: Travailler 10-12h/jour OU simplifier davantage

---

## Conventions Git/JIRA

### Branch Naming
```
<type>/PORTFOLIO-<number>-<short-description>

Types:
- setup/      : Project setup and configuration
- feature/    : New features
- test/       : Tests
- docs/       : Documentation
- ci-cd/      : CI/CD pipelines
- fix/        : Bug fixes

Examples:
✅ setup/PORTFOLIO-1-init-angular-project
✅ feature/PORTFOLIO-10-home-hero-section
✅ test/PORTFOLIO-61-e2e-navigation
✅ ci-cd/PORTFOLIO-5-github-actions-pipeline
```

### Commit Messages
```
PORTFOLIO-<number>: <imperative verb> <what>

Examples:
✅ PORTFOLIO-1: Initialize Angular 17 project with standalone components
✅ PORTFOLIO-10: Create home page hero section with CTA
✅ PORTFOLIO-32: Implement PDF export with html2pdf.js
✅ PORTFOLIO-70: Fix SonarQube code smells and achieve Quality Gate
```

### Workflow
1. Create JIRA ticket
2. Create branch: `git checkout -b feature/PORTFOLIO-XX-description`
3. Develop + commit: `git commit -m "PORTFOLIO-XX: Description"`
4. Push: `git push -u origin feature/PORTFOLIO-XX-description`
5. Create Pull Request on GitHub
6. CI/CD runs (lint, test, build, SonarQube)
7. Review + Merge to develop
8. Merge develop to main → Deploy to GitHub Pages

---

## Métriques de Succès

### Quality Gates
- ✅ SonarQube: Quality Gate PASSED (0 bugs, >80% coverage)
- ✅ Lighthouse: Performance >95, Accessibility 100
- ✅ ESLint: 0 errors, 0 warnings
- ✅ Playwright: 100% tests passed
- ✅ Bundle: <500KB gzipped

### Fonctionnel
- ✅ 5 pages fonctionnelles (Home, About, Experience, Projects, CV)
- ✅ CV exportable en PDF avec design web
- ✅ Responsive mobile/tablet/desktop
- ✅ Contact form ou liens sociaux
- ✅ Projet IFTT-Trading showcase

### DevOps
- ✅ CI/CD GitHub Actions opérationnel
- ✅ Déploiement automatique GitHub Pages
- ✅ Branches protégées (main, develop)
- ✅ Tests automatiques sur PR

---

## Prochaines Étapes Immédiates

### À faire MAINTENANT

1. **Créer le projet JIRA** "Portfolio CV" (clé: PORTFOLIO ou PCV)
2. **Créer les 4 Epics** dans JIRA:
   - PORTFOLIO-EPIC-1: Project Setup & Infrastructure
   - PORTFOLIO-EPIC-2: Core Features Development
   - PORTFOLIO-EPIC-3: Testing & Quality Assurance
   - PORTFOLIO-EPIC-4: Deployment & Go-Live
3. **Créer tous les tasks** listés ci-dessus (38 tasks)
4. **Créer le sprint** "MVP Sprint 1" (5 jours)
5. **Commencer PORTFOLIO-1**: Initialize Angular project

### Ordre d'exécution recommandé

**Jour 1** (Setup):
- PORTFOLIO-1 → 2 → 3 → 4 → 5 → 6 → 7

**Jour 2** (Core Pages 1):
- PORTFOLIO-50 (Nav) → 10 → 11 (Home) → 15 (About)

**Jour 3** (Core Pages 2):
- PORTFOLIO-20 (Experience) → 25 → 26 (Projects)

**Jour 4** (CV & Contact):
- PORTFOLIO-30 → 31 → 32 (CV) → 40 → 42 (Contact)

**Jour 5** (Tests & Deploy):
- PORTFOLIO-60 → 61 → 62 → 70 → 71 → 80 → 81

---

**Dernière mise à jour**: 2025-11-09
**Status**: Plan approuvé - Ready to create JIRA tickets
**Méthodologie**: Scrum/JIRA (inspiré de devops-iftt-trading)
