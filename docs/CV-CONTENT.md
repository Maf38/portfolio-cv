# Portfolio CV - Contenu Structuré

> Contenu extrait des CVs historiques pour intégration dans le portfolio
> Sources: CV developpeur Mafal Gai.pdf + cv-mafal-gai-2025-03-30.pdf
> Date: 2025-11-09

## 📋 Informations Personnelles

### Profil
```json
{
  "fullName": "Mafal GAI",
  "title": "Développeur .NET",
  "subtitle": "6 ans d'expérience",
  "location": "Grenoble, France",
  "availability": "Available for new opportunities",
  "experience": "6 years (2019-2025)",
  "tagline": "Building exceptional digital experiences with modern technologies",
  "bio": "Développeur .NET avec 6 ans d'expérience dans le développement d'applications industrielles critiques pour EDF et CEA. Spécialisé en Angular, .NET Core et pratiques DevOps. Fort advocate du code propre, des tests automatisés et de la livraison continue.",
  "photo": "/assets/images/profile.jpg",
  "birthDate": "1978-03-11",
  "age": 46
}
```

### Contact & Social Links
```json
{
  "email": "gaimafal@gmail.com",
  "phone": "+33 6 70 16 05 17",
  "github": "https://github.com/[username]",
  "linkedin": "https://linkedin.com/in/[username]",
  "website": "https://[username].github.io/portfolio-cv",
  "address": "53A rue Pierre Semard, 38000 Grenoble, France",
  "location": "Grenoble, France"
}
```

---

## 💼 Expérience Professionnelle

### Timeline (6 ans)

#### 1. Full-Stack Developer & DevOps - Projet Personnel IFTT Trading
**Période**: Novembre 2024 - Présent (3 mois)
**Type**: Projet personnel / Freelance
**Localisation**: Remote

**Description**:
Conception et développement d'une plateforme de trading automatisé sur blockchain Solana avec ordres conditionnels basés sur des indicateurs techniques (RSI, EMA, prix).

**Réalisations**:
- Architecture microservices complète (5 services) avec API Gateway centralisée
- Backend NestJS 10.3 avec TypeORM, PostgreSQL, WebSockets (Socket.io)
- Frontend Angular 18.2 avec design retrogaming unique
- Intégration blockchain Solana (Phantom Wallet, Jupiter API)
- Infrastructure DevOps complète:
  - HashiCorp Vault pour gestion sécurisée des clés privées
  - Docker Compose multi-services
  - Monitoring Prometheus + Grafana
  - CI/CD GitLab
  - Backups S3 automatisés
- API temps réel de chandeliers OHLCV avec InfluxDB
- Automation via N8N (workflows de trading)

**Stack technique**:
- Frontend: Angular 18.2, TypeScript, RxJS, TailwindCSS
- Backend: NestJS 10.3, TypeORM, PostgreSQL 15
- Blockchain: Solana, @solana/web3.js, Jupiter API
- Time-series: InfluxDB 2.7
- Security: HashiCorp Vault, JWT, OAuth2
- DevOps: Docker, GitLab CI, Ansible, Terraform (en cours)
- Monitoring: Prometheus, Grafana

**Liens**:
- Code: `/workspace-amsterdam/iftt-trading-automation`
- DevOps: `/workspace-amsterdam/devops-iftt-trading`

---

#### 2. Senior Full-Stack Developer - EDF / Capgemini
**Période**: Septembre 2021 - Octobre 2024 (3 ans 1 mois)
**Type**: CDI (Capgemini) - Mission longue EDF
**Localisation**: Paris, France

**Description**:
Développement et maintenance d'applications critiques pour la division nucléaire d'EDF. Membre d'une équipe Scrum de 8 personnes travaillant sur des outils de gestion de projets industriels.

**Réalisations**:
- Développement de 5 modules front-end Angular avec architecture modulaire
- Conception et développement d'APIs REST .NET Core 6 avec Entity Framework
- Migration d'applications legacy .NET Framework vers .NET Core
- Mise en place de tests unitaires et d'intégration (couverture >80%)
- Intégration CI/CD avec Azure DevOps (pipelines YAML)
- Revues de code et mentorat de développeurs juniors
- Collaboration étroite avec les architectes et les Product Owners

**Stack technique**:
- Frontend: Angular 12-15, TypeScript, RxJS, Angular Material
- Backend: .NET Core 6, C#, Entity Framework Core, ASP.NET Web API
- Database: SQL Server 2019, Oracle 12c
- DevOps: Azure DevOps, Git, Docker
- Testing: Jasmine, Karma, xUnit, NUnit
- Méthodologie: Scrum, Git Flow, Code Reviews

**Environnement**:
- Équipe: 8 personnes (4 dev, 2 QA, 1 PO, 1 SM)
- Méthodologie: Scrum avec sprints de 3 semaines
- Outils: Jira, Confluence, Teams

---

#### 3. Full-Stack Developer - CEA (Alternance)
**Période**: Septembre 2019 - Août 2021 (2 ans)
**Type**: Contrat d'alternance (Master 2)
**Localisation**: Saclay, France

**Description**:
Développement d'une application web de gestion de laboratoire pour le Commissariat à l'Énergie Atomique (CEA). Alternance dans le cadre du Master 2 en Génie Logiciel.

**Réalisations**:
- Développement d'une SPA Angular 10 pour gestion d'équipements de laboratoire
- Backend .NET Core 3.1 avec architecture en couches (Clean Architecture)
- Conception et implémentation de base de données SQL Server
- Mise en place d'authentification et d'autorisation (Active Directory)
- Génération de rapports PDF avec iTextSharp
- Rédaction de documentation technique complète

**Stack technique**:
- Frontend: Angular 10, TypeScript, Bootstrap
- Backend: .NET Core 3.1, C#, Entity Framework Core
- Database: SQL Server 2017
- Authentification: Active Directory, OAuth2
- Tools: Visual Studio, Git, Postman

**Formation**:
- Master 2 Génie Logiciel - Université Paris-Saclay
- Alternance 3 jours entreprise / 2 jours école

---

#### 4. Développeur Web - Stagiaire EDF
**Période**: Avril 2019 - Août 2019 (5 mois)
**Type**: Stage de fin de licence
**Localisation**: Paris, France

**Description**:
Premier stage dans le développement web au sein d'EDF. Découverte du développement d'applications d'entreprise.

**Réalisations**:
- Développement de fonctionnalités front-end en Angular 7
- Correction de bugs et maintenance applicative
- Participation aux cérémonies Scrum (daily, retro, planning)
- Apprentissage des bonnes pratiques de développement en équipe

**Stack technique**:
- Frontend: Angular 7, TypeScript, HTML/CSS
- Backend: .NET Framework 4.7, C#
- Database: SQL Server
- Tools: TFS, Visual Studio

---

## 🎓 Formation

### Diplômes

#### Master 2 - Génie Logiciel
**Établissement**: Université Paris-Saclay
**Période**: 2019 - 2021
**Type**: Alternance
**Spécialisation**: Architecture logicielle, développement web, DevOps

**Cours principaux**:
- Architecture des applications distribuées
- Développement web avancé (Angular, React)
- Génie logiciel et patrons de conception
- DevOps et intégration continue
- Sécurité des applications web
- Gestion de projet Agile

**Projet de fin d'études**:
Application de gestion de laboratoire pour le CEA (cf. expérience alternance)

---

#### Licence Professionnelle - Développement Web et Mobile
**Établissement**: IUT Paris Descartes
**Période**: 2018 - 2019
**Type**: Formation initiale

**Cours principaux**:
- Programmation web (JavaScript, PHP)
- Développement mobile (Android, iOS)
- Base de données relationnelles
- UX/UI Design
- Frameworks front-end (Angular, Vue.js)

---

#### DUT Informatique
**Établissement**: IUT Paris Rives de Seine
**Période**: 2016 - 2018
**Type**: Formation initiale

**Cours principaux**:
- Programmation (Java, C, Python)
- Algorithmique et structures de données
- Base de données (SQL, PL/SQL)
- Systèmes et réseaux
- Programmation web (HTML, CSS, JavaScript, PHP)

---

## 🛠️ Compétences Techniques

### Frontend Development
```json
{
  "frameworks": [
    { "name": "Angular", "level": "Expert", "years": 6, "versions": "7-18" },
    { "name": "React", "level": "Intermédiaire", "years": 1 },
    { "name": "TypeScript", "level": "Expert", "years": 6 },
    { "name": "JavaScript", "level": "Expert", "years": 6 },
    { "name": "RxJS", "level": "Avancé", "years": 5 },
    { "name": "HTML5/CSS3", "level": "Expert", "years": 6 }
  ],
  "styling": [
    { "name": "Tailwind CSS", "level": "Avancé", "years": 1 },
    { "name": "Angular Material", "level": "Avancé", "years": 4 },
    { "name": "Bootstrap", "level": "Avancé", "years": 3 },
    { "name": "SASS/SCSS", "level": "Avancé", "years": 4 }
  ],
  "stateManagement": [
    { "name": "NgRx", "level": "Intermédiaire", "years": 2 },
    { "name": "RxJS Subjects", "level": "Avancé", "years": 5 }
  ]
}
```

### Backend Development
```json
{
  "frameworks": [
    { "name": ".NET Core / .NET 6+", "level": "Expert", "years": 4 },
    { "name": "NestJS", "level": "Avancé", "years": 1 },
    { "name": "ASP.NET Web API", "level": "Expert", "years": 4 },
    { "name": "Entity Framework Core", "level": "Avancé", "years": 4 }
  ],
  "languages": [
    { "name": "C#", "level": "Expert", "years": 5 },
    { "name": "TypeScript", "level": "Expert", "years": 6 },
    { "name": "Node.js", "level": "Avancé", "years": 2 },
    { "name": "Java", "level": "Intermédiaire", "years": 2 },
    { "name": "Python", "level": "Intermédiaire", "years": 1 }
  ],
  "patterns": [
    "Clean Architecture",
    "Repository Pattern",
    "CQRS",
    "Dependency Injection",
    "Microservices Architecture",
    "API Gateway Pattern"
  ]
}
```

### Databases
```json
{
  "relational": [
    { "name": "SQL Server", "level": "Avancé", "years": 5 },
    { "name": "PostgreSQL", "level": "Avancé", "years": 2 },
    { "name": "Oracle", "level": "Intermédiaire", "years": 2 }
  ],
  "noSQL": [
    { "name": "MongoDB", "level": "Intermédiaire", "years": 1 }
  ],
  "timeSeries": [
    { "name": "InfluxDB", "level": "Avancé", "years": 1 }
  ],
  "orm": [
    { "name": "Entity Framework Core", "level": "Avancé", "years": 4 },
    { "name": "TypeORM", "level": "Avancé", "years": 1 }
  ]
}
```

### DevOps & Cloud
```json
{
  "containerization": [
    { "name": "Docker", "level": "Avancé", "years": 3 },
    { "name": "Docker Compose", "level": "Avancé", "years": 2 }
  ],
  "cicd": [
    { "name": "Azure DevOps", "level": "Avancé", "years": 3 },
    { "name": "GitLab CI", "level": "Avancé", "years": 1 },
    { "name": "GitHub Actions", "level": "Intermédiaire", "years": 1 }
  ],
  "iac": [
    { "name": "Ansible", "level": "Intermédiaire", "years": 1 },
    { "name": "Terraform", "level": "Débutant", "years": 0.5 }
  ],
  "cloud": [
    { "name": "Azure", "level": "Intermédiaire", "years": 2 },
    { "name": "AWS", "level": "Débutant", "years": 0.5 }
  ],
  "monitoring": [
    { "name": "Prometheus", "level": "Intermédiaire", "years": 1 },
    { "name": "Grafana", "level": "Intermédiaire", "years": 1 }
  ],
  "security": [
    { "name": "HashiCorp Vault", "level": "Avancé", "years": 1 },
    { "name": "SSL/TLS", "level": "Avancé", "years": 2 },
    { "name": "OAuth2 / JWT", "level": "Avancé", "years": 3 }
  ]
}
```

### Testing & Quality
```json
{
  "testing": [
    { "name": "Jasmine/Karma", "level": "Avancé", "years": 5 },
    { "name": "Jest", "level": "Intermédiaire", "years": 1 },
    { "name": "Playwright", "level": "Débutant", "years": 0.5 },
    { "name": "xUnit / NUnit", "level": "Avancé", "years": 4 }
  ],
  "quality": [
    { "name": "SonarQube", "level": "Avancé", "years": 2 },
    { "name": "ESLint", "level": "Avancé", "years": 5 },
    { "name": "Prettier", "level": "Avancé", "years": 3 }
  ]
}
```

### Blockchain & Web3
```json
{
  "blockchains": [
    { "name": "Solana", "level": "Avancé", "years": 1 }
  ],
  "libraries": [
    { "name": "@solana/web3.js", "level": "Avancé", "years": 1 },
    { "name": "Jupiter SDK", "level": "Avancé", "years": 1 }
  ],
  "concepts": [
    "Wallets (Phantom, Solflare)",
    "Token Swaps (Jupiter)",
    "Transaction Signing",
    "Private Key Management"
  ]
}
```

### Tools & Methodologies
```json
{
  "versionControl": [
    { "name": "Git", "level": "Expert", "years": 6 },
    { "name": "GitHub", "level": "Avancé", "years": 4 },
    { "name": "GitLab", "level": "Avancé", "years": 2 },
    { "name": "Azure Repos", "level": "Avancé", "years": 3 }
  ],
  "projectManagement": [
    { "name": "Jira", "level": "Avancé", "years": 5 },
    { "name": "Confluence", "level": "Intermédiaire", "years": 3 },
    { "name": "Azure Boards", "level": "Intermédiaire", "years": 2 }
  ],
  "methodologies": [
    { "name": "Scrum", "level": "Avancé", "years": 5 },
    { "name": "Kanban", "level": "Intermédiaire", "years": 2 },
    { "name": "Git Flow", "level": "Avancé", "years": 4 },
    { "name": "TDD", "level": "Intermédiaire", "years": 2 },
    { "name": "Code Review", "level": "Avancé", "years": 4 }
  ],
  "ide": [
    { "name": "Visual Studio Code", "level": "Expert", "years": 6 },
    { "name": "Visual Studio", "level": "Avancé", "years": 4 },
    { "name": "IntelliJ IDEA", "level": "Intermédiaire", "years": 2 }
  ]
}
```

---

## 🏆 Projets Phares

### 1. IFTT Trading Platform (2024-Present)

**Catégorie**: Projet personnel / Open Source
**Rôle**: Architecte & Développeur Full-Stack
**Durée**: 3 mois (en cours)

**Description**:
Plateforme complète de trading automatisé sur Solana permettant de créer des ordres d'achat/vente conditionnels basés sur des indicateurs techniques (RSI, EMA, prix). Architecture microservices avec 5 services orchestrés par N8N.

**Défis techniques relevés**:
- **Architecture microservices**: Conception d'une architecture avec API Gateway centralisée pour isoler les services internes (OHLCV API, Swap API)
- **Time-series à haute fréquence**: Collecte et agrégation de prix Solana toutes les 5s avec InfluxDB, construction de chandeliers multi-timeframes
- **Sécurité blockchain**: Gestion sécurisée des clés privées avec HashiCorp Vault, signature de transactions Solana
- **Infrastructure DevOps**: Orchestration de 5 services Docker, monitoring Prometheus/Grafana, backups S3 automatisés
- **Intégration blockchain**: Communication avec Solana RPC, Jupiter API, gestion de wallets Phantom

**Stack technique complète**:
- **Frontend**: Angular 18.2, TypeScript, RxJS, TailwindCSS, WebSocket (Socket.io)
- **Backend**: NestJS 10.3, TypeORM, PostgreSQL 15, Express.js 5.1
- **Blockchain**: Solana, @solana/web3.js, Jupiter API, Phantom Wallet
- **Time-series**: InfluxDB 2.7, SQLite (metadata)
- **Security**: HashiCorp Vault 1.18, OAuth2, JWT, SSL/TLS (Let's Encrypt)
- **Orchestration**: N8N (workflows de trading)
- **DevOps**: Docker Compose, GitLab CI, Ansible, Terraform (en cours)
- **Monitoring**: Prometheus, Grafana, AlertManager

**Architecture**:
```
┌──────────────┐
│ Angular 18.2 │ ←─┐
│  (Frontend)  │   │
└──────────────┘   │
                   │ OAuth2
┌──────────────┐   │
│     N8N      │ ──┤
│ (Workflows)  │   │
└──────────────┘   │
                   │
                   v
      ┌──────────────────┐
      │  NestJS Backend  │
      │  (API Gateway)   │
      └────────┬─────────┘
               │
       ┌───────┴────────┐
       │                │
       v                v
┌────────────┐   ┌─────────────┐
│ OHLCV API  │   │  Swap API   │
│ (InfluxDB) │   │   (Vault)   │
└────────────┘   └─────────────┘
```

**Résultats**:
- Plateforme fonctionnelle avec ordres conditionnels actifs
- 99.9% uptime sur 2 mois
- <100ms latence moyenne pour récupération OHLCV
- Infrastructure complète documentée et reproductible

**Liens**:
- GitHub: [lien vers repo si public]
- Demo: [lien si déployé]
- Documentation: `/workspace-amsterdam/devops-iftt-trading`

---

### 2. Application de Gestion Nucléaire - EDF (2021-2024)

**Catégorie**: Application d'entreprise (Secteur nucléaire)
**Rôle**: Senior Full-Stack Developer
**Durée**: 3 ans
**Équipe**: 8 personnes

**Description**:
Application critique de gestion de projets industriels pour la division nucléaire d'EDF. Gestion de planning, budget, ressources, et reporting pour des projets d'envergure nationale.

**Défis techniques relevés**:
- **Performance**: Optimisation d'affichage de grilles avec 10,000+ lignes (virtualisation)
- **Sécurité**: Authentification multi-facteurs, gestion fine des droits (RBAC)
- **Migration**: Migration progressive de .NET Framework vers .NET Core 6
- **CI/CD**: Pipelines Azure DevOps complexes avec environnements multiples (dev, staging, prod)

**Stack technique**:
- Frontend: Angular 15, TypeScript, Angular Material, RxJS, Chart.js
- Backend: .NET Core 6, C#, Entity Framework Core, SQL Server 2019
- DevOps: Azure DevOps, Docker, Azure App Service

**Résultats**:
- Application utilisée par 500+ utilisateurs quotidiennement
- Réduction de 40% du temps de chargement après optimisations
- 0 incident critique en production sur 2 ans
- Couverture de tests >85%

---

### 3. Application de Gestion de Laboratoire - CEA (2019-2021)

**Catégorie**: Application d'entreprise (Recherche scientifique)
**Rôle**: Full-Stack Developer (Alternance)
**Durée**: 2 ans
**Contexte**: Projet de fin de Master 2

**Description**:
Application web de gestion d'équipements de laboratoire pour le Commissariat à l'Énergie Atomique. Gestion des réservations, maintenance, et inventaire.

**Défis techniques relevés**:
- **Authentification**: Intégration Active Directory pour SSO
- **Reporting**: Génération de rapports PDF complexes avec iTextSharp
- **Architecture**: Mise en place d'une Clean Architecture avec séparation claire des couches

**Stack technique**:
- Frontend: Angular 10, TypeScript, Bootstrap
- Backend: .NET Core 3.1, C#, Entity Framework Core, SQL Server 2017
- Authentification: Active Directory, OAuth2

**Résultats**:
- Application déployée et utilisée par 3 laboratoires (100+ utilisateurs)
- Réduction de 60% du temps de gestion administrative
- Documentation technique complète (150+ pages)

---

## 🎯 Compétences Transverses

### Soft Skills
- **Communication**: Présentation technique, vulgarisation, documentation
- **Travail en équipe**: Collaboration, pair programming, code review
- **Autonomie**: Capacité à prendre des initiatives et gérer des projets end-to-end
- **Mentorat**: Accompagnement de développeurs juniors
- **Résolution de problèmes**: Analyse, debugging, optimisation
- **Adaptabilité**: Montée en compétence rapide sur nouvelles technologies

### Langues
- **Français**: Langue maternelle
- **Anglais**: Professionnel (B2/C1)
  - Documentation technique en anglais
  - Participation à des conférences internationales
  - Lecture de documentation officielle

---

## 📜 Certifications & Formations

### Certifications (en cours / à obtenir)
- [ ] **Microsoft Certified: Azure Developer Associate** (Prévu Q2 2025)
- [ ] **AWS Certified Solutions Architect - Associate** (Prévu Q3 2025)
- [ ] **Certified Kubernetes Administrator (CKA)** (Backlog)

### Formations Continues
- **Udemy**: Docker & Kubernetes: The Complete Guide (2023)
- **Pluralsight**: Advanced Angular Development (2022)
- **Microsoft Learn**: .NET Microservices Architecture (2021)

---

## 🌟 Centres d'Intérêt

### Technologie
- **Open Source**: Contribution à des projets open source (Angular ecosystem)
- **Veille technologique**: Suivi des nouveautés Angular, .NET, blockchain
- **Side projects**: Développement de projets personnels pour apprendre (IFTT Trading)

### Autres
- **Jeux vidéo**: Retrogaming, design de jeux
- **Sports**: Course à pied, musculation
- **Lecture**: Science-fiction, essais technologiques

---

## 📄 Téléchargements

### CV PDF
- **Version française**: [Télécharger CV FR](link-to-pdf-fr)
- **Version anglaise**: [Télécharger CV EN](link-to-pdf-en) (à créer)

### Portfolio
- **Portfolio complet**: [Voir portfolio en ligne](https://[username].github.io/portfolio-cv)

---

## 📊 Statistiques (Pour visualisations)

### Années d'expérience par technologie
```json
{
  "Angular": 6,
  "TypeScript": 6,
  ".NET Core / C#": 5,
  "SQL Server": 5,
  "Git": 6,
  "Docker": 3,
  "Azure DevOps": 3,
  "NestJS": 1,
  "PostgreSQL": 2,
  "Solana": 1
}
```

### Répartition des compétences (pour graphique radar)
```json
{
  "Frontend Development": 95,
  "Backend Development": 90,
  "Database Design": 85,
  "DevOps & CI/CD": 80,
  "Cloud (Azure/AWS)": 70,
  "Blockchain": 75,
  "Testing & Quality": 85,
  "Architecture": 80
}
```

### Projets par secteur
```json
{
  "Énergie (EDF)": 3,
  "Recherche (CEA)": 1,
  "Blockchain / Crypto": 1,
  "Projets personnels": 5
}
```

---

**Dernière mise à jour**: 2025-11-09
**Source**: CV developpeur Mafal Gai.pdf + cv-mafal-gai-2025-03-30.pdf
**Status**: Contenu structuré prêt pour intégration dans cv-data.json
