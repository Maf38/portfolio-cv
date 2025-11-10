# 🚀 Portfolio Angular - Spécification Fonctionnelle Détaillée

## 📋 Informations du projet

**Nom du projet** : Portfolio Angular avec CV intégré
**Type** : Application web monopage (SPA)
**Framework** : Angular 17+
**Objectif** : Maximiser la visibilité professionnelle pendant l'intercontrat
**Version cible** : MVP (2-3 jours) puis Premium (1 semaine)

---

## 🎯 Objectif du projet

Créer un portfolio professionnel Angular avec CV intégré pour maximiser la visibilité pendant l'intercontrat, en mettant l'accent sur la qualité du code et les bonnes pratiques Angular plutôt que sur le choix d'un framework à la mode.

---

## 📊 Contexte et justifications

### Situation
- Bientôt en intercontrat
- Besoin d'un site portfolio professionnel avec CV téléchargeable
- Démonstration d'expertise technique réelle

### Choix stratégiques

#### Pourquoi Angular plutôt que Next.js/React ?

**✅ Cohérence avec le profil**
- Maîtrise d'Angular
- Recherche active de missions Angular
- Démonstration d'expertise réelle et applicable

**✅ Qualité > Hype**
- Un site Angular bien fait avec SonarQube vaut mieux qu'un site Next.js basique
- Différenciation par rapport aux portfolios React standards
- Mise en avant de compétences moins communes mais très demandées

**✅ Démonstration technique**
- Architecture propre et maintenable
- Tests unitaires et E2E
- Respect des best practices Angular
- CI/CD automatisé et qualimétrie

---

## 🏗️ Architecture technique

### Stack technologique complète

#### Frontend
- **Framework** : Angular 17+ (standalone components)
- **Langage** : TypeScript (strict mode)
- **UI Framework** : Angular Material OU Tailwind CSS (à décider)
- **State Management** : RxJS + Services
- **Routing** : Angular Router avec lazy loading

#### Qualité de code
- **Analyse statique** : SonarQube (SonarCloud pour repos publics)
- **Linting** : ESLint + Prettier
- **Tests unitaires** : Jest ou Karma/Jasmine
- **Tests E2E** : Cypress
- **Coverage cible** : >80%
- **Documentation** : Compodoc

#### CI/CD
- **Pipeline** : GitHub Actions
- **Qualité** : SonarCloud automatique sur PR/push
- **Performance** : Lighthouse CI
- **Déploiement** : Automatique sur main branch

#### Hébergement
- **Recommandé** : Vercel (simple, performant, CDN global)
- **Alternatives** : Netlify, Firebase Hosting, GitHub Pages

---

## 📋 Fonctionnalités détaillées

### Pages essentielles

#### 1. 🏠 Page Home (Accueil)
**Objectif** : Faire une première impression forte et professionnelle

**Contenu** :
- Hero section avec présentation personnelle
- Pitch accrocheur (qui suis-je, ce que je fais)
- Photo professionnelle
- Call-to-action vers :
  - Section projets
  - Téléchargement CV
  - Page contact
- Liens rapides réseaux sociaux

**Composants** :
- `HeroComponent` (présentation principale)
- `QuickLinksComponent` (liens rapides)
- `CtaButtonComponent` (boutons d'action)

---

#### 2. 👤 Page About (À propos)
**Objectif** : Détailler le parcours et les compétences

**Contenu** :
- Parcours professionnel (timeline ou liste)
- Compétences techniques détaillées
- Soft skills
- Passions et centres d'intérêt
- Certifications et formations

**Composants** :
- `TimelineComponent` (parcours professionnel)
- `SkillsListComponent` (liste des compétences)
- `InterestsComponent` (centres d'intérêt)

---

#### 3. 💼 Page Projects (Projets)
**Objectif** : Mettre en valeur les réalisations

**Contenu** :
- Grille de cards de projets
- Chaque projet contient :
  - Image de présentation / capture d'écran
  - Titre et description courte
  - Technologies utilisées (badges)
  - Liens (GitHub repo, demo live, case study)
  - Catégorie/tags (filtrage)
- Système de filtrage par technologie
- Vue détaillée de projet (modal ou page dédiée)

**Composants** :
- `ProjectsGridComponent` (grille de projets)
- `ProjectCardComponent` (card individuelle)
- `ProjectDetailComponent` (vue détaillée)
- `ProjectFilterComponent` (filtres)
- `TechBadgeComponent` (badges technos)

**Fonctionnalités** :
- Filtrage par technologie/catégorie
- Recherche par mot-clé
- Animation au scroll (reveal)

---

#### 4. 🎯 Page Skills (Compétences)
**Objectif** : Visualiser les compétences de manière attractive

**Contenu** :
- Technologies maîtrisées organisées par catégorie :
  - Frontend (Angular, React, Vue, etc.)
  - Backend (Node.js, .NET, etc.)
  - DevOps (Docker, K8s, CI/CD)
  - Databases
  - Cloud & Tools
- Niveau de compétence pour chaque techno
- Graphiques/visualisations animées (barres, radar chart, etc.)
- Certifications

**Composants** :
- `SkillsCategoryComponent` (catégorie de skills)
- `SkillBarComponent` (barre de progression)
- `SkillRadarChartComponent` (graphique radar optionnel)
- `CertificationsComponent` (certifications)

---

#### 5. 📄 Page CV (Curriculum Vitae)
**Objectif** : Fournir le CV en version web et téléchargeable

**Contenu** :
- Version web complète du CV :
  - Informations personnelles
  - Résumé professionnel
  - Expériences (détaillées)
  - Formation
  - Compétences
  - Langues
- Bouton de téléchargement PDF
- Même contenu, deux formats (web + PDF)

**Composants** :
- `CvViewComponent` (vue web du CV)
- `CvSectionComponent` (sections réutilisables)
- `DownloadCvButtonComponent` (bouton téléchargement)

**Fonctionnalités** :
- Génération PDF côté client (jsPDF ou html2pdf.js)
- OU fichier PDF statique pré-généré
- Impression optimisée

---

#### 6. 📧 Page Contact
**Objectif** : Faciliter la prise de contact

**Contenu** :
- Formulaire de contact avec validations Angular :
  - Nom (requis)
  - Email (requis, format email)
  - Sujet (requis)
  - Message (requis, min 10 caractères)
- Liens réseaux sociaux :
  - Email
  - LinkedIn
  - GitHub
  - Twitter/X (optionnel)
- Informations de contact (email, localisation générale)

**Composants** :
- `ContactFormComponent` (formulaire)
- `SocialLinksComponent` (liens sociaux)
- `ContactInfoComponent` (infos de contact)

**Fonctionnalités** :
- Validation reactive forms Angular
- Messages d'erreur contextuels
- Confirmation d'envoi
- Intégration EmailJS ou Formspree pour l'envoi sans backend
- Protection anti-spam (captcha optionnel)

---

### Composants transversaux

#### Navigation
- `HeaderComponent` : Header fixe avec navigation
- `FooterComponent` : Footer avec liens et copyright
- `NavMenuComponent` : Menu responsive (mobile)

#### Utilitaires
- `LoaderComponent` : Indicateur de chargement
- `ErrorComponent` : Page d'erreur 404
- `ScrollToTopComponent` : Bouton retour en haut

---

## 🎨 Features techniques avancées

### Performance
- ✅ Lazy loading des routes (modules chargés à la demande)
- ✅ OnPush change detection (optimisation du rendering)
- ✅ Image optimization (formats modernes, lazy loading)
- ✅ Tree shaking et minification
- ✅ **Objectif Lighthouse score : >95**

### Architecture
- ✅ Standalone components (Angular 17+, pas de NgModules)
- ✅ Feature-based modules (organisation par fonctionnalité)
- ✅ Smart/Dumb components pattern (containers vs presentational)
- ✅ Services avec Dependency Injection
- ✅ RxJS pour state management (BehaviorSubject, Observables)
- ✅ Typed forms (FormControl typé)

### Qualité
- ✅ Tests unitaires avec >80% coverage
- ✅ Tests E2E sur les parcours critiques
- ✅ SonarQube : 0 bugs, 0 code smells, 0 vulnerabilities
- ✅ Documentation automatique (Compodoc)
- ✅ Respect des guidelines Angular officielles
- ✅ ESLint + Prettier configurés

### UX/UI
- ✅ Responsive design (mobile-first)
- ✅ Animations fluides (Angular Animations)
- ✅ Micro-interactions
- ✅ Accessibilité (ARIA, navigation clavier)
- ✅ Mode sombre (optionnel, version premium)
- ✅ Transitions de page

### SEO & Accessibilité
- ✅ Meta tags optimisés
- ✅ Schema.org markup
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ WCAG 2.1 niveau AA
- ✅ Semantic HTML

---

## ⏱️ Planning et roadmap

### 🚀 Version MVP (2-3 jours)

#### Jour 1 (6-8h) - Setup + Structure
- [ ] Init projet Angular 17+ (2h)
  - ng new avec configuration stricte
  - Configuration ESLint + Prettier
  - Structure de dossiers
- [ ] Architecture de base (2h)
  - Routing principal
  - Lazy loading des modules
  - Services de base
- [ ] Design system (2h)
  - Choix et installation Angular Material OU Tailwind
  - Thème personnalisé
  - Variables CSS globales
- [ ] Pages squelettes (2h)
  - Header + Footer
  - Routing vers toutes les pages
  - Layout principal

#### Jour 2 (6-8h) - Contenu + Composants
- [ ] Page Home avec présentation (2h)
  - Hero component
  - CTA buttons
  - Quick links
- [ ] Section Projets (2h)
  - ProjectCard component
  - Grid layout
  - Data mock pour 3-4 projets
- [ ] CV web + PDF (2h)
  - CV view component
  - PDF download feature
- [ ] Formulaire contact (2h)
  - Reactive form avec validations
  - Intégration service d'envoi

#### Jour 3 (4-8h) - Qualité + Déploiement
- [ ] Tests unitaires basiques (2h)
  - Tests pour composants principaux
  - Coverage >50%
- [ ] Optimisations + responsive (2h)
  - Media queries
  - Image optimization
  - Performance audit
- [ ] CI/CD GitHub Actions (1h)
  - Workflow build + tests
  - SonarCloud integration
- [ ] Déploiement Vercel/Netlify (1h)
  - Configuration projet
  - Déploiement automatique
- [ ] Peaufinage (2-4h)
  - Corrections bugs
  - Ajustements visuels
  - Content final

**Résultat Jour 3** : ✅ Site fonctionnel, propre, déployé

---

### 💎 Version Premium (1 semaine)

**MVP +** les améliorations suivantes :

#### Jour 4 (6-8h) - UX avancée
- [ ] Animations et transitions
  - Angular Animations
  - Page transitions
  - Scroll reveal effects
- [ ] Micro-interactions
  - Hover states
  - Loading states
  - Success/error feedbacks
- [ ] Améliorations visuelles
  - Polish général
  - Cohérence design

#### Jour 5 (6-8h) - Tests & Qualité
- [ ] Tests E2E complets (3h)
  - Parcours utilisateur critiques
  - Cypress tests
- [ ] Coverage >80% (2h)
  - Tests unitaires manquants
  - Edge cases
- [ ] SonarQube optimisé (2h)
  - Résolution de tous les code smells
  - Optimisations suggérées
  - 0 bugs, 0 vulnerabilities
- [ ] Documentation (1h)
  - README détaillé
  - Contributing guide

#### Jour 6 (6-8h) - Performance & SEO
- [ ] Optimisations performance (3h)
  - Lighthouse >95 sur toutes les pages
  - Core Web Vitals optimisés
  - Lazy loading images
  - Bundle size optimization
- [ ] SEO (2h)
  - Meta tags complets
  - Open Graph
  - Schema.org
  - Sitemap
- [ ] Accessibilité (2h)
  - WCAG 2.1 AA
  - Screen reader testing
  - Keyboard navigation

#### Jour 7 (6-8h) - Documentation & Polish
- [ ] Documentation complète (3h)
  - Compodoc
  - README très détaillé
  - Architecture documentation
  - Setup guide
- [ ] Polish final (3h)
  - Corrections finales
  - Cross-browser testing
  - Mobile testing
  - Content proofreading

**Résultat Jour 7** : 🏆 Portfolio de qualité production

---

## 🔧 Configuration SonarQube

### Option recommandée : SonarCloud

**Avantages**
- ✅ Gratuit pour projets publics
- ✅ Intégration GitHub automatique
- ✅ Badges pour README
- ✅ Quality Gate automatique
- ✅ Tracking de la dette technique

**Setup**
1. Créer compte sur [sonarcloud.io](https://sonarcloud.io)
2. Connecter le repository GitHub
3. Ajouter le workflow GitHub Actions
4. Configurer `sonar-project.properties`

**Configuration sonar-project.properties**
```properties
sonar.projectKey=mon-organisation_portfolio-angular
sonar.organization=mon-organisation

sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.spec.ts

sonar.typescript.lcov.reportPaths=coverage/lcov.info
sonar.javascript.lcov.reportPaths=coverage/lcov.info

sonar.coverage.exclusions=**/*.spec.ts,**/*.module.ts,**/main.ts,**/environments/**

sonar.cpd.exclusions=**/*.spec.ts
```

**Workflow GitHub Actions (.github/workflows/sonarcloud.yml)**
```yaml
name: SonarCloud Analysis

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  sonarcloud:
    name: SonarCloud Analysis
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Shallow clones disabled for better analysis

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

**Quality Gates**
- Coverage > 80%
- 0 bugs
- 0 vulnerabilities
- 0 code smells (ou dette technique < 1h)
- Duplications < 3%

---

## 🚀 Stratégie de déploiement

### Option recommandée : Vercel

**Pourquoi Vercel ?**
- ✅ Configuration zero pour Angular
- ✅ Déploiement automatique sur git push
- ✅ Preview deployments pour chaque PR
- ✅ CDN global inclus (edge network)
- ✅ Support HTTPS automatique
- ✅ Analytics gratuits
- ✅ Rollback facile
- ✅ Variables d'environnement

**Setup Vercel**
1. Créer compte sur [vercel.com](https://vercel.com)
2. Connecter repository GitHub
3. Configuration automatique détectée
4. Déploiement immédiat

**Configuration vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/portfolio-cv/browser",
  "framework": "angular",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Alternatives**
- **Netlify** : Similaire à Vercel, excellent aussi
- **Firebase Hosting** : Si besoin de Firebase Functions
- **GitHub Pages** : Gratuit mais moins de features
- **AWS S3 + CloudFront** : Pour plus de contrôle

---

## 📦 Structure du projet

```
portfolio-cv/
├── src/
│   ├── app/
│   │   ├── core/                    # Services, guards, interceptors
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── shared/                  # Composants, pipes, directives partagés
│   │   │   ├── components/
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   ├── features/                # Features modules
│   │   │   ├── home/
│   │   │   ├── about/
│   │   │   ├── projects/
│   │   │   ├── skills/
│   │   │   ├── cv/
│   │   │   └── contact/
│   │   ├── layout/                  # Layout components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── nav/
│   │   ├── models/                  # Interfaces et types
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/                      # Images, fonts, data
│   │   ├── images/
│   │   ├── fonts/
│   │   └── data/
│   ├── styles/                      # Styles globaux
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── styles.scss
│   └── environments/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── sonarcloud.yml
├── cypress/                         # Tests E2E
├── coverage/                        # Coverage reports
├── docs/                            # Documentation Compodoc
├── angular.json
├── package.json
├── tsconfig.json
├── sonar-project.properties
├── vercel.json
└── README.md
```

---

## 🎯 Critères de succès

### Critères techniques
- ✅ Lighthouse Performance > 95
- ✅ Lighthouse Accessibility > 95
- ✅ Lighthouse Best Practices > 95
- ✅ Lighthouse SEO > 95
- ✅ SonarQube Quality Gate PASSED
- ✅ Test Coverage > 80%
- ✅ 0 bugs, 0 vulnerabilities
- ✅ Build time < 2 minutes
- ✅ Bundle size < 500KB (gzipped)

### Critères fonctionnels
- ✅ Toutes les pages fonctionnelles
- ✅ Responsive sur mobile/tablet/desktop
- ✅ CV téléchargeable en PDF
- ✅ Formulaire de contact opérationnel
- ✅ Navigation fluide et intuitive
- ✅ Temps de chargement < 2s

### Critères qualité
- ✅ Code propre et maintenable
- ✅ Architecture claire et documentée
- ✅ Tests automatisés en place
- ✅ CI/CD fonctionnel
- ✅ Déploiement automatique
- ✅ Documentation complète

---

## 📝 Notes et décisions à prendre

### Décisions techniques à valider

1. **UI Framework**
   - [ ] Angular Material (standard, composants prêts)
   - [ ] Tailwind CSS (flexible, moderne, lightweight)
   - Recommandation : **Tailwind CSS** pour plus de flexibilité et un design unique

2. **Tests unitaires**
   - [ ] Jest (moderne, rapide)
   - [ ] Karma/Jasmine (officiel Angular)
   - Recommandation : **Jest** pour la performance

3. **Génération PDF**
   - [ ] jsPDF (côté client)
   - [ ] html2pdf.js (côté client)
   - [ ] Fichier PDF statique
   - Recommandation : **Fichier PDF statique** pour MVP, génération dynamique en Premium

4. **Service email**
   - [ ] EmailJS (gratuit, simple)
   - [ ] Formspree (gratuit avec limite)
   - [ ] API backend custom
   - Recommandation : **EmailJS** pour simplicité

### Contenu à préparer

- [ ] Photo professionnelle haute qualité
- [ ] CV à jour (contenu texte)
- [ ] Liste des projets à mettre en avant (3-5 projets minimum)
- [ ] Captures d'écran des projets
- [ ] Description de chaque projet
- [ ] Liste complète des compétences
- [ ] Texte de présentation (pitch)
- [ ] Liens réseaux sociaux

### Questions ouvertes

1. **Timeline réelle** : Quand commence l'intercontrat ?
2. **Version cible** : MVP d'abord ou directement Premium ?
3. **Design** : Avez-vous des références visuelles / inspiration ?
4. **Multilingue** : Français uniquement ou FR + EN ?
5. **Analytics** : Besoin de tracking (Google Analytics, Plausible, etc.) ?

---

## 🔗 Ressources et références

### Documentation officielle
- [Angular Documentation](https://angular.dev)
- [Angular Style Guide](https://angular.dev/style-guide)
- [Material Design](https://material.angular.io)
- [Tailwind CSS](https://tailwindcss.com)

### Outils et services
- [SonarCloud](https://sonarcloud.io)
- [Vercel](https://vercel.com)
- [Cypress](https://www.cypress.io)
- [Compodoc](https://compodoc.app)

### Inspiration design
- [Awwwards](https://www.awwwards.com/websites/portfolio/)
- [Dribbble - Portfolio](https://dribbble.com/search/portfolio)
- [Behance - Portfolio](https://www.behance.net/search/projects?search=portfolio)

---

**Document créé le** : 2025-01-09
**Dernière mise à jour** : 2025-01-09
**Version** : 1.0
**Statut** : 📝 Draft - En attente de validation
