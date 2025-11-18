# Workflow de Développement - Bonnes Pratiques

## Avant Chaque Commit

### 1. Auto-fix ESLint/Prettier (OBLIGATOIRE)

**⚠️ IMPORTANT** : Toujours exécuter cette commande avant de commiter :

```bash
npm run lint:fix
```

**Pourquoi ?**
- Le CI/CD GitHub Actions exécute `npm run lint` avec les mêmes règles
- Si le code n'est pas formaté, le pipeline échoue
- Auto-fix corrige automatiquement 99% des erreurs (formatage, indentation, etc.)

**Workflow recommandé** :
```bash
# 1. Vérifier les changements
git status

# 2. Auto-fix ESLint/Prettier
npm run lint:fix

# 3. Vérifier que tout passe
npm run lint

# 4. Commiter
git add -A
git commit -m "your message"
git push
```

### 2. Tests Unitaires

Avant de créer une PR, s'assurer que tous les tests passent :

```bash
# Lancer les tests
npm test

# Ou avec coverage
npm run test:coverage
```

**Quality Gates (thresholds dans karma.conf.js)** :
- Statements: 60%
- Branches: 50%
- Functions: 30%
- Lines: 50%

### 3. Build Production

Vérifier que le build production passe :

```bash
npm run build
```

---

## Workflow Complet pour une Feature

### Phase 1 : Développement

```bash
# 1. Créer une branche feature
git checkout -b feat/my-feature

# 2. Développer la feature
# ... écrire le code ...

# 3. Auto-fix avant commit (IMPORTANT!)
npm run lint:fix

# 4. Vérifier que tout passe
npm run lint
npm test

# 5. Commiter
git add -A
git commit -m "feat: add my feature"
```

### Phase 2 : Tests et Qualité

```bash
# 1. Lancer les tests avec coverage
npm run test:coverage

# 2. Vérifier la coverage
# Ouvrir coverage/portfolio-cv/index.html dans le navigateur

# 3. Si coverage < thresholds, ajouter des tests

# 4. Auto-fix et commit les tests
npm run lint:fix
git add -A
git commit -m "test: add unit tests for my-feature"
```

### Phase 3 : Push et PR

```bash
# 1. Push vers remote
git push origin feat/my-feature

# 2. Créer la PR sur GitHub
# Via l'interface web ou gh CLI

# 3. Attendre les résultats du CI/CD
# - Lint & Format Check
# - Unit Tests
# - Build Production
# - SonarQube Analysis

# 4. Si le CI échoue :
# - Récupérer les logs d'erreur
# - Corriger localement
# - npm run lint:fix
# - Commiter et pusher
```

---

## Scripts npm Disponibles

### Développement
```bash
npm start                    # Serveur de dev (port 4200)
npm start -- --port 4201 --host 0.0.0.0  # Serveur accessible depuis VM
```

### Tests
```bash
npm test                     # Tests en mode watch
npm run test:coverage        # Tests avec coverage
```

### Lint et Format
```bash
npm run lint                 # Vérifier ESLint/Prettier
npm run lint:fix            # Auto-fix ESLint/Prettier (UTILISER AVANT COMMIT)
npm run format              # Formater avec Prettier uniquement
npm run format:check        # Vérifier format Prettier
```

### Build
```bash
npm run build               # Build production
npm run watch               # Build en mode watch
```

### SonarQube
```bash
npm run sonar               # Analyse SonarQube locale
npm run sonar:branch        # Analyse pour une branche
npm run sonar:pr            # Analyse pour une PR
```

---

## Conventions de Commit

Suivre **Conventional Commits** :

```bash
feat: add new feature
fix: correct bug
docs: update documentation
style: formatting changes
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

**Exemples** :
```bash
git commit -m "feat: add contact card modal with accessibility"
git commit -m "fix: resolve ESLint errors in header component"
git commit -m "test: add unit tests for experience section"
git commit -m "docs: update DEV-WORKFLOW.md with lint:fix workflow"
```

---

## Résolution de Problèmes Courants

### ESLint échoue sur le CI mais pas localement

**Cause** : Configuration ESLint/Prettier différente ou pas appliquée

**Solution** :
```bash
# Auto-fix avec la même config que le CI
npm run lint:fix

# Vérifier
npm run lint

# Si toujours des erreurs, lire les logs du CI et corriger manuellement
```

### Tests passent localement mais échouent sur CI

**Causes possibles** :
- Timeouts différents
- Données en cache
- Dépendances manquantes

**Solution** :
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Relancer les tests
npm test
```

### Coverage insuffisante

**Solution** :
1. Lancer `npm run test:coverage`
2. Ouvrir `coverage/portfolio-cv/index.html`
3. Identifier les fichiers avec coverage < thresholds
4. Ajouter des tests unitaires pour ces fichiers
5. Vérifier que la coverage passe les thresholds

---

## Checklist avant de Créer une PR

- [ ] `npm run lint:fix` exécuté
- [ ] `npm run lint` passe sans erreur
- [ ] `npm test` passe (tous les tests verts)
- [ ] `npm run test:coverage` passe les thresholds
- [ ] `npm run build` réussit
- [ ] Commits suivent Conventional Commits
- [ ] PR liée à une issue JIRA (PCV-XXX)
- [ ] Description de la PR complète (ce qui a été fait, pourquoi, comment tester)

---

**Dernière mise à jour** : 2025-11-17
**Auteur** : Mafal Gai
