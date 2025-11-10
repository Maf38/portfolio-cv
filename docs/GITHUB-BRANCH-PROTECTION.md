# GitHub Branch Protection - Configuration Rulesets

**Date**: 2025-11-10
**Repository**: https://github.com/Maf38/portfolio-cv
**Interface**: GitHub Rulesets (nouvelle interface)

---

## Vue d'ensemble

Les **Branch Protection Rulesets** sont la nouvelle interface GitHub pour protéger les branches. Ils remplacent progressivement les anciennes "Branch Protection Rules" et offrent plus de flexibilité.

### Avantages des Rulesets

- ✅ Plusieurs rulesets peuvent s'appliquer simultanément (agrégation des règles)
- ✅ Mode "Evaluate" pour tester avant d'activer
- ✅ Application au niveau repository OU organisation
- ✅ Pattern matching plus flexible
- ✅ Bypass list pour situations d'urgence

---

## Configuration actuelle

### Ruleset 1: `protect-main`

**URL**: https://github.com/Maf38/portfolio-cv/settings/rules

**Objectif**: Protection stricte de la branche de production

#### Paramètres généraux

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| **Ruleset Name** | `protect-main` | Nom du ruleset |
| **Enforcement status** | `Active` | Règles appliquées immédiatement |
| **Bypass list** | *Vide* | Personne ne peut contourner les règles |

#### Target Branches

```
Include by pattern: main
✅ Prevent renaming of branches that match this pattern
```

#### Branch Rules

| Règle | Activée | Configuration |
|-------|---------|---------------|
| **Require a pull request before merging** | ✅ | - Required approvals: `0`<br>- ✅ Dismiss stale approvals<br>- ✅ Require approval of most recent push |
| **Require status checks to pass** | ✅ | - Required checks: `lint`, `test`, `sonarqube`, `build`<br>- ✅ Require branches to be up to date |
| **Block force pushes** | ✅ | Empêche `git push --force` |
| **Require linear history** | ✅ | Force squash/rebase (pas de merge commits) |
| **Require conversation resolution** | ✅ | Force résolution des commentaires PR |
| **Require signed commits** | ❌ | Non requis (GPG non configuré) |
| **Require deployments to succeed** | ❌ | Non pertinent pour main |

---

### Ruleset 2: `protect-develop`

**Objectif**: Protection adaptée à la branche de développement (légèrement moins strict)

#### Paramètres généraux

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| **Ruleset Name** | `protect-develop` | Nom du ruleset |
| **Enforcement status** | `Active` | Règles appliquées immédiatement |
| **Bypass list** | *Vide* | Personne ne peut contourner les règles |

#### Target Branches

```
Include by pattern: develop
✅ Prevent renaming of branches that match this pattern
```

#### Branch Rules

| Règle | Activée | Configuration | Différence vs main |
|-------|---------|---------------|--------------------|
| **Require a pull request before merging** | ✅ | - Required approvals: `0`<br>- ❌ Ne pas dismiss stale approvals | Plus flexible |
| **Require status checks to pass** | ✅ | - Required checks: `lint`, `test`, `sonarqube`, `build`<br>- ✅ Require branches to be up to date | Identique |
| **Block force pushes** | ✅ | Empêche `git push --force` | Identique |
| **Require linear history** | ❌ | Autorise merge commits | Plus flexible |
| **Require conversation resolution** | ✅ | Force résolution des commentaires PR | Identique |

---

## Workflow Git avec Rulesets

### Développement d'une feature

```bash
# 1. Créer une feature branch depuis develop
git checkout develop
git pull origin develop
git checkout -b feature/ma-feature

# 2. Développer et commiter
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
git push origin feature/ma-feature

# 3. Créer une Pull Request sur GitHub
# feature/ma-feature → develop

# 4. CI/CD s'exécute automatiquement
# ✅ lint (ESLint + Prettier)
# ✅ test (Karma + Jasmine)
# ✅ sonarqube (Quality Gate)
# ✅ build (Angular production)

# 5. Si tous les checks passent, merge autorisé
# Sinon, PR bloquée jusqu'à résolution

# 6. Après merge, supprimer la feature branch
git branch -d feature/ma-feature
git push origin --delete feature/ma-feature
```

### Release en production

```bash
# 1. Créer une Pull Request sur GitHub
# develop → main

# 2. CI/CD s'exécute sur main
# ✅ lint
# ✅ test
# ✅ sonarqube
# ✅ build

# 3. Si tous les checks passent, merge autorisé

# 4. Après merge, déploiement automatique GitHub Pages
# Workflow deploy.yml se déclenche
```

---

## Enforcement Status - Explication

GitHub propose 3 modes pour les rulesets :

### 1. **Disabled** (Désactivé)

```
Ruleset créé mais non appliqué
Utile pour: Préparer des règles sans les activer
```

- ❌ Aucune règle appliquée
- ❌ Aucun avertissement affiché
- ✅ Ruleset visible dans la configuration

**Cas d'usage**: Créer un ruleset en amont, l'activer plus tard

---

### 2. **Evaluate** (Mode test)

```
Ruleset actif en lecture seule
Utile pour: Tester l'impact avant d'appliquer
```

- ❌ Les règles ne bloquent **PAS** les merges
- ✅ Affiche des **warnings** sur les PRs
- ✅ Logs dans les insights GitHub

**Cas d'usage**: Vérifier quelles PRs seraient bloquées avant d'activer strictement

**Exemple**:
```
⚠️ Warning: This PR would be blocked by ruleset 'protect-main'
   - Missing required status check: sonarqube
```

---

### 3. **Active** (Actif)

```
Ruleset appliqué strictement
Utile pour: Protection réelle des branches
```

- ✅ Les règles **bloquent** les merges
- ✅ Affiche des **erreurs** sur les PRs
- ✅ Impossible de merger sans respecter les règles

**Cas d'usage**: Protection production (ce qui est configuré actuellement)

**Exemple**:
```
❌ Error: Cannot merge - Required status check failed
   - sonarqube: Quality Gate FAILED
```

---

## Status Checks - Configuration

### Checks requis

Les 4 jobs du workflow CI doivent passer :

| Check | Job | Commande | Critères de succès |
|-------|-----|----------|-------------------|
| `lint` | Lint & Format Check | `npm run lint` | 0 erreurs ESLint, formatage Prettier OK |
| `test` | Unit Tests & Coverage | `npm run test:coverage` | 100% tests passent, coverage ≥ 80% |
| `sonarqube` | SonarQube Analysis | `npm run sonar` | Quality Gate PASSED |
| `build` | Build Application | `npm run build` | Build production réussit |

### Ordre d'exécution

```
lint → test → sonarqube → build
  ↓      ↓        ↓          ↓
  ❌ → STOP (PR bloquée)
  ✅ → Continue
```

Si **un seul job échoue**, la PR est bloquée.

---

## Ajouter les Status Checks au Ruleset

### Problème initial

Lors de la création du ruleset, les checks `lint`, `test`, `sonarqube`, `build` peuvent ne pas apparaître dans la liste déroulante.

**Raison** : GitHub ne connaît pas encore ces checks (aucun workflow exécuté).

### Solution

#### Étape 1: Créer le ruleset sans les checks

1. Créer le ruleset avec les autres règles
2. Laisser "Require status checks to pass" **décoché** temporairement
3. Sauvegarder le ruleset

#### Étape 2: Exécuter le CI/CD une première fois

```bash
# Option A: Push sur main/develop
git checkout main
git commit --allow-empty -m "chore: trigger CI"
git push origin main

# Option B: Créer une PR de test
git checkout -b test/trigger-ci
git commit --allow-empty -m "test: trigger CI"
git push origin test/trigger-ci
# Puis créer une PR sur GitHub
```

#### Étape 3: Éditer le ruleset

1. Aller sur https://github.com/Maf38/portfolio-cv/settings/rules
2. Cliquer sur le ruleset (`protect-main`)
3. Cliquer sur **Edit**
4. Cocher "Require status checks to pass"
5. Cliquer sur **"Add checks"**
6. Sélectionner : `lint`, `test`, `sonarqube`, `build`
7. ✅ Cocher "Require branches to be up to date before merging"
8. Sauvegarder

---

## Bypass List - Cas d'usage

### Quand utiliser le Bypass ?

Le **Bypass list** permet de contourner les règles en cas d'urgence.

**Exemples légitimes** :
- 🚨 Hotfix critique en production (serveur en panne)
- 🚨 Rollback urgent d'un déploiement défaillant
- 🔧 Maintenance du CI/CD (désactiver temporairement les checks)

### Comment configurer

1. Éditer le ruleset
2. Section **"Bypass list"**
3. Cliquer sur **"Add bypass"**
4. Sélectionner **"Repository admin"** ou **"Specific people"**
5. Ajouter votre compte GitHub : `@Maf38`

**Recommandation** : Ne **PAS** configurer de bypass pour l'instant (discipline stricte).

---

## Rulesets vs Branch Protection Rules

### Anciennes Branch Protection Rules

- Interface : https://github.com/Maf38/portfolio-cv/settings/branches
- ❌ Une seule règle par branche
- ❌ Pas de mode "Evaluate"
- ❌ Moins flexible

### Nouveaux Rulesets (recommandé)

- Interface : https://github.com/Maf38/portfolio-cv/settings/rules
- ✅ Plusieurs rulesets par branche (agrégation)
- ✅ Mode "Evaluate" pour tester
- ✅ Plus de contrôle (bypass, patterns, etc.)

**Les deux systèmes peuvent coexister**, mais il est recommandé d'utiliser uniquement les Rulesets pour éviter la confusion.

---

## Vérification de la configuration

### Depuis l'interface GitHub

Aller sur : https://github.com/Maf38/portfolio-cv/settings/rules

Vous devriez voir :

```
Rulesets (2)

┌─────────────────┬────────┬───────────┬──────────┐
│ Name            │ Status │ Targets   │ Branches │
├─────────────────┼────────┼───────────┼──────────┤
│ protect-main    │ Active │ Branches  │ 1        │
│ protect-develop │ Active │ Branches  │ 1        │
└─────────────────┴────────┴───────────┴──────────┘
```

### Tester la protection

#### Test 1: Push direct sur main (doit échouer)

```bash
git checkout main
echo "test" >> README.md
git add README.md
git commit -m "test: direct push"
git push origin main
```

**Résultat attendu** :
```
remote: error: GH013: Repository rule violations found for refs/heads/main.
remote:
remote: - Cannot push directly to main (requires pull request)
```

#### Test 2: Créer une PR sans checks (doit être bloquée)

1. Créer une feature branch
2. Créer une PR vers `main`
3. La PR doit afficher :

```
❌ Required status checks
   • lint - Pending
   • test - Pending
   • sonarqube - Pending
   • build - Pending

❌ Merge blocked - Required status checks must pass
```

#### Test 3: Créer une PR avec checks OK (doit passer)

1. Créer une feature branch
2. Créer une PR vers `main`
3. Attendre que le CI/CD s'exécute
4. Si tous les checks passent :

```
✅ All checks have passed
   • lint - Passed
   • test - Passed
   • sonarqube - Passed
   • build - Passed

✅ Merge pull request (button enabled)
```

---

## Troubleshooting

### Problème 1: "Required checks not found"

**Symptôme** : Les checks `lint`, `test`, etc. ne sont pas dans la liste déroulante

**Solution** :
1. Exécuter le CI/CD au moins une fois (push ou PR)
2. Attendre que les jobs se terminent
3. Éditer le ruleset
4. Les checks devraient maintenant apparaître

---

### Problème 2: "Merge blocked despite checks passing"

**Symptôme** : Tous les checks sont verts mais le merge est bloqué

**Causes possibles** :
1. ❌ "Require conversation resolution" activé → Résoudre tous les commentaires
2. ❌ "Require branches to be up to date" activé → Rebase sur la branche cible
3. ❌ Autres rulesets en conflit → Vérifier la liste des rulesets actifs

**Solution** :
```bash
# Mettre à jour la branche
git checkout feature/ma-feature
git fetch origin
git rebase origin/main  # ou origin/develop
git push --force-with-lease origin feature/ma-feature
```

---

### Problème 3: "Cannot push - branch protection"

**Symptôme** : Push direct rejeté malgré les droits admin

**Cause** : Le ruleset s'applique même aux admins (par défaut)

**Solution temporaire** (urgence uniquement) :
1. Ajouter votre compte au "Bypass list"
2. Push
3. **Retirer immédiatement du Bypass list**

**Solution recommandée** : Toujours passer par des PRs

---

## Commandes Git utiles

### Vérifier les règles appliquées

```bash
# Lister les branches protégées (anciennes règles)
gh api repos/Maf38/portfolio-cv/branches --jq '.[].name, .[].protected'

# Lister les rulesets (nouvelles règles)
gh api repos/Maf38/portfolio-cv/rulesets --jq '.[] | {name, enforcement, target}'
```

### Créer une PR via CLI

```bash
# Depuis une feature branch
gh pr create \
  --base develop \
  --head feature/ma-feature \
  --title "feat: ma nouvelle fonctionnalité" \
  --body "Description de la PR"

# Vérifier le status des checks
gh pr checks
```

### Merger une PR via CLI

```bash
# Merger si tous les checks passent
gh pr merge --squash --auto

# Forcer le merge (déconseillé)
gh pr merge --admin --squash
```

---

## Best Practices

### 1. Ne jamais contourner les règles

❌ **Mauvais** :
```bash
git push --force origin main  # Bloqué par ruleset
# → Ajouter un bypass
# → Push
# → Oublier de retirer le bypass
```

✅ **Bon** :
```bash
# Toujours passer par une PR
git checkout -b hotfix/urgent-fix
# Fix
git push origin hotfix/urgent-fix
gh pr create --base main --head hotfix/urgent-fix
# Attendre les checks
gh pr merge --squash
```

---

### 2. Toujours résoudre les commentaires

GitHub bloque le merge si "Require conversation resolution" est activé.

✅ **Process** :
1. Reviewer laisse un commentaire
2. Dev corrige le code OU répond au commentaire
3. Reviewer clique "Resolve conversation"
4. Merge autorisé

---

### 3. Garder les branches à jour

Avant de merger, s'assurer que la branche est à jour :

```bash
# Mettre à jour depuis develop
git checkout feature/ma-feature
git fetch origin
git rebase origin/develop
git push --force-with-lease origin feature/ma-feature
```

---

### 4. Surveiller les Quality Gates

SonarQube est configuré pour bloquer si :
- ❌ Coverage < 80%
- ❌ Bugs détectés
- ❌ Vulnerabilities détectées
- ❌ Code Smells critiques

**Action** : Vérifier SonarQube **avant** de créer la PR :

```bash
npm run test:coverage
npm run sonar
```

Aller sur : https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv

---

## Résumé de la configuration

| Branche | Ruleset | PR requise | Checks requis | Force push | Linear history | Conversation resolution |
|---------|---------|------------|---------------|------------|----------------|------------------------|
| `main` | `protect-main` | ✅ Oui (0 approvals) | ✅ `lint`, `test`, `sonarqube`, `build` | ❌ Bloqué | ✅ Requis | ✅ Requis |
| `develop` | `protect-develop` | ✅ Oui (0 approvals) | ✅ `lint`, `test`, `sonarqube`, `build` | ❌ Bloqué | ❌ Non requis | ✅ Requis |

**Pipeline CI/CD** : `.github/workflows/ci.yml`
**Déploiement** : `.github/workflows/deploy.yml` (main uniquement)
**SonarQube** : https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv

---

**Dernière mise à jour** : 2025-11-10
**Status** : ✅ Configuration complète et testée
