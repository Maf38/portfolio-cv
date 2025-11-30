# Migration Cloudflare Pages + SEO

## Statut : EN COURS

### Progression

- [x] **Phase 1** : Achat domaine + config Cloudflare
- [x] **Phase 3** : SEO (meta tags, sitemap, robots.txt, structured data)
- [x] **Phase 4** : Pipeline CI/CD (workflows GitHub Actions)
- [ ] **Phase 2** : Prerendering Angular (optionnel, à faire si nécessaire)
- [ ] **Phase 5** : Google Search Console

### Ce qui reste à faire

1. **Configurer les secrets GitHub** pour le déploiement Cloudflare automatique
2. **Ajouter le domaine www** dans Cloudflare Pages
3. **Soumettre à Google Search Console**
4. **Créer l'image og-image.png** pour le partage social

---

## Objectif

Déployer le portfolio sur **Cloudflare Pages** avec le domaine personnalisé `mafalgai.com` pour maximiser la visibilité et le référencement Google.

## Architecture de Déploiement

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                             │
│                         (Maf38/portfolio-cv)                         │
└─────────────────────────────────────────────────────────────────────┘
                    │                           │
                    │ merge sur develop         │ merge sur main
                    ▼                           ▼
┌─────────────────────────────┐   ┌─────────────────────────────────┐
│      GitHub Pages           │   │       Cloudflare Pages          │
│   (Environnement Dev)       │   │    (Environnement Production)   │
│                             │   │                                 │
│  maf38.github.io/portfolio  │   │  mafalgai.com                   │
│                             │   │  + CDN mondial                  │
│  Preview & Tests            │   │  + SSL automatique              │
└─────────────────────────────┘   │  + Prerendering SEO             │
                                  └─────────────────────────────────┘
```

---

## Phase 1 : Achat du Domaine et Configuration Cloudflare

### 1.1 Créer un compte Cloudflare

1. Aller sur [cloudflare.com](https://www.cloudflare.com)
2. Créer un compte gratuit
3. Vérifier l'email

### 1.2 Acheter le domaine sur Cloudflare Registrar

1. Dans le dashboard Cloudflare, aller dans **Domain Registration** > **Register Domains**
2. Rechercher `mafalgai.com`
3. Acheter le domaine (~10€/an, prix coûtant)
4. Les DNS Cloudflare sont automatiquement configurés

> **Note** : Si le domaine est déjà pris, alternatives possibles :
> - `mafalgai.dev` (~12€/an)
> - `mafalgai.fr` (~8€/an)
> - `gaimafal.com`

### 1.3 Connecter le Repository GitHub à Cloudflare Pages

1. Dans Cloudflare Dashboard, aller dans **Workers & Pages** > **Create**
2. Sélectionner l'onglet **Pages**
3. Cliquer sur **Connect to Git**
4. Autoriser Cloudflare à accéder à GitHub
5. Sélectionner le repository `Maf38/portfolio-cv`

### 1.4 Configurer le Build sur Cloudflare Pages

| Paramètre | Valeur |
|-----------|--------|
| **Production branch** | `main` |
| **Build command** | `npm run build:prod` |
| **Build output directory** | `dist/portfolio-cv/browser` |
| **Root directory** | `/` |
| **Node.js version** | `20` |

**Variables d'environnement à ajouter** :
```
NODE_VERSION = 20
```

### 1.5 Configurer le Domaine Personnalisé

1. Dans Cloudflare Pages > votre projet > **Custom domains**
2. Ajouter `mafalgai.com`
3. Ajouter `www.mafalgai.com` (redirection vers apex)
4. Le SSL est automatiquement provisionné

---

## Phase 2 : Prerendering Angular pour le SEO

### 2.1 Pourquoi le Prerendering ?

Les SPA Angular sont rendues côté client (JavaScript). Les moteurs de recherche ont des difficultés à indexer ce contenu. Le **prerendering** génère des fichiers HTML statiques au moment du build.

**Avantages** :
- Google indexe le contenu HTML directement
- First Contentful Paint plus rapide
- Meilleur score Lighthouse
- Partage social avec aperçu (Open Graph)

### 2.2 Activer le Prerendering Angular

**Modification de `angular.json`** :

```json
{
  "projects": {
    "portfolio-cv": {
      "architect": {
        "build": {
          "options": {
            "prerender": true,
            "ssr": false
          }
        }
      }
    }
  }
}
```

**Routes à prerendre** (créer `prerender-routes.txt` si nécessaire) :
```
/
/cv
```

### 2.3 Script de Build Production

**Ajouter dans `package.json`** :

```json
{
  "scripts": {
    "build:prod": "ng build --configuration production",
    "build:prerender": "ng build --configuration production --prerender"
  }
}
```

---

## Phase 3 : Optimisations SEO Complètes

### 3.1 Meta Tags dans `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Mafal Gai - Développeur Full-Stack | Angular, .NET, DevOps</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- SEO Primary Meta Tags -->
  <meta name="title" content="Mafal Gai - Développeur Full-Stack Senior" />
  <meta name="description" content="Développeur Full-Stack avec 6 ans d'expérience. Expertise Angular, .NET Core, TypeScript, DevOps. Disponible pour missions freelance et CDI." />
  <meta name="keywords" content="Mafal Gai, développeur full-stack, Angular, .NET, TypeScript, DevOps, freelance, Paris" />
  <meta name="author" content="Mafal Gai" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://mafalgai.com/" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mafalgai.com/" />
  <meta property="og:title" content="Mafal Gai - Développeur Full-Stack Senior" />
  <meta property="og:description" content="Développeur Full-Stack avec 6 ans d'expérience. Expertise Angular, .NET Core, TypeScript, DevOps." />
  <meta property="og:image" content="https://mafalgai.com/assets/images/og-image.png" />
  <meta property="og:locale" content="fr_FR" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://mafalgai.com/" />
  <meta name="twitter:title" content="Mafal Gai - Développeur Full-Stack Senior" />
  <meta name="twitter:description" content="Développeur Full-Stack avec 6 ans d'expérience. Expertise Angular, .NET Core, TypeScript, DevOps." />
  <meta name="twitter:image" content="https://mafalgai.com/assets/images/og-image.png" />

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="favicon.svg" />
  <link rel="alternate icon" type="image/x-icon" href="favicon.ico" />
  <link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png" />

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mafal Gai",
    "url": "https://mafalgai.com",
    "image": "https://mafalgai.com/assets/images/photo-cv.jpg",
    "jobTitle": "Développeur Full-Stack Senior",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "sameAs": [
      "https://www.linkedin.com/in/mafal-gai",
      "https://github.com/Maf38"
    ],
    "knowsAbout": ["Angular", ".NET Core", "TypeScript", "DevOps", "Azure", "Docker"]
  }
  </script>
</head>
```

### 3.2 Créer `robots.txt`

**Créer `public/robots.txt`** :

```txt
User-agent: *
Allow: /

Sitemap: https://mafalgai.com/sitemap.xml
```

### 3.3 Créer `sitemap.xml`

**Créer `public/sitemap.xml`** :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mafalgai.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mafalgai.com/cv</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

### 3.4 Créer l'image Open Graph

Créer une image `public/assets/images/og-image.png` :
- Dimensions : **1200x630 pixels**
- Contenu : Nom, titre, photo professionnelle
- Format : PNG ou JPG optimisé

---

## Phase 4 : Modification du Pipeline CI/CD

### 4.1 Nouveau Workflow pour Cloudflare (`deploy-cloudflare.yml`)

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build for production
        run: npm run build:prod
        env:
          NODE_ENV: production

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist/portfolio-cv/browser --project-name=portfolio-cv
```

### 4.2 Modifier le Workflow GitHub Pages (`deploy.yml`)

Changer le trigger pour `develop` uniquement :

```yaml
name: Deploy to GitHub Pages (Dev Environment)

on:
  push:
    branches:
      - develop
  workflow_dispatch:

# ... reste du workflow inchangé
```

### 4.3 Secrets GitHub à Configurer

Aller dans **Settings** > **Secrets and variables** > **Actions** et ajouter :

| Secret | Description | Où le trouver |
|--------|-------------|---------------|
| `CLOUDFLARE_API_TOKEN` | Token API Cloudflare | Cloudflare Dashboard > My Profile > API Tokens > Create Token > "Edit Cloudflare Workers" template |
| `CLOUDFLARE_ACCOUNT_ID` | ID du compte Cloudflare | Cloudflare Dashboard > Workers & Pages > (copier l'Account ID dans la sidebar droite) |

---

## Phase 5 : Soumettre le Site à Google

### 5.1 Google Search Console

1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Ajouter la propriété `mafalgai.com`
3. Vérifier la propriété via enregistrement DNS (Cloudflare gère ça facilement)
4. Soumettre le sitemap : `https://mafalgai.com/sitemap.xml`
5. Demander l'indexation de la page d'accueil

### 5.2 Bing Webmaster Tools

1. Aller sur [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Importer depuis Google Search Console (plus rapide)
3. Soumettre le sitemap

### 5.3 Google My Business (Optionnel)

Si vous voulez apparaître dans les recherches locales, créer une fiche Google My Business.

---

## Checklist de Migration

### Avant la migration
- [ ] Compte Cloudflare créé
- [ ] Domaine `mafalgai.com` acheté
- [ ] Repository connecté à Cloudflare Pages
- [ ] Build testé localement avec prerendering

### Configuration technique
- [ ] `angular.json` modifié pour prerendering
- [ ] `package.json` avec script `build:prod`
- [ ] `public/robots.txt` créé
- [ ] `public/sitemap.xml` créé
- [ ] `src/index.html` avec tous les meta tags SEO
- [ ] Image Open Graph créée (`og-image.png`)
- [ ] Structured Data JSON-LD ajouté

### Pipeline CI/CD
- [ ] `deploy-cloudflare.yml` créé
- [ ] `deploy.yml` modifié pour `develop` uniquement
- [ ] Secrets GitHub configurés (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)

### Post-déploiement
- [ ] Site accessible sur `https://mafalgai.com`
- [ ] SSL fonctionnel (cadenas vert)
- [ ] Redirection `www` → apex configurée
- [ ] Google Search Console configuré
- [ ] Sitemap soumis
- [ ] Indexation demandée

### Validation SEO
- [ ] Test Lighthouse : Performance > 95, SEO = 100
- [ ] Test [Rich Results Test](https://search.google.com/test/rich-results) pour structured data
- [ ] Test [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) pour Open Graph
- [ ] Test [Twitter Card Validator](https://cards-dev.twitter.com/validator) pour Twitter Cards

---

## Estimation des Coûts

| Service | Coût |
|---------|------|
| Cloudflare Registrar (`mafalgai.com`) | ~10€/an |
| Cloudflare Pages | Gratuit (illimité) |
| Cloudflare DNS | Gratuit |
| Cloudflare CDN | Gratuit |
| SSL/TLS | Gratuit |
| **Total** | **~10€/an** |

---

## Timeline Estimée

| Phase | Durée estimée |
|-------|---------------|
| Phase 1 : Domaine + Cloudflare | 30 min |
| Phase 2 : Prerendering Angular | 1-2h |
| Phase 3 : SEO (meta, sitemap, etc.) | 1-2h |
| Phase 4 : Pipeline CI/CD | 30 min |
| Phase 5 : Google Search Console | 15 min |
| **Total** | **3-5h** |

> **Note** : L'indexation Google peut prendre 1-4 semaines après soumission.

---

## Ressources Utiles

- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Angular Prerendering Guide](https://angular.dev/guide/prerendering)
- [Google Search Central - SEO Guide](https://developers.google.com/search/docs)
- [Schema.org Person](https://schema.org/Person)
- [Open Graph Protocol](https://ogp.me/)

---

**Dernière mise à jour** : 2025-01-29
**Status** : En attente d'implémentation
