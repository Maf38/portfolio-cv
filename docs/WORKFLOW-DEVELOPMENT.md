# Workflow de Développement - Portfolio CV

Ce document décrit le workflow complet de développement d'une feature, incluant validation visuelle avec Playwright et tests manuels avant PR.

## Vue d'Ensemble

```
Planification → Développement → Tests Unitaires → Validation Visuelle (Playwright)
→ Tests Manuels (User Validation) → PR → CI/CD → Merge
```

## Phase 1: Planification

### 1. Créer/Assigner le ticket JIRA
- Vérifier que le ticket existe (PCV-X)
- Transition vers "In Progress"
- Ajouter commentaires avec contexte technique

### 2. Créer la branche depuis `develop`
```bash
git checkout develop
git pull origin develop
git checkout -b feat/feature-name
```

**Convention de nommage** :
- `feat/` : Nouvelle fonctionnalité
- `fix/` : Correction de bug
- `refactor/` : Refactoring
- `docs/` : Documentation uniquement

## Phase 2: Développement

### 1. Implémenter la Feature

Suivre les best practices Angular :
- Standalone components avec `ChangeDetectionStrategy.OnPush`
- TypeScript strict mode
- SCSS pour le styling
- Lazy loading quand pertinent

### 2. Suivre les Standards de Code

**Linting continu** :
```bash
npm run lint        # Vérifier
npm run lint:fix    # Corriger automatiquement
```

**Formatting automatique** :
- Prettier configuré (runs automatiquement avec lint:fix)
- Suivre les règles ESLint du projet

### 3. Commits Réguliers

**Convention Conventional Commits** :
```
feat: add navigation header component
fix: correct spotlight effect on mobile
docs: update development workflow
test: add unit tests for header component
refactor: extract spotlight logic to service
style: format header component SCSS
```

## Phase 3: Validation Visuelle avec Playwright (AVANT les tests unitaires)

⚠️ **IMPORTANT** : Les tests unitaires sont écrits **APRÈS** validation visuelle complète

### Pourquoi ce workflow ?

1. **Éviter de réécrire les tests** : Si le design change après user validation, pas besoin de refaire les tests
2. **Itération rapide** : Focus sur le visuel d'abord, tests une fois que c'est validé
3. **Efficiency** : Tests écrits une seule fois sur le code final

### 1. Démarrer le Serveur de Développement

```bash
npm start
# Application disponible sur http://localhost:4200
# Pour accès réseau (VM): npm start -- --host 0.0.0.0 --port 4201
```

### 2. Auto-validation avec Playwright MCP

**Utiliser Playwright MCP pour** :

1. **Naviguer vers les pages implémentées**
```typescript
// Via Playwright MCP
mcp__playwright__browser_navigate({ url: 'http://localhost:4200/about' })
```

2. **Prendre des Screenshots**
```typescript
// Screenshot de la feature
mcp__playwright__browser_take_screenshot({
  filename: 'docs/screenshots/feature-name-desktop.png',
  fullPage: true
})

// Screenshot mobile (resize d'abord)
mcp__playwright__browser_resize({ width: 375, height: 667 })
mcp__playwright__browser_take_screenshot({
  filename: 'docs/screenshots/feature-name-mobile.png',
  fullPage: true
})
```

3. **Vérifier les Interactions**
```typescript
// Test navigation
mcp__playwright__browser_click({
  element: 'Navigation link About',
  ref: 'e10' // Référence du snapshot
})

// Vérifier URL changée
// Prendre screenshot après interaction
```

4. **Tester le Responsive**
```typescript
// Desktop
mcp__playwright__browser_resize({ width: 1920, height: 1080 })
// Tablet
mcp__playwright__browser_resize({ width: 768, height: 1024 })
// Mobile
mcp__playwright__browser_resize({ width: 375, height: 667 })
```

### 3. Itération si Problèmes Détectés

**Si Playwright révèle des problèmes** :
1. Noter les issues visuelles/fonctionnelles
2. Corriger le code
3. Re-tester avec Playwright
4. Répéter jusqu'à validation complète

**Checklist Playwright** :
- [ ] Page se charge sans erreur
- [ ] Tous les éléments sont visibles
- [ ] Navigation fonctionne
- [ ] Responsive (desktop, tablet, mobile)
- [ ] Interactions (clicks, hover, forms)
- [ ] Pas d'erreurs console
- [ ] Spotlight effect (si applicable)

## Phase 4: Tests Manuels (User Validation)

### 1. Préparer l'Environnement de Test

```bash
# Assurer que le serveur dev tourne
npm start

# Ouvrir dans le browser
# http://localhost:4200
```

### 2. Checklist de Validation Manuelle

**Fonctionnalités** :
- [ ] Toutes les fonctionnalités implémentées marchent
- [ ] Navigation fluide entre les pages
- [ ] Formulaires (si applicable) fonctionnent
- [ ] Données s'affichent correctement

**Design & UX** :
- [ ] Design conforme aux screenshots de référence
- [ ] Typography correcte (tailles, poids, couleurs)
- [ ] Espacement cohérent
- [ ] Animations fluides
- [ ] Spotlight effect suit bien la souris (si applicable)

**Responsive** :
- [ ] Mobile (375px) : layout OK, menu burger fonctionne
- [ ] Tablet (768px) : layout OK
- [ ] Desktop (1920px) : layout OK, espacement optimal

**Performance** :
- [ ] Pas de lag/freeze
- [ ] Animations 60fps
- [ ] Chargement rapide des pages

**Accessibilité** :
- [ ] Navigation au clavier (Tab, Enter)
- [ ] Contraste des couleurs suffisant
- [ ] ARIA labels présents

### 3. Ajustements Avant PR

**Si problèmes détectés** :
1. **Lister tous les problèmes trouvés**
2. **Prioriser** (critiques vs. nice-to-have)
3. **Corriger les problèmes critiques**
4. **Re-tester manuellement**
5. **Répéter jusqu'à validation OK**

**Communication avec l'utilisateur** :
- "J'ai démarré le serveur sur http://localhost:4200"
- "Peux-tu valider la feature /about avant que je crée la PR ?"
- "Voici les screenshots Playwright pour référence : [liens]"
- Attendre validation explicite : ✅ "OK pour la PR"

## Phase 5: Tests Unitaires (APRÈS validation visuelle)

⚠️ **IMPORTANT** : Les tests sont écrits **APRÈS** que le design et les fonctionnalités soient validés

### 1. Écrire les Tests

**Coverage requis** : >80% pour tous les fichiers

```bash
# Run tests en watch mode pendant le développement
npm run test

# Vérifier coverage avant commit
npm run test:coverage
```

### 2. Types de Tests à Écrire

**Component Tests** :
```typescript
describe('HeaderComponent', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to section on click', () => {
    const scrollSpy = spyOn(window, 'scrollTo');
    component.scrollToSection('about');
    expect(scrollSpy).toHaveBeenCalled();
  });
});
```

**Service Tests** :
- Test tous les méthodes publiques
- Mock les dépendances (HttpClient, etc.)
- Test les cas limites et erreurs

**Integration Tests** :
- Test les interactions entre composants
- Test le smooth scroll
- Test les forms

### 3. Pourquoi Après Validation ?

**Avantages** :
- ✅ Pas de refonte des tests si le design change
- ✅ Tests écrits une seule fois sur le code final
- ✅ Meilleure qualité des tests (on connaît le comportement attendu)
- ✅ Gain de temps global

## Phase 6: Création de la Pull Request

### 1. Vérifications Pré-PR

**Automated Checks** :
```bash
# Lint
npm run lint

# Tests unitaires
npm run test:coverage
# → Tous les tests passent
# → Coverage >80%

# Build production
npm run build
# → Aucune erreur de build
```

**Manual Checks** :
- ✅ Playwright validation complete
- ✅ User manual validation OK
- ✅ Screenshots captured
- ✅ No console errors
- ✅ Responsive tested

### 2. Commit Final & Push

```bash
git add -A
git commit -m "feat: descriptive message

## Features Implemented
- Feature 1
- Feature 2

## Tests
- X unit tests (all passing)
- Coverage: Y%
- Playwright validation: ✅
- Manual validation: ✅

## Related JIRA
- PCV-X: Feature Name

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

git push -u origin feat/feature-name
```

### 3. Créer la PR sur GitHub

```bash
gh pr create --title "feat: Feature Name" --body "..." --base develop
```

**PR Description Template** :
```markdown
## Summary
Brief description of the feature

## Changes
- Change 1
- Change 2

## Screenshots
### Desktop
![Desktop](docs/screenshots/feature-desktop.png)

### Mobile
![Mobile](docs/screenshots/feature-mobile.png)

## Testing
- [x] Unit tests: 29 tests passing, 61.9% coverage
- [x] Playwright validation: All pages load, interactions work
- [x] Manual validation: User approved on http://localhost:4200
- [x] Responsive: Tested on mobile (375px), tablet (768px), desktop (1920px)

## Checklist
- [x] Linting passes
- [x] Tests pass
- [x] Build succeeds
- [x] Playwright validation complete
- [x] User manual validation OK
- [x] JIRA ticket updated

## Related JIRA
- PCV-X: Feature Name

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Phase 7: CI/CD & Code Review

### 1. Attendre les Checks GitHub Actions

**Pipeline exécute** :
1. Lint & Format Check
2. Unit Tests & Coverage
3. SonarQube Analysis (Quality Gate)
4. Build Application

**Si un check échoue** :
1. Analyser l'erreur dans les logs GitHub Actions
2. Corriger localement
3. Commit + Push
4. Re-vérifier les checks

### 2. Review SonarQube

**Quality Gate Criteria** :
- 0 bugs
- 0 vulnerabilities
- Coverage >80%
- Code smells < X
- Duplications < 3%

**Si Quality Gate échoue** :
- Consulter https://sonarqube.maflabs.fr/
- Corriger les issues détectées
- Re-push

### 3. Merge

**Quand tous les checks passent** :
```bash
gh pr merge --squash --delete-branch
```

**Mise à jour locale** :
```bash
git checkout develop
git pull origin develop
```

## Bonnes Pratiques

### Do ✅

1. **Toujours partir de `develop` à jour**
2. **Commits atomiques et fréquents**
3. **Tests AVANT le commit**
4. **Playwright validation AVANT la PR**
5. **User validation AVANT la PR**
6. **PR petites et focalisées** (1 feature = 1 PR)
7. **Screenshots dans la PR**
8. **Mettre à jour JIRA** (commentaires, transitions)

### Don't ❌

1. ❌ Commit directement sur `main` ou `develop`
2. ❌ PR sans tests
3. ❌ PR sans Playwright validation
4. ❌ PR sans user manual validation
5. ❌ Ignorer les warnings ESLint
6. ❌ Skip les Quality Gate checks
7. ❌ Force push sur branches partagées
8. ❌ Commits avec des secrets/tokens

## Outils & Commandes Utiles

### Development
```bash
npm start                  # Dev server
npm run build             # Production build
npm run lint              # Check linting
npm run lint:fix          # Fix linting
npm run test              # Tests (watch mode)
npm run test:coverage     # Tests with coverage
```

### Git
```bash
git status                # Check changes
git diff                  # See modifications
git log --oneline -10     # Recent commits
git checkout develop      # Switch to develop
git pull origin develop   # Update develop
```

### GitHub CLI
```bash
gh pr create              # Create PR
gh pr checks              # Check PR status
gh pr merge --squash      # Merge PR
gh pr view                # View PR details
```

### Playwright MCP
```bash
# Via MCP tools in Claude Code
mcp__playwright__browser_navigate({ url: '...' })
mcp__playwright__browser_take_screenshot({ filename: '...' })
mcp__playwright__browser_click({ element: '...', ref: '...' })
mcp__playwright__browser_resize({ width: X, height: Y })
```

## Troubleshooting

### Tests échouent localement
1. Vérifier que `node_modules` est à jour : `npm install`
2. Clear cache : `rm -rf .angular/cache`
3. Relancer : `npm run test`

### Build échoue
1. Vérifier les erreurs TypeScript
2. Vérifier les imports manquants
3. Check SCSS syntax
4. `npm run build -- --verbose` pour plus de détails

### Quality Gate échoue
1. Consulter SonarQube dashboard
2. Fixer les issues critiques en priorité
3. Ajouter des tests pour augmenter coverage
4. Refactor code smells

### Playwright MCP ne fonctionne pas
1. Vérifier que le serveur dev tourne (`npm start`)
2. Vérifier que Playwright MCP est connecté
3. Restart Claude Code si nécessaire
4. Check les logs MCP

---

**Last updated**: 2025-11-10
**Version**: 1.0
**Status**: Official Development Workflow
