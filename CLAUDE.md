# Portfolio CV Angular - Contexte Projet

## Vision du Projet

Portfolio professionnel Angular moderne pour maximiser la visibilité pendant la période d'intercontrat. Le site doit démontrer l'expertise technique (6 ans d'expérience) tout en servant de CV vivant, modifiable et exportable.

## Objectifs Principaux

1. **Visibilité professionnelle maximale** - Portfolio accessible, performant et bien référencé
2. **Démonstration technique** - Code de qualité exemplaire avec metrics vérifiables
3. **Rapidité d'exécution** - MVP fonctionnel en 3-5 jours
4. **Maintenabilité** - Code clean, testé, documenté avec CI/CD complète

## Contexte Technique

### Stack Technologique Choisie

- **Framework**: Angular 17+ avec Standalone Components
- **Styling**: Tailwind CSS (choisi pour rapidité et flexibilité)
- **Design**: Inspiré de [brittanychiang.com](https://brittanychiang.com) - minimaliste professionnel
- **Qualité**: ESLint + SonarLint + SonarQube (https://sonarqube.maflabs.fr/)
- **Tests**: Playwright (E2E + Visual Regression)
- **CI/CD**: GitHub Actions
- **Déploiement**: GitHub Pages (gratuit, pas de domaine à payer)
- **Git**: Branches protégées (main, develop)

### Pourquoi Angular + Tailwind ?

- **Angular 17+**: Expérience récente avec IFTT-Trading (Angular 18.2), maîtrise du framework
- **Tailwind CSS**: Plus rapide que Angular Material pour MVP, design system flexible
- **Standalone Components**: Architecture moderne, tree-shaking optimal

### Configuration Dev Server

**⚠️ IMPORTANT - Accès depuis VM**:
- L'application doit être accessible depuis l'IP de la VM (192.168.1.82)
- **Toujours lancer le dev server avec `--host 0.0.0.0`** pour écouter sur toutes les interfaces réseau
- Commande: `npm start -- --port 4201 --host 0.0.0.0`
- URL d'accès: `http://192.168.1.82:4201/`

### Qualité & DevOps

**Outils de qualité intégrés**:
- ESLint + Prettier (formatage automatique)
- SonarLint (IDE integration)
- SonarQube (Quality Gate sur CI)
- Playwright (tests E2E + visual)
- Lighthouse (performance >95)

**Pipeline CI/CD**:
```
Push → Lint → Tests → SonarQube → Build → Deploy GitHub Pages
         ↓
    Blocked si Quality Gate fail
```

### Conversion de logos (JPG/PNG → SVG monochrome)

**Outil** : `potrace` + `ImageMagick`
**Commande** :
```bash
# 1. Convertir en bitmap noir/blanc, trimmer les bords
convert input.jpg -colorspace Gray -threshold 50% -trim +repage output.pbm

# 2. Tracer en SVG vectoriel
potrace output.pbm -s -o logo.svg --flat --turdsize 10

# 3. Changer le fill color en slate-400 (#94a3b8) dans le SVG
```
**Convention** : Tous les logos d'entreprise sont en monochrome `fill="#94a3b8"` (Tailwind slate-400), nommés `*-mono.svg` dans `public/assets/images/logos/`.

## Contenu du Portfolio

### Parcours Professionnel (6 ans)

**Timeline extraite des CVs**:
- 2019-2021: Stages et alternance (CEA, EDF)
- 2021-2023: Développeur Full-Stack (EDF, Capgemini)
- 2023-2025: Lead Developer / DevOps (projets personnels avancés)

**Compétences clés**:
- Backend: .NET Core, C#, NestJS, TypeScript, Java
- Frontend: Angular, React, TypeScript
- Data: SQL Server, PostgreSQL, MongoDB
- DevOps: Azure DevOps, GitHub Actions, Docker, Terraform
- Cloud: Azure, AWS basics
- Blockchain: Solana (IFTT-Trading)

### Projet Phare: IFTT-Trading

**À mettre en avant**:
- Architecture full-stack moderne (Angular 18.2 + NestJS)
- Intégration blockchain Solana (Phantom Wallet, Jupiter API)
- Design retrogaming unique et soigné
- Fonctionnalités avancées (trading conditionnel, automation n8n)
- Stack technique complète (TypeScript, PostgreSQL, Docker, WebSocket, JWT)

**Localisation**: `/workspace-amsterdam/iftt-trading-automation/`

### Tokens et Configuration

**⚠️ IMPORTANT - RÈGLES DE SÉCURITÉ** :

**INTERDICTIONS ABSOLUES** :
1. ❌ **JAMAIS de tokens/passwords dans les fichiers committés** (CLAUDE.md, code source, configs)
2. ❌ **JAMAIS de secrets dans l'historique Git** (même dans les anciens commits)
3. ❌ **JAMAIS de .env dans le repository** (toujours dans .gitignore)

**BONNES PRATIQUES** :
- ✅ Tous les tokens dans `.env` (fichier local uniquement)
- ✅ Créer `.env.example` avec des placeholders
- ✅ Créer `*.example` pour tout fichier de config contenant des secrets
- ✅ Ajouter dans `.gitignore` : `.env`, `*.log`, `.vscode/settings.json`, `.mcp.json`

---

**Tous les tokens sont stockés dans `.env` (fichier local, jamais versionné)** :

**GitHub**:
- Variable: `GITHUB_TOKEN`
- Repository: https://github.com/Maf38/portfolio-cv
- Scopes: `repo` (full access)

**SonarQube**:
- Variable: `SONAR_TOKEN`
- Server: https://sonarqube.maflabs.fr
- Project Key: `portfolio-cv`

**JIRA**:
- Variable: `JIRA_API_TOKEN`
- URL: https://maflabs.atlassian.net
- Username: gaimafal@gmail.com
- Configuration MCP: Voir `.mcp.json` (fichier local, jamais versionné)

## Planning & Timeline

### Phase 0: Setup & Infrastructure (Jour 1 - 4h)
- Init Angular 17+ + Tailwind CSS
- ESLint + SonarLint + Prettier
- GitHub repo + branch protection
- GitHub Actions CI/CD
- SonarQube integration
- Documentation (CLAUDE.md, UX-UI-GUIDELINES.md, EPICS.md, CV-CONTENT.md)

### Phase 1: Développement MVP (Jours 2-4)
- Page Home (hero + présentation)
- Page About (timeline professionnelle)
- Page Experience (style brittanychiang.com)
- Page Projects (IFTT-Trading featured)
- Page Contact (form + social)
- CV éditable (JSON file)
- Export PDF avec design web (html2pdf.js)

### Phase 2: Qualité & Tests (Jour 5)
- Playwright tests (E2E + visual)
- SonarQube Quality Gate pass
- Lighthouse score >95
- Déploiement GitHub Pages
- Documentation complète

## Décisions Architecturales

### Structure des Composants

**Pattern Smart/Dumb**:
```
features/
  home/
    containers/      # Smart components
    components/      # Dumb components
  experience/
  projects/
  cv/
```

**Standalone Components** partout (pas de NgModule)

### Gestion d'État

- **Simple state**: BehaviorSubject + Services
- **Pas de NgRx** pour MVP (overkill)
- **OnPush Change Detection** partout (perf)

### Routing & Lazy Loading

```typescript
routes = [
  { path: '', loadComponent: () => import('./features/home') },
  { path: 'experience', loadComponent: () => import('./features/experience') },
  { path: 'projects', loadComponent: () => import('./features/projects') },
  { path: 'cv', loadComponent: () => import('./features/cv') },
  { path: 'contact', loadComponent: () => import('./features/contact') }
];
```

### CV Éditable - Approche MVP

**Option retenue**: JSON file pour MVP

```json
// src/assets/data/cv-data.json
{
  "profile": { "name": "...", "title": "...", "summary": "..." },
  "experience": [...],
  "education": [...],
  "skills": {...}
}
```

**Export PDF**: html2pdf.js pour maintenir le design web dans le PDF

**Évolution future**: Interface admin pour édition visuelle (hors MVP)

## Inspiration Design

### Référence Principale: brittanychiang.com

**Caractéristiques à reprendre**:
- Design minimaliste et épuré
- Typography claire et lisible
- Sections bien espacées avec beaucoup d'air
- Timeline verticale élégante pour expérience
- Cards pour projets avec hover effects
- Color scheme sobre (dark theme optionnel)
- Animations subtiles au scroll
- Navigation sticky simple
- Mobile-first responsive

**Adaptations**:
- Ajout section CV téléchargeable
- Export PDF intégré
- Thème Material Design colors (inspiré Google)

## Conventions & Bonnes Pratiques

> ⚠️ **IMPORTANT** : Toutes les conventions détaillées sont documentées dans :
> - [docs/WORKFLOW-FEATURES.md](./docs/WORKFLOW-FEATURES.md) - Process complet de développement
> - [docs/WORKFLOW-TESTS.md](./docs/WORKFLOW-TESTS.md) - Stratégie de tests
>
> Claude doit **TOUJOURS** suivre ces workflows lors du développement.

### Code Style

```typescript
// ✅ Bon: Standalone component avec OnPush
@Component({
  selector: 'app-experience-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DatePipe],
  template: `...`
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
}
```

### Naming Conventions

- **Composants**: `feature-name.component.ts`
- **Services**: `feature-name.service.ts`
- **Types**: `feature-name.types.ts`
- **Constantes**: `feature-name.constants.ts`

### Testing Strategy

```typescript
// E2E avec Playwright
test('should navigate to experience page', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Experience');
  await expect(page).toHaveURL('/experience');
});

// Visual regression
await expect(page).toHaveScreenshot('experience-page.png');
```

### Git Workflow

```
main (protected) ← merge via PR uniquement
  ↑
develop (protected) ← merge via PR uniquement
  ↑
feature/xxx ← développement quotidien
```

**Commit messages**: Conventional Commits
```
feat: add experience timeline component
fix: correct date formatting in cv
docs: update UX guidelines
test: add playwright tests for navigation
```

## Métriques de Succès

### Quality Gates

- ✅ **SonarQube**: 0 bugs, 0 vulnérabilités, code coverage >80%
- ✅ **ESLint**: 0 erreurs, 0 warnings
- ✅ **Lighthouse**: Performance >95, Accessibility 100, Best Practices 100, SEO 100
- ✅ **Tests**: 100% tests E2E passent, snapshots visuels validés

### Performance Targets

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Cumulative Layout Shift < 0.1
- Bundle size < 500KB (gzip)

## Ressources & Références

### Documentation Projet

- [SPECIFICATIONS.md](./SPECIFICATIONS.md) - Spécifications fonctionnelles détaillées
- [docs/UX-UI-GUIDELINES.md](./docs/UX-UI-GUIDELINES.md) - Guidelines design système
- [docs/EPICS.md](./docs/EPICS.md) - Structure des features et epics
- [docs/CV-CONTENT.md](./docs/CV-CONTENT.md) - Contenu structuré du CV
- [docs/CV-CONTENT-EXHAUSTIVE.md](./docs/CV-CONTENT-EXHAUSTIVE.md) - Extraction complète des CVs
- [docs/SETUP-GUIDE.md](./docs/SETUP-GUIDE.md) - Guide complet de setup du projet
- [docs/WORKFLOW-FEATURES.md](./docs/WORKFLOW-FEATURES.md) - **Workflow de développement des features** (SonarQube, coding standards, best practices Angular)
- [docs/WORKFLOW-TESTS.md](./docs/WORKFLOW-TESTS.md) - **Workflow de tests** (unit, E2E, visual regression, coverage)
- [docs/DEV-WORKFLOW.md](./docs/DEV-WORKFLOW.md) - **Workflow de développement quotidien** (lint:fix, commits, PR, bonnes pratiques)

### Projets de Référence

- **IFTT-Trading**: `/workspace-amsterdam/iftt-trading-automation/`
- **DevOps IFTT**: `/workspace-amsterdam/devops-iftt-trading/`
- **Design inspiration**: https://brittanychiang.com

### Outils & Services

- **SonarQube**: https://sonarqube.maflabs.fr/
- **JIRA**: https://maflabs.atlassian.net
- **GitHub**: (repo à créer)
- **Déploiement**: GitHub Pages (à configurer)

## Prochaines Étapes

1. ✅ Analyser CVs historiques
2. ✅ Explorer IFTT-Trading
3. ✅ Récupérer config MCP JIRA
4. 🔄 Structurer toutes les idées (en cours)
5. ⏳ Créer plan d'action détaillé
6. ⏳ Initialiser projet Angular
7. ⏳ Setup CI/CD complet
8. ⏳ Développer MVP

---

**Dernière mise à jour**: 2025-11-09
**Status**: Phase de planification - Documentation en cours
**Timeline**: MVP prévu pour J+5 (2025-11-14)
