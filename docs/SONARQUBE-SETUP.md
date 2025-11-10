# SonarQube Setup Guide

> Guide de configuration de SonarQube pour portfolio-cv
> Server: https://sonarqube.maflabs.fr/
> Date: 2025-11-10

## 📋 Prérequis

- Accès au serveur SonarQube : https://sonarqube.maflabs.fr/
- Identifiants de connexion
- SonarScanner installé (ou utiliser Docker)

---

## 🚀 Configuration Server SonarQube

### Étape 1: Connexion au serveur

1. Ouvrir https://sonarqube.maflabs.fr/
2. Se connecter avec vos identifiants
3. Vous devriez arriver sur le dashboard

### Étape 2: Créer le projet

1. Cliquer sur **"Create Project"** ou **"+"** en haut à droite
2. Choisir **"Manually"**
3. Remplir les informations :
   - **Project key**: `portfolio-cv`
   - **Display name**: `Portfolio CV Angular`
   - **Main branch name**: `main`
4. Cliquer sur **"Set Up"**

### Étape 3: Générer un token d'authentification

1. Après création du projet, SonarQube vous propose de générer un token
2. Choisir **"Locally"** (analyse locale)
3. Générer le token :
   - **Token name**: `portfolio-cv-local`
   - **Type**: `User Token`
   - **Expires in**: `90 days` (ou `No expiration` si préféré)
4. Cliquer sur **"Generate"**
5. **COPIER LE TOKEN** - Il ne sera affiché qu'une seule fois !

**Exemple de token**: `sqa_1234567890abcdefghijklmnopqrstuvwxyz`

### Étape 4: Sauvegarder le token

Le token doit être stocké de manière sécurisée. Nous allons le mettre dans un fichier `.env` qui sera ignoré par Git.

**Créer le fichier `.env` à la racine du projet** :

```bash
# SonarQube Configuration
SONAR_TOKEN=votre_token_ici
SONAR_HOST_URL=https://sonarqube.maflabs.fr
```

**Ajouter `.env` au `.gitignore`** (déjà fait normalement) :

```
# Environment variables
.env
.env.local
```

---

## 🔧 Configuration SonarScanner

### Option 1: Installer SonarScanner globalement

```bash
# Télécharger SonarScanner
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip

# Extraire
unzip sonar-scanner-cli-5.0.1.3006-linux.zip

# Déplacer vers /opt
sudo mv sonar-scanner-5.0.1.3006-linux /opt/sonar-scanner

# Ajouter au PATH
echo 'export PATH="/opt/sonar-scanner/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Vérifier l'installation
sonar-scanner --version
```

### Option 2: Utiliser Docker (Recommandé)

**Créer un script `sonar-scan.sh`** :

```bash
#!/bin/bash

# Load environment variables
source .env

# Run SonarScanner with Docker
docker run \
  --rm \
  -e SONAR_HOST_URL="${SONAR_HOST_URL}" \
  -e SONAR_TOKEN="${SONAR_TOKEN}" \
  -v "$(pwd):/usr/src" \
  sonarsource/sonar-scanner-cli
```

**Rendre le script exécutable** :

```bash
chmod +x sonar-scan.sh
```

### Option 3: NPM package (Plus simple pour CI/CD)

```bash
npm install -D sonarqube-scanner
```

**Créer un script Node.js `sonar-scanner.js`** :

```javascript
const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'https://sonarqube.maflabs.fr',
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.projectKey': 'portfolio-cv',
      'sonar.projectName': 'Portfolio CV Angular',
      'sonar.projectVersion': '1.0.0',
      'sonar.sources': 'src',
      'sonar.tests': 'src',
      'sonar.test.inclusions': '**/*.spec.ts',
      'sonar.exclusions': '**/*.spec.ts,**/*.mock.ts,**/node_modules/**,**/dist/**',
      'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => process.exit()
);
```

**Ajouter au package.json** :

```json
{
  "scripts": {
    "sonar": "node sonar-scanner.js"
  }
}
```

---

## 🧪 Lancer une première analyse

### 1. Générer le coverage report

```bash
npm run test:coverage
```

Ceci génère le fichier `coverage/lcov.info` nécessaire pour SonarQube.

### 2. Lancer l'analyse SonarQube

**Avec SonarScanner installé globalement** :

```bash
sonar-scanner \
  -Dsonar.host.url=https://sonarqube.maflabs.fr \
  -Dsonar.token=votre_token_ici
```

**Avec Docker** :

```bash
./sonar-scan.sh
```

**Avec NPM package** :

```bash
npm run sonar
```

### 3. Vérifier les résultats

1. Aller sur https://sonarqube.maflabs.fr/
2. Cliquer sur le projet **"Portfolio CV Angular"**
3. Vérifier les metrics :
   - **Bugs**: 0
   - **Vulnerabilities**: 0
   - **Code Smells**: < 10
   - **Coverage**: > 80%
   - **Duplications**: < 3%

---

## 🔌 Configuration SonarLint dans VSCode

SonarLint est l'extension IDE qui analyse le code en temps réel.

### Étape 1: Installer l'extension

1. Ouvrir VSCode
2. Aller dans Extensions (Ctrl+Shift+X)
3. Rechercher **"SonarLint"**
4. Installer l'extension officielle de SonarSource

### Étape 2: Configurer la connexion au serveur

1. Ouvrir les settings VSCode (`Ctrl+,`)
2. Rechercher "SonarLint"
3. Cliquer sur **"Edit in settings.json"**

**Ajouter la configuration suivante dans `.vscode/settings.json`** :

```json
{
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "serverUrl": "https://sonarqube.maflabs.fr",
      "token": "votre_token_sonarqube"
    }
  ],
  "sonarlint.connectedMode.project": {
    "projectKey": "portfolio-cv"
  },
  "sonarlint.rules": {
    "typescript:S1186": {
      "level": "on"
    },
    "typescript:S1134": {
      "level": "on"
    }
  }
}
```

### Étape 3: Activer l'analyse automatique

1. Ouvrir la palette de commandes (`Ctrl+Shift+P`)
2. Taper **"SonarLint: Update all project bindings to SonarQube/SonarCloud"**
3. Sélectionner le projet **portfolio-cv**
4. L'analyse devrait maintenant fonctionner

**Vous devriez voir** :
- Icône SonarLint dans la barre de statut
- Warnings/Errors en temps réel dans le code
- Panel "Problems" montrant les issues SonarLint

### Alternative: Configuration du workspace

**Créer `.vscode/settings.json` dans le projet** :

```json
{
  "sonarlint.connectedMode.connections.sonarqube": [
    {
      "serverUrl": "https://sonarqube.maflabs.fr"
    }
  ],
  "sonarlint.connectedMode.project": {
    "connectionId": "https://sonarqube.maflabs.fr",
    "projectKey": "portfolio-cv"
  }
}
```

**Puis connecter avec token via la commande** :
1. `Ctrl+Shift+P`
2. "SonarLint: Add SonarQube Connection"
3. Entrer l'URL: `https://sonarqube.maflabs.fr`
4. Entrer le token généré précédemment

---

## 📊 Quality Gate Configuration

### Configurer les seuils du Quality Gate

1. Sur SonarQube, aller dans **"Quality Gates"**
2. Cliquer sur **"Create"** ou utiliser "Sonar way" par défaut
3. Configurer les conditions :

**Conditions recommandées** :

| Metric | Operator | Value |
|--------|----------|-------|
| Coverage | is less than | 80% |
| Duplicated Lines (%) | is greater than | 3% |
| Maintainability Rating | is worse than | A |
| Reliability Rating | is worse than | A |
| Security Rating | is worse than | A |
| Security Hotspots Reviewed | is less than | 100% |

4. Associer ce Quality Gate au projet **portfolio-cv**

---

## 🚦 Vérification de la configuration

### Test complet

1. **Générer coverage** :
   ```bash
   npm run test:coverage
   ```

2. **Lancer ESLint** :
   ```bash
   npm run lint
   ```

3. **Lancer analyse SonarQube** :
   ```bash
   npm run sonar
   ```

4. **Vérifier sur le serveur** :
   - Aller sur https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv
   - Vérifier que les metrics s'affichent
   - Vérifier le Quality Gate (doit être vert si >80% coverage)

### Checklist finale

- [ ] Token SonarQube généré et sauvegardé
- [ ] Fichier `.env` créé avec `SONAR_TOKEN`
- [ ] SonarScanner installé (global, Docker, ou NPM)
- [ ] Première analyse réussie
- [ ] Project visible sur https://sonarqube.maflabs.fr/
- [ ] SonarLint configuré dans VSCode
- [ ] Analyse en temps réel fonctionne dans l'IDE
- [ ] Quality Gate configuré

---

## 🔐 Sécurité

**IMPORTANT** :

1. ✅ **NE JAMAIS** committer le token dans Git
2. ✅ Ajouter `.env` au `.gitignore`
3. ✅ Pour CI/CD, utiliser GitHub Secrets :
   - `SONAR_TOKEN` : Le token généré
   - `SONAR_HOST_URL` : https://sonarqube.maflabs.fr

**Vérifier que `.env` est ignoré** :

```bash
git status
# .env ne doit PAS apparaître dans les fichiers à commit
```

---

## 🐛 Troubleshooting

### Problème: "Automatic analysis is disabled"

**Solution** :
1. Vérifier que SonarLint est connecté au serveur
2. Ouvrir palette de commandes : "SonarLint: Update all project bindings"
3. Redémarrer VSCode

### Problème: "ERROR: You're not authorized to run analysis"

**Solution** :
1. Vérifier que le token est correct dans `.env`
2. Vérifier que le token n'a pas expiré sur SonarQube
3. Régénérer un nouveau token si nécessaire

### Problème: "Project not found on server"

**Solution** :
1. Vérifier que `sonar.projectKey=portfolio-cv` correspond au projet créé
2. Vérifier l'URL du serveur : `https://sonarqube.maflabs.fr`
3. Créer le projet sur le serveur si absent

### Problème: Coverage 0%

**Solution** :
1. Vérifier que `npm run test:coverage` génère bien `coverage/lcov.info`
2. Vérifier le chemin dans `sonar-project.properties` :
   ```properties
   sonar.typescript.lcov.reportPaths=coverage/lcov.info
   ```
3. Lancer les tests AVANT l'analyse SonarQube

---

## 📚 Ressources

- [SonarQube Documentation](https://docs.sonarqube.org/latest/)
- [SonarLint for VSCode](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
- [SonarScanner CLI](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)
- [TypeScript Coverage](https://docs.sonarqube.org/latest/analysis/languages/typescript/)

---

**Dernière mise à jour** : 2025-11-10
**Status** : Configuration en attente du token SonarQube
