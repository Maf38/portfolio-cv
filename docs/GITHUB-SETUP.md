# GitHub Repository Setup Guide

## 1. GitHub Personal Access Token

### Required Scopes

Pour pousser le code ET les workflows GitHub Actions, vous avez besoin d'un token avec :

- ✅ `repo` - Full control of private repositories
- ✅ `workflow` - Update GitHub Action workflows

### Créer le token

1. Aller sur : https://github.com/settings/tokens
2. Cliquer "Generate new token (classic)"
3. Nom : `portfolio-cv-full-access`
4. Expiration : 90 days (ou plus)
5. Sélectionner :
   - `repo` (cocher la case principale, ça coche tout)
   - `workflow`
6. Cliquer "Generate token"
7. **Copier le token** (il ne sera affiché qu'une seule fois)

### Mettre à jour le token local

```bash
# Mettre à jour dans .env
GITHUB_TOKEN=ghp_VOTRE_NOUVEAU_TOKEN_ICI

# Mettre à jour l'URL remote
git remote set-url origin https://ghp_VOTRE_NOUVEAU_TOKEN_ICI@github.com/Maf38/portfolio-cv.git
```

---

## 2. GitHub Secrets Configuration

### Secrets nécessaires

Aller sur : https://github.com/Maf38/portfolio-cv/settings/secrets/actions

Créer ces secrets :

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SONAR_TOKEN` | `sqp_961b9a7b7951a8e0f4dcc49d65e5a189e57692a5` | Token SonarQube |
| `SONAR_HOST_URL` | `https://sonarqube.maflabs.fr` | URL du serveur SonarQube |

**GITHUB_TOKEN** est automatiquement fourni par GitHub Actions (pas besoin de le créer).

### Commandes pour créer les secrets via API

```bash
# Installer GitHub CLI (si pas déjà fait)
# brew install gh  # macOS
# sudo apt install gh  # Ubuntu

# Authentifier
gh auth login

# Créer les secrets
gh secret set SONAR_TOKEN --body "sqp_961b9a7b7951a8e0f4dcc49d65e5a189e57692a5"
gh secret set SONAR_HOST_URL --body "https://sonarqube.maflabs.fr"

# Vérifier
gh secret list
```

---

## 3. Branch Protection Rules

### Protéger la branche `main`

Aller sur : https://github.com/Maf38/portfolio-cv/settings/branches

**Ajouter une règle pour `main`** :

✅ **Require a pull request before merging**
- Require approvals: 0 (vous êtes seul)
- Dismiss stale pull request approvals when new commits are pushed

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging
- Status checks requis :
  - `lint` (Lint & Format Check)
  - `test` (Unit Tests & Coverage)
  - `sonarqube` (SonarQube Analysis)
  - `build` (Build Application)

✅ **Require conversation resolution before merging**

✅ **Do not allow bypassing the above settings**

❌ **Ne PAS cocher** "Include administrators" (sinon vous ne pourrez plus pousser directement)

### Protéger la branche `develop`

**Même configuration que `main`**, sauf :
- Require approvals: 0
- Moins strict pour faciliter le développement

---

## 4. GitHub Pages Configuration

### Activer GitHub Pages

Aller sur : https://github.com/Maf38/portfolio-cv/settings/pages

**Source** :
- ✅ GitHub Actions (déjà configuré via le workflow `deploy.yml`)

**Custom domain** (optionnel) :
- Si vous avez un domaine, le configurer ici

### URL du site

Une fois déployé, le site sera accessible sur :
- https://maf38.github.io/portfolio-cv/

---

## 5. Repository Settings

### General Settings

Aller sur : https://github.com/Maf38/portfolio-cv/settings

**Features** :
- ✅ Wikis (optionnel)
- ✅ Issues
- ✅ Sponsorships (optionnel)
- ✅ Projects
- ✅ Preserve this repository (important !)
- ✅ Discussions (optionnel)

**Pull Requests** :
- ✅ Allow merge commits
- ✅ Allow squash merging
- ✅ Allow rebase merging
- ✅ Always suggest updating pull request branches
- ✅ Automatically delete head branches

**Security** :
- ✅ Dependency graph
- ✅ Dependabot alerts
- ✅ Dependabot security updates

---

## 6. Workflow actuel

```
Développement local
      ↓
  git push origin feature/xxx
      ↓
  Créer Pull Request vers develop
      ↓
  CI/CD s'exécute (lint, tests, SonarQube, build)
      ↓
  Code review (optionnel si seul)
      ↓
  Merge vers develop
      ↓
  Créer Pull Request develop → main
      ↓
  CI/CD s'exécute
      ↓
  Merge vers main
      ↓
  Déploiement automatique sur GitHub Pages
```

---

## 7. Commandes Git recommandées

### Créer une feature branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/ma-nouvelle-feature
```

### Pousser et créer une PR

```bash
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-nouvelle-feature

# Puis aller sur GitHub pour créer la PR
```

### Mettre à jour develop depuis main

```bash
git checkout develop
git pull origin main
git push origin develop
```

---

## 8. Troubleshooting

### Erreur "workflow scope"

```
refusing to allow a Personal Access Token to create or update workflow
```

**Solution** : Créer un nouveau token avec le scope `workflow` activé.

### CI/CD échoue sur SonarQube

**Vérifier** :
1. Les secrets `SONAR_TOKEN` et `SONAR_HOST_URL` sont configurés
2. Le serveur SonarQube est accessible : `curl https://sonarqube.maflabs.fr/api/system/status`
3. Le token est valide : https://sonarqube.maflabs.fr/account/security

### GitHub Pages ne se déploie pas

**Vérifier** :
1. GitHub Actions est activé : https://github.com/Maf38/portfolio-cv/settings/actions
2. GitHub Pages est configuré en mode "GitHub Actions"
3. Le workflow `deploy.yml` s'est exécuté sans erreur

---

**Date** : 2025-11-10
**Repository** : https://github.com/Maf38/portfolio-cv
