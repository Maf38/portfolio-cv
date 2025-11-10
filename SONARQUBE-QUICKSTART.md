# SonarQube Quick Start Guide

## 🎯 Ce que vous devez faire MAINTENANT

### Étape 1: Créer le projet sur SonarQube Server (5 minutes)

1. **Ouvrir** https://sonarqube.maflabs.fr/ dans votre navigateur
2. **Se connecter** avec vos identifiants
3. **Créer un nouveau projet** :
   - Cliquer sur le bouton **"+"** ou **"Create Project"**
   - Choisir **"Manually"**
   - Remplir :
     - **Project key**: `portfolio-cv`
     - **Display name**: `Portfolio CV Angular`
     - **Main branch**: `main`
   - Cliquer **"Set Up"**

4. **Générer un token** :
   - SonarQube vous propose automatiquement de générer un token
   - Choisir **"Locally"**
   - **Token name**: `portfolio-cv-local`
   - **Expires in**: `No expiration` (ou 90 days)
   - Cliquer **"Generate"**
   - **⚠️ COPIER LE TOKEN** (il ressemble à : `sqa_abc123...`)

### Étape 2: Créer le fichier .env (1 minute)

À la racine du projet, créer un fichier `.env` :

```bash
SONAR_TOKEN=sqa_votre_token_copié_ici
SONAR_HOST_URL=https://sonarqube.maflabs.fr
```

**Remplacer `sqa_votre_token_copié_ici` par le token réel !**

### Étape 3: Tester la connexion (2 minutes)

```bash
# 1. Générer le coverage (nécessaire pour SonarQube)
npm run test:coverage

# 2. Lancer l'analyse SonarQube
npm run sonar
```

**Si ça fonctionne**, vous verrez :
```
✅ SonarQube analysis completed
```

**Puis vérifier sur le serveur** :
- Aller sur https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv
- Vous devriez voir le dashboard avec les metrics

### Étape 4: Configurer SonarLint dans VSCode (3 minutes)

1. **Ouvrir VSCode**
2. **Installer l'extension SonarLint** :
   - Extensions (Ctrl+Shift+X)
   - Rechercher "SonarLint"
   - Installer

3. **Connecter au serveur** :
   - Ouvrir la palette de commandes (Ctrl+Shift+P)
   - Taper : "SonarLint: Add SonarQube Connection"
   - Entrer URL : `https://sonarqube.maflabs.fr`
   - Entrer le token généré à l'étape 1
   - Sélectionner le projet : `portfolio-cv`

4. **Activer l'analyse** :
   - Palette de commandes (Ctrl+Shift+P)
   - "SonarLint: Update all project bindings to SonarQube/SonarCloud"
   - Redémarrer VSCode

**Maintenant l'analyse automatique devrait fonctionner !**

---

## ✅ Vérification que tout fonctionne

### Dans VSCode

- Icône SonarLint visible dans la barre de statut (en bas)
- Pas de message "Automatic analysis is disabled"
- Les problèmes SonarLint apparaissent dans le panel "Problems"

### Sur le serveur

- Dashboard visible : https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv
- Metrics affichées (Coverage, Bugs, Vulnerabilities, etc.)
- Quality Gate : vert si coverage >80%

---

## 🚨 Problèmes courants

### "You're not authorized to run analysis"
→ Vérifier que le token dans `.env` est correct

### "Project not found"
→ Vérifier que le project key est bien `portfolio-cv` sur le serveur

### Coverage 0%
→ Lancer `npm run test:coverage` AVANT `npm run sonar`

### SonarLint ne fonctionne pas dans VSCode
→ Vérifier que la connexion au serveur est bien configurée
→ Redémarrer VSCode

---

## 📚 Documentation complète

Voir [docs/SONARQUBE-SETUP.md](docs/SONARQUBE-SETUP.md) pour :
- Configuration détaillée
- Troubleshooting complet
- Quality Gates
- Intégration CI/CD

---

**Temps total estimé** : 10-15 minutes
