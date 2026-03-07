# Portfolio CV

Modern professional portfolio built with Angular 20, serving as a living, interactive CV with PDF export.

[![Angular](https://img.shields.io/badge/Angular-20.3-dd0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![CI](https://github.com/Maf38/portfolio-cv/actions/workflows/ci.yml/badge.svg)](https://github.com/Maf38/portfolio-cv/actions/workflows/ci.yml)
[![Quality Gate](https://sonarqube.maflabs.fr/api/project_badges/measure?project=portfolio-cv&metric=alert_status)](https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv)

**Production** : [mafalgai.com](https://mafalgai.com)
**Staging** : [maf38.github.io/portfolio-cv](https://maf38.github.io/portfolio-cv/)

---

## About

Single-page portfolio inspired by [brittanychiang.com](https://brittanychiang.com), designed to showcase 6+ years of software engineering experience. Features interactive sections (About, Experience, Projects, Contact), a bilingual CV viewer (FR/EN) with PDF export, and a dark theme with smooth scroll navigation.

## Tech Stack

| Category       | Technologies                                                              |
| -------------- | ------------------------------------------------------------------------- |
| **Frontend**   | Angular 20.3, TypeScript 5.9, Tailwind CSS 3.4, SCSS                      |
| **PDF Export** | pdfmake, html2pdf.js                                                      |
| **Quality**    | ESLint, Prettier, SonarQube, Husky, CommitLint                            |
| **Testing**    | Karma + Jasmine (unit), Playwright (E2E)                                  |
| **CI/CD**      | GitHub Actions (lint &rarr; test &rarr; sonar &rarr; build &rarr; deploy) |
| **Deployment** | Cloudflare Pages (prod), GitHub Pages (staging)                           |
| **Versioning** | standard-version, Conventional Commits                                    |

## Features

- Single-page portfolio with sections: About, Experience, Projects, Contact
- Bilingual CV (FR/EN) with PDF export
- Responsive mobile-first design with dark theme
- Standalone Components + OnPush Change Detection for optimal performance
- SEO optimized (sitemap.xml, robots.txt, structured data, meta tags)
- JSON-driven content (`src/assets/data/cv-data.json`)

## Architecture

```
src/app/
├── app.ts                      # Root standalone component
├── app.routes.ts               # Lazy-loaded routing
├── features/
│   └── cv/
│       ├── components/         # CV display & printable components
│       ├── models/             # TypeScript interfaces (cv-data.types.ts)
│       └── services/           # CV data & PDF export services
└── shared/
    ├── components/             # Header, Contact Modal
    └── services/               # Contact Modal service
```

**Key patterns**: Standalone Components (no NgModule), OnPush Change Detection, lazy-loaded routes, Smart/Dumb component architecture.

## Getting Started

**Prerequisites**: Node.js 20+, npm

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Production build
npm run build
```

The app runs at `http://localhost:4200/`.

### Useful Scripts

| Command                 | Description                     |
| ----------------------- | ------------------------------- |
| `npm start`             | Dev server                      |
| `npm run build`         | Production build                |
| `npm test`              | Unit tests (watch mode)         |
| `npm run test:ci`       | Unit tests (headless, CI)       |
| `npm run test:coverage` | Unit tests with coverage        |
| `npm run lint`          | ESLint check                    |
| `npm run lint:fix`      | ESLint auto-fix                 |
| `npm run format`        | Prettier format all files       |
| `npm run format:check`  | Prettier check                  |
| `npm run sonar`         | SonarQube analysis              |
| `npm run release`       | Bump version (standard-version) |

## Deployment

```
feature/* ──► develop (PR) ──► main (PR)
                  │                 │
                  ▼                 ▼
            GitHub Pages     Cloudflare Pages
            (staging)           (production)
            maf38.github.io     mafalgai.com
            /portfolio-cv/
```

**CI Pipeline** (runs on every push/PR):

```
Lint ──► Test + Coverage ──► SonarQube Quality Gate ──► Build
```

## Quality

- **SonarQube**: [sonarqube.maflabs.fr](https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv) — 0 bugs, 0 vulnerabilities target
- **ESLint**: Strict config with `no-explicit-any`, `prefer-const`, `eqeqeq`
- **Prettier**: Enforced via pre-commit hooks (Husky)
- **Conventional Commits**: Enforced via CommitLint
- **Coverage thresholds**: 50% statements, 35% branches, 30% functions, 50% lines
