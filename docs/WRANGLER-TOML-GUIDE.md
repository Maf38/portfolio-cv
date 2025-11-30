# Guide Wrangler & TOML pour Cloudflare

## Introduction

Ce guide explique ce qu'est Wrangler, le format TOML, et comment ils s'intègrent dans l'écosystème Cloudflare pour déployer des sites web et applications.

---

## Partie 1 : Qu'est-ce que Wrangler ?

### Définition

**Wrangler** est l'outil en ligne de commande (CLI) officiel de Cloudflare. Il permet de :
- Déployer des sites statiques (Cloudflare Pages)
- Déployer des fonctions serverless (Cloudflare Workers)
- Gérer les configurations
- Tester localement avant déploiement

### Analogie avec d'autres outils

| Outil | Plateforme | Rôle |
|-------|------------|------|
| `ng` | Angular | Construire et servir l'app |
| `npm` | Node.js | Gérer les packages |
| `git` | GitHub | Versionner le code |
| `wrangler` | Cloudflare | Déployer sur Cloudflare |

### Installation

```bash
# Installation globale
npm install -g wrangler

# Ou en devDependency dans le projet
npm install --save-dev wrangler
```

### Commandes principales

```bash
# Se connecter à son compte Cloudflare
wrangler login

# Vérifier la connexion
wrangler whoami

# Déployer un site Pages
wrangler pages deploy ./dist/mon-site

# Déployer un Worker
wrangler deploy

# Lancer un serveur de dev local
wrangler dev

# Voir les logs en temps réel
wrangler tail
```

### Exemple concret pour notre portfolio

```bash
# 1. Build Angular
npm run build -- --configuration production

# 2. Déployer sur Cloudflare Pages
wrangler pages deploy dist/portfolio-cv/browser --project-name=portfolio-cv
```

---

## Partie 2 : Qu'est-ce que TOML ?

### Définition

**TOML** (Tom's Obvious Minimal Language) est un format de fichier de configuration créé par Tom Preston-Werner (co-fondateur de GitHub).

Son objectif : être **plus lisible que JSON** et **moins ambigu que YAML**.

### Comparaison des formats

#### JSON (JavaScript Object Notation)
```json
{
  "name": "portfolio-cv",
  "version": "1.0.0",
  "settings": {
    "minify": true,
    "sourceMaps": false
  },
  "features": ["pages", "workers"]
}
```
- ✅ Standard universel
- ❌ Pas de commentaires
- ❌ Virgules obligatoires (source d'erreurs)
- ❌ Guillemets partout

#### YAML (YAML Ain't Markup Language)
```yaml
name: portfolio-cv
version: 1.0.0
settings:
  minify: true
  sourceMaps: false
features:
  - pages
  - workers
```
- ✅ Très lisible
- ✅ Commentaires avec `#`
- ❌ Sensible à l'indentation (source d'erreurs)
- ❌ Ambiguïtés (ex: `no` = `false` ?)

#### TOML (Tom's Obvious Minimal Language)
```toml
name = "portfolio-cv"
version = "1.0.0"

[settings]
minify = true
sourceMaps = false

features = ["pages", "workers"]
```
- ✅ Très lisible
- ✅ Commentaires avec `#`
- ✅ Pas d'ambiguïté
- ✅ Pas sensible à l'indentation
- ❌ Moins connu que JSON/YAML

### Syntaxe TOML

#### Types de base

```toml
# Commentaire (ignoré)

# String (chaîne de caractères)
name = "Mafal Gai"
multiline = """
Ceci est un texte
sur plusieurs lignes
"""

# Nombres
age = 28
price = 19.99
hex = 0xDEADBEEF

# Booléens
enabled = true
debug = false

# Dates
birthday = 1996-05-15
timestamp = 2025-01-29T22:30:00Z
```

#### Tableaux (Arrays)

```toml
# Tableau simple
skills = ["Angular", "TypeScript", ".NET"]

# Tableau sur plusieurs lignes
frameworks = [
  "Angular",
  "React",
  "NestJS",
]
```

#### Tables (Objects)

```toml
# Table simple (équivalent d'un objet)
[database]
host = "localhost"
port = 5432
name = "portfolio"

# Table imbriquée
[server.production]
url = "https://mafalgai.com"
ssl = true

[server.development]
url = "http://localhost:4200"
ssl = false
```

#### Tableaux de tables

```toml
# Équivalent d'un array d'objets
[[experiences]]
company = "EDF"
role = "Full-Stack Developer"
years = 2

[[experiences]]
company = "Capgemini"
role = "Lead Developer"
years = 1
```

---

## Partie 3 : wrangler.toml pour Cloudflare

### Rôle du fichier

Le fichier `wrangler.toml` est le **fichier de configuration central** pour les projets Cloudflare. Il remplace les configurations manuelles dans le dashboard.

### Avantages

| Sans wrangler.toml | Avec wrangler.toml |
|--------------------|--------------------|
| Config dans le dashboard Cloudflare | Config versionnée dans Git |
| Difficile à reproduire | Reproductible à 100% |
| Pas de review possible | Review en PR comme le code |
| Config perdue si projet supprimé | Config sauvegardée avec le code |

### Structure pour Cloudflare Pages

```toml
# wrangler.toml pour un site statique (Pages)

# Nom du projet (obligatoire)
name = "portfolio-cv"

# Dossier contenant le site buildé
pages_build_output_dir = "dist/portfolio-cv/browser"

# Compatibilité (optionnel mais recommandé)
compatibility_date = "2024-01-01"
```

### Structure pour Cloudflare Workers

```toml
# wrangler.toml pour une fonction serverless (Workers)

name = "my-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

# Variables d'environnement
[vars]
API_URL = "https://api.example.com"

# Secrets (référencés, pas stockés ici !)
# Les vraies valeurs sont dans le dashboard ou via `wrangler secret put`

# Bindings (connexions à d'autres services)
[[kv_namespaces]]
binding = "MY_KV"
id = "abc123"

[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "xyz789"
```

### Exemple complet pour notre portfolio

```toml
# wrangler.toml - Portfolio CV

#:schema node_modules/wrangler/config-schema.json

# ============================================
# Configuration Cloudflare Pages
# ============================================

name = "portfolio-cv"
pages_build_output_dir = "dist/portfolio-cv/browser"
compatibility_date = "2024-12-01"

# ============================================
# Variables d'environnement (build time)
# ============================================

[vars]
NODE_VERSION = "20"

# ============================================
# Configuration des routes (optionnel)
# ============================================

# Redirection www vers apex
# [[redirects]]
# from = "https://www.mafalgai.com/*"
# to = "https://mafalgai.com/:splat"
# status = 301

# ============================================
# Headers de sécurité (optionnel)
# ============================================

# [[headers]]
# for = "/*"
# [headers.values]
# X-Frame-Options = "DENY"
# X-Content-Type-Options = "nosniff"
```

---

## Partie 4 : Workflow de déploiement

### Option A : Via le Dashboard Cloudflare (automatique)

```
GitHub Push → Cloudflare détecte → Build automatique → Deploy
```

Configuration dans le dashboard, wrangler.toml optionnel.

### Option B : Via GitHub Actions (recommandé)

```
GitHub Push → GitHub Actions → Build → wrangler pages deploy → Cloudflare
```

```yaml
# .github/workflows/deploy-cloudflare.yml
- name: Deploy to Cloudflare Pages
  run: npx wrangler pages deploy dist/portfolio-cv/browser --project-name=portfolio-cv
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Option C : Déploiement manuel (dev/test)

```bash
# Login une fois
wrangler login

# Build
npm run build

# Deploy
wrangler pages deploy dist/portfolio-cv/browser --project-name=portfolio-cv
```

---

## Partie 5 : Commandes Wrangler utiles

### Gestion de projet

```bash
# Créer un nouveau projet Pages
wrangler pages project create mon-projet

# Lister les projets
wrangler pages project list

# Supprimer un projet
wrangler pages project delete mon-projet
```

### Déploiement

```bash
# Déployer en production
wrangler pages deploy ./dist --project-name=mon-projet

# Déployer une preview (branche)
wrangler pages deploy ./dist --project-name=mon-projet --branch=feature-x

# Voir les déploiements
wrangler pages deployment list --project-name=mon-projet
```

### Secrets et variables

```bash
# Ajouter un secret (interactif)
wrangler secret put MY_SECRET

# Lister les secrets
wrangler secret list

# Supprimer un secret
wrangler secret delete MY_SECRET
```

### Debug et logs

```bash
# Logs en temps réel
wrangler pages deployment tail --project-name=mon-projet

# Tester localement avec Wrangler
wrangler pages dev ./dist
```

---

## Partie 6 : Bonnes pratiques

### 1. Toujours versionner wrangler.toml

```gitignore
# .gitignore
# NE PAS ignorer wrangler.toml (sauf s'il contient des secrets)
```

### 2. Ne jamais mettre de secrets dans wrangler.toml

```toml
# ❌ MAUVAIS - Secret en clair
[vars]
API_KEY = "sk-1234567890abcdef"

# ✅ BON - Utiliser wrangler secret
# Les secrets sont gérés via:
# wrangler secret put API_KEY
```

### 3. Utiliser le schéma JSON pour l'autocomplétion

```toml
# Première ligne du fichier
#:schema node_modules/wrangler/config-schema.json
```

Cela active l'autocomplétion dans VS Code.

### 4. Séparer les environnements

```toml
# Configuration de base
name = "portfolio-cv"
pages_build_output_dir = "dist/portfolio-cv/browser"

# Environnement de production
[env.production]
vars = { ENVIRONMENT = "production" }

# Environnement de preview
[env.preview]
vars = { ENVIRONMENT = "preview" }
```

---

## Partie 7 : Différence Pages vs Workers

| Aspect | Cloudflare Pages | Cloudflare Workers |
|--------|------------------|-------------------|
| **Usage** | Sites statiques, SPAs | APIs, fonctions serverless |
| **Fichiers** | HTML, CSS, JS, images | JavaScript/TypeScript |
| **Build output** | `pages_build_output_dir` | `main` (fichier d'entrée) |
| **Déploiement** | `wrangler pages deploy` | `wrangler deploy` |
| **Gratuit** | Illimité (requests statiques) | 100k requests/jour |
| **Exemple** | Portfolio, blog, doc | API REST, webhooks |

### Combinaison Pages + Workers (Full-Stack)

```toml
# Site statique + API serverless
name = "my-fullstack-app"
pages_build_output_dir = "dist/frontend"

# Worker pour l'API (dans /functions)
[[pages.functions]]
binding = "API"
```

---

## Ressources

- [Documentation Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Documentation Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Spécification TOML](https://toml.io/en/)
- [Wrangler GitHub](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler)

---

## Résumé

| Concept | Description |
|---------|-------------|
| **Wrangler** | CLI Cloudflare pour déployer sites et workers |
| **TOML** | Format de config lisible (comme JSON mais mieux) |
| **wrangler.toml** | Fichier de config pour projets Cloudflare |
| **Pages** | Hébergement de sites statiques |
| **Workers** | Fonctions serverless |

**Commande clé pour notre portfolio** :
```bash
wrangler pages deploy dist/portfolio-cv/browser --project-name=portfolio-cv
```

---

**Dernière mise à jour** : 2025-11-29
**Auteur** : Guide créé pour le projet portfolio-cv
