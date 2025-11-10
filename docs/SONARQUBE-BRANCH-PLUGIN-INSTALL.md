# Installation du SonarQube Community Branch Plugin

> Plugin pour activer l'analyse multi-branches en Community Edition
> Repository: https://github.com/mc1arke/sonarqube-community-branch-plugin
> Version: 1.23.0

## 🎯 Prérequis

- SonarQube 10.8+ ou 2028.1+ (vous avez 25.11.0 ✅)
- Accès administrateur au serveur SonarQube
- SonarQube installé sur serveur (pas Docker dans ce cas)

---

## 📥 Installation Manuelle (si SonarQube non-Docker)

### Étape 1: Télécharger le plugin

```bash
# Se connecter au serveur SonarQube
ssh user@sonarqube.maflabs.fr

# Télécharger la dernière version
cd /tmp
wget https://github.com/mc1arke/sonarqube-community-branch-plugin/releases/download/1.23.0/sonarqube-community-branch-plugin-1.23.0.jar

# Vérifier le téléchargement
ls -lh sonarqube-community-branch-plugin-1.23.0.jar
```

### Étape 2: Installer le plugin

```bash
# Copier dans le dossier des plugins SonarQube
# (Le chemin peut varier selon votre installation)
sudo cp sonarqube-community-branch-plugin-1.23.0.jar /opt/sonarqube/extensions/plugins/

# Vérifier les permissions
sudo chown sonarqube:sonarqube /opt/sonarqube/extensions/plugins/sonarqube-community-branch-plugin-1.23.0.jar
```

### Étape 3: Configurer SonarQube

Éditer le fichier `sonar.properties` :

```bash
sudo nano /opt/sonarqube/conf/sonar.properties
```

Ajouter ces lignes :

```properties
# Community Branch Plugin
sonar.web.javaAdditionalOpts=-javaagent:/opt/sonarqube/extensions/plugins/sonarqube-community-branch-plugin-1.23.0.jar=web
sonar.ce.javaAdditionalOpts=-javaagent:/opt/sonarqube/extensions/plugins/sonarqube-community-branch-plugin-1.23.0.jar=ce
```

### Étape 4: Redémarrer SonarQube

```bash
# Arrêter SonarQube
sudo systemctl stop sonarqube

# Démarrer SonarQube
sudo systemctl start sonarqube

# Vérifier les logs
sudo tail -f /opt/sonarqube/logs/sonar.log
```

Attendre que SonarQube démarre complètement (chercher "SonarQube is operational" dans les logs).

### Étape 5: Vérifier l'installation

1. Se connecter à https://sonarqube.maflabs.fr/
2. Aller dans **Administration** → **Marketplace** → **Installed**
3. Vérifier que "Community Branch Plugin" apparaît dans la liste

---

## 🐳 Installation Docker (Alternative)

Si votre SonarQube est dans Docker, utilisez l'image pré-configurée :

### Étape 1: Arrêter le conteneur actuel

```bash
docker stop sonarqube
docker rm sonarqube
```

### Étape 2: Utiliser l'image avec plugin pré-installé

```bash
docker run -d \
  --name sonarqube \
  -p 9000:9000 \
  -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
  -v sonarqube_data:/opt/sonarqube/data \
  -v sonarqube_extensions:/opt/sonarqube/extensions \
  -v sonarqube_logs:/opt/sonarqube/logs \
  mc1arke/sonarqube-with-community-branch-plugin:10.8-community
```

**Ou avec Docker Compose** :

```yaml
# docker-compose.yml
version: "3"

services:
  sonarqube:
    image: mc1arke/sonarqube-with-community-branch-plugin:10.8-community
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
    volumes:
      - sonarqube_data:/opt/sonarqube/data
      - sonarqube_extensions:/opt/sonarqube/extensions
      - sonarqube_logs:/opt/sonarqube/logs

volumes:
  sonarqube_data:
  sonarqube_extensions:
  sonarqube_logs:
```

Démarrer :

```bash
docker-compose up -d
```

---

## 🔧 Configuration du projet (côté client)

Une fois le plugin installé sur le serveur, mettez à jour votre configuration locale :

### Mise à jour de sonar-project.properties

```properties
# Activer l'analyse de branches
sonar.branch.name=${BRANCH_NAME}

# Pour les Pull Requests
sonar.pullrequest.key=${PR_NUMBER}
sonar.pullrequest.branch=${PR_BRANCH}
sonar.pullrequest.base=${PR_BASE_BRANCH}
```

### Mise à jour de sonar-scanner.js

```javascript
const { default: scanner } = require('sonarqube-scanner');
require('dotenv').config();

const branchName = process.env.BRANCH_NAME || 'main';
const isPR = process.env.IS_PR === 'true';

const baseOptions = {
  'sonar.projectKey': 'portfolio-cv',
  'sonar.projectName': 'Portfolio CV Angular',
  'sonar.projectVersion': '1.0.0',
  'sonar.sources': 'src',
  'sonar.tests': 'src',
  'sonar.test.inclusions': '**/*.spec.ts',
  'sonar.exclusions': '**/*.spec.ts,**/*.mock.ts,**/node_modules/**,**/dist/**',
  'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
};

// Ajouter les options de branche si activées
if (branchName !== 'main' && !isPR) {
  baseOptions['sonar.branch.name'] = branchName;
}

// Ajouter les options PR si c'est une PR
if (isPR) {
  baseOptions['sonar.pullrequest.key'] = process.env.PR_NUMBER;
  baseOptions['sonar.pullrequest.branch'] = process.env.PR_BRANCH;
  baseOptions['sonar.pullrequest.base'] = process.env.PR_BASE_BRANCH || 'main';
}

scanner(
  {
    serverUrl: process.env.SONAR_HOST_URL || 'https://sonarqube.maflabs.fr',
    token: process.env.SONAR_TOKEN,
    options: baseOptions,
  },
  () => {
    console.log('✅ SonarQube analysis completed');
    process.exit();
  },
  error => {
    console.error('❌ SonarQube analysis failed:', error);
    process.exit(1);
  }
);
```

### Scripts NPM pour branches

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "sonar": "node sonar-scanner.js",
    "sonar:branch": "BRANCH_NAME=$BRANCH_NAME node sonar-scanner.js",
    "sonar:pr": "IS_PR=true PR_NUMBER=$PR_NUMBER PR_BRANCH=$PR_BRANCH PR_BASE_BRANCH=$PR_BASE_BRANCH node sonar-scanner.js"
  }
}
```

### Utilisation

```bash
# Analyser la branche courante
BRANCH_NAME=feature/my-feature npm run sonar:branch

# Analyser une Pull Request
IS_PR=true PR_NUMBER=123 PR_BRANCH=feature/my-feature PR_BASE_BRANCH=main npm run sonar:pr
```

---

## 🚦 GitHub Actions avec branches

Exemple de workflow qui analyse toutes les branches :

```yaml
name: SonarQube Analysis

on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
  pull_request:
    branches:
      - main
      - develop

jobs:
  sonarqube:
    name: SonarQube Scan
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Important pour l'analyse de branches

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: SonarQube Scan (Branch)
        if: github.event_name == 'push'
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
          BRANCH_NAME: ${{ github.ref_name }}
        run: npm run sonar:branch

      - name: SonarQube Scan (PR)
        if: github.event_name == 'pull_request'
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
          IS_PR: 'true'
          PR_NUMBER: ${{ github.event.pull_request.number }}
          PR_BRANCH: ${{ github.head_ref }}
          PR_BASE_BRANCH: ${{ github.base_ref }}
        run: npm run sonar:pr
```

---

## ✅ Vérification

Après installation du plugin :

1. **Vérifier dans SonarQube** :
   - Aller sur https://sonarqube.maflabs.fr/dashboard?id=portfolio-cv
   - Un dropdown "Branch" devrait apparaître en haut à gauche
   - Vous pourrez sélectionner différentes branches

2. **Tester l'analyse d'une branche** :
   ```bash
   git checkout -b feature/test-branch
   BRANCH_NAME=feature/test-branch npm run sonar:branch
   ```

3. **Vérifier sur le dashboard** :
   - La branche "feature/test-branch" devrait apparaître dans le dropdown
   - Vous pouvez comparer les résultats entre branches

---

## 🐛 Troubleshooting

### Erreur : "Branch analysis is not available"
→ Le plugin n'est pas correctement installé ou SonarQube n'a pas redémarré

### Erreur : "Invalid branch name"
→ Vérifier que `sonar.branch.name` est bien défini

### Les branches n'apparaissent pas dans le dashboard
→ Vider le cache du navigateur et actualiser

### Plugin ne se charge pas
→ Vérifier les logs SonarQube : `/opt/sonarqube/logs/sonar.log`
→ Vérifier les permissions du fichier JAR

---

## 📚 Ressources

- Plugin GitHub: https://github.com/mc1arke/sonarqube-community-branch-plugin
- Documentation: https://github.com/mc1arke/sonarqube-community-branch-plugin/blob/master/README.md
- Issues: https://github.com/mc1arke/sonarqube-community-branch-plugin/issues

---

**Date**: 2025-11-10
**Version du plugin**: 1.23.0
**Compatible avec**: SonarQube 10.8+ / 2025.1+
