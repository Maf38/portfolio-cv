# Portfolio CV - Contenu Exhaustif Structuré

> **Extraction COMPLÈTE des 2 CVs PDF**
> - Source 1: CV developpeur Mafal Gai.pdf (2019 - Reconversion)
> - Source 2: cv-mafal-gai-2025-03-30.pdf (2025 - 6 ans expérience)
> Date extraction: 2025-11-09

---

## 👤 INFORMATIONS PERSONNELLES

### Identité Complète
```json
{
  "firstName": "Mafal",
  "lastName": "GAI",
  "fullName": "Mafal GAI",
  "birthDate": "1978-03-11",
  "age": 46,
  "nationality": "Française"
}
```

### Contact
```json
{
  "phone": "06 70 16 05 17",
  "email": "gaimafal@gmail.com",
  "address": {
    "street": "53A rue Pierre Semard",
    "city": "Grenoble",
    "postalCode": "38000",
    "country": "France"
  },
  "social": {
    "github": "https://github.com/[username]",
    "linkedin": "https://linkedin.com/in/[username]"
  },
  "driving": {
    "license": "Permis B",
    "vehicle": true
  }
}
```

### Titres Professionnels
```json
{
  "current": "Développeur .NET",
  "alternative": "Concepteur Développeur Informatique",
  "experience": "6 ans d'expérience",
  "expertise": [
    "Développeur Full-Stack",
    "Développeur .NET",
    "Développeur Backend",
    "Support TMA"
  ]
}
```

### Présentation / Pitch
```json
{
  "pitch_2019": "Ayant terminé ma reconversion professionnelle, je recherche un premier poste de développeur .NET : j'ai effectué ma formation en JAVA et mon stage de fin d'étude en C#. Mes 15 ans d'expérience dans l'industrie m'ont permis de développer une grande rigueur et un sens du travail en équipe.",

  "pitch_2025": "Développeur .NET avec 6 ans d'expérience dans le développement d'applications industrielles pour EDF et CEA. Spécialisé en .NET, SQL Server, et technologies Microsoft. Forte expertise en TMA, backend development, et systèmes industriels critiques."
}
```

---

## 💼 EXPÉRIENCE PROFESSIONNELLE COMPLÈTE

### 1. Développeur .NET - CEA (Capgemini)
**Période** : Avril 2023 - Présent (en cours)
**Durée** : ~2 ans
**Localisation** : CEA (via Capgemini)
**Type** : Mission longue durée
**Statut** : CDI Capgemini

#### Contexte
Développeur dans une TMA multi-applicative gérant 60 applications divisées en 2 pôles. Le parc applicatif est relativement homogène et tourne autour des technologies web Microsoft. Temps partagé entre le build et le run sur une vingtaine d'applications.

#### Architecture du parc applicatif
- **Persistance** : SQL Server
- **ORM** : Entity Framework (sauf anciennes applis en Web Forms)
- **Stack** : Monolithes .NET MVC avec vues Razor et composants Kendo UI
- **Frontend** : jQuery pour traitements côté client
- **Tâches** : Systèmes de tâches planifiées pour mise à jour quotidienne
- **Revue de code** : SonarQube

#### Modernisation en cours
- **Message Broker** : RabbitMQ pour communication entre APIs et remplacement tâches planifiées
- **Logging** : SeriLog couplé à suite ELK (Elasticsearch, Logstash, Kibana)
- **CI/CD** : Facilitation du delivery des correctifs/évolutions

#### Missions
- Correction des bugs
- Développement de nouvelles fonctionnalités
- Migration des librairies et des infrastructures

#### Stack technique
```json
{
  "cicd": ["Azure DevOps"],
  "database": ["SQL Server"],
  "server": ["Windows Server", "IIS"],
  "backend": [".NET 4.8", ".NET 8 (quelques APIs)"],
  "frontend": ["Razor", "Kendo UI", "Kendo MVC", "JavaScript"],
  "quality": ["SonarQube"],
  "messaging": ["RabbitMQ"],
  "logging": ["SeriLog", "ELK Stack"]
}
```

---

### 2. Développeur Backend (Java, KornShell, Informatica) - EDF
**Période** : Avril 2022 - Mars 2023
**Durée** : 1 an
**Localisation** : EDF
**Type** : Mission via Capgemini
**Contexte** : Projet GEMODO

#### Description
Mission réalisée dans le contexte global de GEMODO. Responsabilité prise en plus de celle du développement des services de contrôle et des automates de saisie.

#### Rôle Principal
**Référent technique sur la solution TRT** (moteur de contrôle - backend)

#### Architecture TRT
- **Serveur** : RedHat Linux 7
- **Base de données** : Oracle sur serveur DBaaS
- **Composants** :
  1. Scripts KornShell (Ksh)
  2. Java pour communication avec Frontend + entrées/sorties
  3. ETL Informatica pour traitements métier sur les données

#### Projet Version 3.0
- Amélioration fonctionnalités
- Amélioration performances
- **Premier déploiement automatisé** : Jenkins + Ansible

#### Résultats
- Mise en place version permettant de **multithreader** les demandes
- **Augmentation de la capacité de traitement** du SI

#### Stack technique
```json
{
  "os": ["RedHat Linux 7"],
  "database": ["Oracle DBaaS"],
  "languages": ["Java", "KornShell"],
  "etl": ["Informatica"],
  "collaboration": ["SharePoint"],
  "cicd": ["Jenkins", "Ansible"],
  "scheduler": ["Control-M"]
}
```

---

### 3. Développeur PL/SQL et VB Script - EDF
**Période** : Juin 2021 - Mars 2023
**Durée** : 1 an et 10 mois
**Localisation** : Lyon
**Type** : Mission via Capgemini
**Contexte** : Projet GEMODO

#### Description
Réalisation, correction et mise à jour de services contrôlant des **données industrielles sensibles** et automatisation de l'injection de ces données sur une partie des services.

#### Objectifs
1. Création de fichiers de paramétrage en PL/SQL pour contrôle des données
2. Création de scripts pour saisie automatisée via client web
3. Assurer la continuité de service en production
4. Maintenir et mettre à jour le moteur de contrôle

#### Réalisations
- Mise à jour des différents services selon priorités des sprints
- Tests croisés des paramétrages développés
- Contrôle et injection de données dans le cadre de migrations
- **Transition des services UFT vers RPA**

#### Références Projet
- **Référent technique** : Xavier Elie
- **Référent fonctionnel** : Fabrice Bezsonoff

#### Valeur ajoutée
- Optimisation des requêtes en PL/SQL
- Création de scripts QTP robustes

#### Stack technique
```json
{
  "application": "GEMODO",
  "frontend": ["SharePoint"],
  "database": ["Oracle Database"],
  "languages": ["PL/SQL", "VB Script"],
  "automation": ["QTP/UFT", "RPA"],
  "os": ["Linux"],
  "etl": ["Informatica"],
  "scheduler": ["Control-M"]
}
```

---

### 4. Support Niveau 3 / Testeur End-to-End / Testeur d'Infrastructure - EDF
**Période** : Juin 2020 - Juin 2021
**Durée** : 1 an et 1 mois
**Localisation** : Montbonnot
**Type** : Mission via Capgemini
**Poste** : Support TMA pour SI Industriel

#### Contexte
Déploiement de nouvelles versions d'un SI industriel. Intégration à l'équipe TMA DH pour tests de non-régression et tests de performance.

#### Application PRISM (Aveva)
- **Fonction** : Analyse prédictive de données via modèles mathématiques
- **Architecture** : 4 ou 5 serveurs selon versions
- **Sources de données** :
  - ODBC
  - API REST

#### Objectifs
1. Tester les régressions sur nouvelles versions
2. Tester les performances de la source Espadon
3. Tester performances mode NRT et architecture 5 serveurs

#### Réalisations
- Rédaction et réalisation de tests sous **HP ALM** pour caractériser régressions
- Création de tickets et échanges avec Aveva pour reproduire anomalies
- **Migration site par site** : flux ORLI (ODBC) → Espadon (API REST)
- Utilisation **EDF Virtual API** pour tests de performance
- Test architecture 5 serveurs avec nouveau mode d'acquisition

#### Stack technique
```json
{
  "os": ["Windows Server"],
  "database": ["SQL Server"],
  "dataHistorian": [
    "eDNA",
    "Aspentech"
  ],
  "api": ["Espadon (nouvelle source)"],
  "reporting": ["SQL Server Reporting Services (SSRS)"],
  "scripting": ["PowerShell", "Windows Batch"],
  "ui": ["WPF"],
  "testing": ["HP ALM", "EDF Virtual API"]
}
```

---

### 5. Développeur Logiciel - EDF / Rio Tinto
**Période** : Novembre 2019 - Mai 2020
**Durée** : 7 mois
**Localisation** : Montbonnot
**Type** : Intégration Capgemini
**Client** : EDF + Rio Tinto

#### Contexte
Intégration à Capgemini avec diverses petites missions (POC) au sein de l'équipe MES (Manufacturing Execution Systems) spécialisée dans les solutions avec bases de données Data Historian.

#### Objectifs
- Se familiariser avec différents environnements
- Découverte du MES et des différents outils

#### Réalisations
1. **Test CI/CD** : Mise en place chaîne d'intégration continue sur production line Capgemini
   - Environnement Linux avec GitLab, Selenium, Jenkins

2. **Rafraîchissement UI Rio Tinto** : Migration interface Angular 6 + Ionic 3

3. **Migration techno libre** : Migration fonctionnalité MES Rio Tinto
   - SQL Server → MariaDB
   - Backend : Node.js + Loopback framework
   - Frontend : React JS

4. **Amélioration UI** : Winforms/VB.Net → WPF/VB.Net

#### Stack technique
```json
{
  "os": ["Linux", "Windows Server"],
  "frontend": ["Angular 6", "Ionic 3", "React JS", "WPF"],
  "backend": ["Node.js", "Loopback"],
  "database": ["SQL Server", "MariaDB"],
  "languages": ["VB.Net"],
  "cicd": ["GitLab", "Jenkins"],
  "testing": ["Selenium"]
}
```

---

### 6. Stagiaire Développeur - Cerberis
**Période** : Avril 2019 - Septembre 2019
**Durée** : 6 mois
**Localisation** : Grenoble
**Type** : Stage de fin d'étude AFPA

#### Contexte
Conception et réalisation d'une **application SaaS de type daemon service** pour gérer une structure de salles imbriquée sur serveurs Exchange.

#### Architecture
**Architecture 5 tiers** :
1. Client Web (Bootstrap)
2. API REST
3. Daemon Service
4. Cloud Microsoft (Azure AD, Cosmos DB)
5. Exchange Servers

#### Technologies Cloud Microsoft
- **Azure AD** : Authentification et gestion des identités
- **Azure Cosmos DB** : Base de données NoSQL distribuée
- **Microsoft Graph API** : Accès aux ressources Office 365

#### Sécurité
- **OAuth 2.0** : Protocole d'autorisation

#### Interface
- **IHM Admin** : Réalisée avec Bootstrap

#### Stack technique
```json
{
  "cloud": ["Azure"],
  "services": [
    "Azure AD (Active Directory)",
    "Azure Cosmos DB",
    "Microsoft Graph API",
    "Exchange Server"
  ],
  "backend": [".NET"],
  "frontend": ["Bootstrap"],
  "security": ["OAuth 2.0"],
  "api": ["Microsoft Graph API"]
}
```

---

### 7. Technicien de Maintenance - ST Microelectronics
**Période** : 2005 - 2018
**Durée** : 13 ans
**Localisation** : Crolles
**Type** : CDI
**Secteur** : Industrie - Fabrication semi-conducteurs

#### Description
Technicien de maintenance dans l'industrie des semi-conducteurs.

**Apport** : 15 ans d'expérience industrielle ayant développé :
- Grande rigueur
- Sens du travail en équipe
- Compétences techniques solides

---

### 8. Canalog
**Période** : 2005
**Durée** : Court (détails non précisés)
**Localisation** : Eybens

---

### 9. Service Militaire
**Période** : 2001
**Localisation** : La Valbonne

---

## 🎓 FORMATION COMPLÈTE

### 1. Titre Professionnel Concepteur Développeur Informatique (Niveau Bac+3/4)
**École** : AFPA Pont de Claix
**Période** : Septembre 2018 - Juin 2019
**Durée** : 9 mois
**Diplôme** : Titre professionnel de niveau 6 (anciennement II)

**Contexte** : Reconversion professionnelle après 15 ans d'expérience industrielle

**Programme** :
- Programmation Java JEE
- Développement .NET / C#
- Base de données SQL
- UML / Merise
- Développement mobile (Android, iOS)
- Méthodologies Agile

---

### 2. DUT GEII - Génie Électrique et Informatique Industrielle
**École** : Université Joseph Fourier (UJF) - Grenoble
**Période** : Septembre 2002 - Juin 2003
**Diplôme** : DUT GEII

**Spécialisation** : Génie électrique et informatique industrielle

---

### 3. IUP MAI - Mathématiques Appliquées et Industrielles
**École** : Université Joseph Fourier (UJF) - Grenoble
**Période** : Septembre 1998 - Juin 1999
**Niveau** : Bac+3 (Licence)

**Spécialisation** : Mathématiques appliquées et industrielles

---

### 4. DEUG SMb - Biochimie
**École** : Université Joseph Fourier (UJF) - Grenoble
**Période** : Septembre 1997 - Juin 1998
**Diplôme** : DEUG SMb (Sciences et Techniques, Biochimie)

---

### 5. Math Sup PC-SI - Physique Chimie Science de l'Ingénieur
**École** : Lycée Berthollet - Annecy
**Période** : Septembre 1996 - Juin 1997
**Niveau** : Classe préparatoire aux grandes écoles

**Filière** : PC-SI (Physique-Chimie, Sciences de l'Ingénieur)

---

### 6. Baccalauréat Scientifique
**École** : Lycée Sainte Marie, La Roche-sur-Foron
**Année** : 1996
**Mention** : Bien
**Série** : Bac S (Scientifique)

---

## 🛠️ COMPÉTENCES TECHNIQUES EXHAUSTIVES

### Langages de Programmation

```json
{
  "backend": [
    {
      "name": "C#",
      "level": "Expert",
      "years": 6,
      "rating": 4,
      "context": ".NET Framework, .NET Core, .NET 8"
    },
    {
      "name": "Java",
      "level": "Intermédiaire",
      "years": 4,
      "rating": 2,
      "context": "Java JEE, Spring"
    },
    {
      "name": "PL/SQL",
      "level": "Avancé",
      "years": 2,
      "rating": 4,
      "context": "Oracle, optimisation requêtes"
    },
    {
      "name": "VB Script",
      "level": "Intermédiaire",
      "years": 2,
      "rating": 3,
      "context": "Automation, QTP"
    },
    {
      "name": "Bash / KornShell",
      "level": "Intermédiaire",
      "years": 2,
      "rating": 2,
      "context": "Linux, automation"
    },
    {
      "name": "C",
      "level": "Débutant",
      "years": 1,
      "rating": 1,
      "context": "Formation AFPA"
    },
    {
      "name": "Pascal",
      "level": "Débutant",
      "years": 1,
      "rating": 1,
      "context": "Formation ancienne"
    }
  ],
  "frontend": [
    {
      "name": "JavaScript",
      "level": "Avancé",
      "years": 5,
      "rating": 3,
      "context": "Vanilla JS, jQuery"
    },
    {
      "name": "TypeScript",
      "level": "Intermédiaire",
      "years": 3,
      "rating": 3,
      "context": "Angular"
    }
  ],
  "database": [
    {
      "name": "SQL",
      "level": "Expert",
      "years": 6,
      "rating": 4,
      "context": "T-SQL, PL/SQL"
    },
    {
      "name": "Transact-SQL",
      "level": "Expert",
      "years": 6,
      "rating": 4,
      "context": "SQL Server"
    }
  ]
}
```

### Frameworks & Technologies

```json
{
  "dotnet": [
    {
      "name": ".NET MVC",
      "version": "5.2",
      "level": "Expert",
      "years": 6
    },
    {
      "name": ".NET Framework",
      "version": "4.8",
      "level": "Expert",
      "years": 6
    },
    {
      "name": ".NET Core / .NET 8",
      "level": "Avancé",
      "years": 2
    },
    {
      "name": "Entity Framework",
      "level": "Expert",
      "years": 6,
      "context": "Code First, Database First"
    },
    {
      "name": "LINQ",
      "level": "Expert",
      "years": 6
    },
    {
      "name": "Razor",
      "level": "Expert",
      "years": 6,
      "context": "Vues MVC"
    },
    {
      "name": "ASP.NET Web Forms",
      "level": "Intermédiaire",
      "years": 3,
      "context": "Legacy apps"
    },
    {
      "name": "SignalR",
      "level": "Intermédiaire",
      "years": 2,
      "context": "Real-time web"
    }
  ],
  "javaJEE": [
    {
      "name": "JSP",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "EJB",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "JDBC",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "JNDI",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "Langage EL",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "JPQL",
      "level": "Intermédiaire",
      "years": 2
    }
  ],
  "appServers": [
    {
      "name": "Glassfish Server",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "IIS",
      "level": "Avancé",
      "years": 6,
      "context": "Windows Server"
    }
  ]
}
```

### Frontend & UI

```json
{
  "frameworks": [
    {
      "name": "Angular",
      "versions": ["6", "7", "8", "10"],
      "level": "Avancé",
      "years": 4,
      "rating": 3
    },
    {
      "name": "React JS",
      "level": "Débutant",
      "years": 1,
      "rating": 1,
      "context": "POC Rio Tinto"
    },
    {
      "name": "Ionic",
      "version": 3,
      "level": "Débutant",
      "years": 1,
      "rating": 2,
      "context": "Mobile hybrid"
    }
  ],
  "libraries": [
    {
      "name": "jQuery",
      "level": "Avancé",
      "years": 6,
      "rating": 3
    },
    {
      "name": "Bootstrap",
      "level": "Avancé",
      "years": 5,
      "context": "Responsive design"
    },
    {
      "name": "Kendo UI",
      "level": "Avancé",
      "years": 3,
      "context": "Kendo MVC, grids, charts"
    }
  ],
  "ui": [
    {
      "name": "WPF",
      "level": "Intermédiaire",
      "years": 2,
      "context": "Windows desktop apps"
    },
    {
      "name": "Winforms",
      "level": "Intermédiaire",
      "years": 2,
      "context": "Legacy desktop apps"
    }
  ],
  "web": [
    "HTML5",
    "CSS3",
    "Ajax",
    "JavaScript"
  ]
}
```

### Bases de Données

```json
{
  "relational": [
    {
      "name": "SQL Server",
      "level": "Expert",
      "years": 6,
      "rating": 4,
      "versions": ["2017", "2019"]
    },
    {
      "name": "Oracle Database",
      "level": "Avancé",
      "years": 3,
      "rating": 3,
      "context": "PL/SQL, DBaaS"
    }
  ],
  "noSQL": [
    {
      "name": "Azure Cosmos DB",
      "level": "Intermédiaire",
      "years": 1,
      "context": "NoSQL cloud"
    }
  ],
  "orm": [
    {
      "name": "Entity Framework",
      "level": "Expert",
      "years": 6,
      "context": "Code First, Database First"
    }
  ],
  "reporting": [
    {
      "name": "SQL Server Reporting Services (SSRS)",
      "level": "Intermédiaire",
      "years": 2
    }
  ]
}
```

### Cloud & DevOps

```json
{
  "cloud": [
    {
      "name": "Microsoft Azure",
      "services": [
        "Azure AD (Active Directory)",
        "Azure Cosmos DB",
        "Microsoft Graph API",
        "Azure DevOps"
      ],
      "level": "Avancé",
      "years": 4
    }
  ],
  "cicd": [
    {
      "name": "Azure DevOps",
      "level": "Avancé",
      "years": 4,
      "rating": 3,
      "context": "Pipelines, Repos, Boards"
    },
    {
      "name": "Jenkins",
      "level": "Intermédiaire",
      "years": 2,
      "rating": 2,
      "context": "CI/CD, Ansible"
    },
    {
      "name": "GitLab CI",
      "level": "Débutant",
      "years": 1,
      "context": "POC"
    }
  ],
  "iac": [
    {
      "name": "Ansible",
      "level": "Débutant",
      "years": 1,
      "context": "Automated deployment"
    }
  ],
  "versionControl": [
    {
      "name": "Git",
      "level": "Avancé",
      "years": 6,
      "tools": ["GitLab", "Azure Repos", "GitHub"]
    }
  ],
  "messaging": [
    {
      "name": "RabbitMQ",
      "level": "Intermédiaire",
      "years": 1,
      "context": "Message broker, async communication"
    }
  ],
  "logging": [
    {
      "name": "SeriLog",
      "level": "Intermédiaire",
      "years": 1,
      "context": "Structured logging"
    },
    {
      "name": "ELK Stack",
      "components": ["Elasticsearch", "Logstash", "Kibana"],
      "level": "Débutant",
      "years": 1
    }
  ]
}
```

### Systèmes d'Exploitation

```json
{
  "windows": [
    {
      "name": "Windows",
      "level": "Expert",
      "years": 20,
      "rating": 4
    },
    {
      "name": "Windows Server",
      "level": "Avancé",
      "years": 6,
      "context": "IIS, deployment"
    }
  ],
  "linux": [
    {
      "name": "Linux",
      "level": "Intermédiaire",
      "years": 3,
      "rating": 3,
      "distros": ["RedHat 7", "Ubuntu"]
    },
    {
      "name": "RedHat Linux",
      "version": 7,
      "level": "Intermédiaire",
      "years": 2,
      "context": "Production servers"
    }
  ]
}
```

### Outils de Développement

```json
{
  "ide": [
    {
      "name": "Visual Studio",
      "level": "Expert",
      "years": 6,
      "context": ".NET development"
    },
    {
      "name": "Visual Studio Code",
      "level": "Avancé",
      "years": 4,
      "context": "Multi-language"
    },
    {
      "name": "Eclipse",
      "level": "Intermédiaire",
      "years": 2,
      "context": "Java development"
    }
  ],
  "api": [
    {
      "name": "Postman",
      "level": "Avancé",
      "years": 5,
      "context": "API testing"
    }
  ],
  "projectManagement": [
    {
      "name": "JIRA",
      "level": "Avancé",
      "years": 6,
      "context": "Agile, Scrum"
    },
    {
      "name": "SharePoint",
      "level": "Intermédiaire",
      "years": 3,
      "context": "Collaboration"
    }
  ],
  "quality": [
    {
      "name": "SonarQube",
      "level": "Avancé",
      "years": 3,
      "context": "Code review, quality gates"
    }
  ]
}
```

### Testing & Automation

```json
{
  "testing": [
    {
      "name": "Selenium",
      "level": "Intermédiaire",
      "years": 2,
      "rating": 4,
      "context": "UI automation"
    },
    {
      "name": "HP ALM",
      "level": "Avancé",
      "years": 2,
      "context": "Test management, regression testing"
    }
  ],
  "automation": [
    {
      "name": "QTP / UFT",
      "level": "Avancé",
      "years": 2,
      "context": "Test automation, VB Script"
    },
    {
      "name": "RPA",
      "level": "Débutant",
      "years": 1,
      "context": "Robotic Process Automation"
    }
  ],
  "performance": [
    {
      "name": "Test De Performance",
      "level": "Avancé",
      "years": 2,
      "rating": 5,
      "context": "Load testing, stress testing"
    },
    {
      "name": "EDF Virtual API",
      "level": "Intermédiaire",
      "years": 1,
      "context": "Performance testing tool"
    }
  ]
}
```

### ETL & Data

```json
{
  "etl": [
    {
      "name": "Informatica",
      "level": "Intermédiaire",
      "years": 2,
      "rating": 3,
      "context": "ETL pour traitements métier"
    }
  ],
  "dataHistorian": [
    {
      "name": "eDNA",
      "level": "Intermédiaire",
      "years": 1,
      "context": "Time-series industrial data"
    },
    {
      "name": "Aspentech",
      "level": "Intermédiaire",
      "years": 1,
      "context": "Process historian"
    }
  ],
  "scheduler": [
    {
      "name": "Control-M",
      "level": "Débutant",
      "years": 2,
      "context": "Job scheduling"
    }
  ]
}
```

### Mobile Development

```json
{
  "platforms": [
    {
      "name": "Android",
      "level": "Débutant",
      "years": 1,
      "rating": 2,
      "context": "Native avec Android Studio"
    },
    {
      "name": "iOS",
      "level": "Débutant",
      "years": 1,
      "context": "Formation AFPA"
    },
    {
      "name": "Ionic",
      "version": 3,
      "level": "Débutant",
      "years": 1,
      "rating": 2,
      "context": "Hybrid apps"
    }
  ]
}
```

### Architecture & Méthodologies

```json
{
  "architecture": [
    {
      "name": "Architecture 5 tiers",
      "context": "SaaS Cerberis, PRISM"
    },
    {
      "name": "Monolithe .NET MVC",
      "context": "Applications CEA"
    },
    {
      "name": "API RESTful",
      "level": "Avancé",
      "years": 5
    },
    {
      "name": "SOAP",
      "level": "Intermédiaire",
      "years": 3
    }
  ],
  "methodologies": [
    {
      "name": "Agile / Scrum",
      "level": "Avancé",
      "years": 6,
      "context": "Sprints, daily, retrospectives"
    },
    {
      "name": "UML",
      "level": "Intermédiaire",
      "years": 4,
      "context": "Conception"
    },
    {
      "name": "Merise",
      "level": "Intermédiaire",
      "years": 3,
      "context": "Modélisation BDD"
    }
  ]
}
```

### Sécurité

```json
{
  "authentication": [
    {
      "name": "OAuth 2.0",
      "level": "Avancé",
      "years": 3,
      "context": "Azure AD, API security"
    },
    {
      "name": "OpenID Connect",
      "level": "Intermédiaire",
      "years": 2
    },
    {
      "name": "Active Directory",
      "level": "Avancé",
      "years": 4,
      "context": "Enterprise authentication"
    }
  ],
  "linux": [
    {
      "name": "Sécurité de Linux",
      "level": "Intermédiaire",
      "years": 3,
      "rating": 3
    }
  ]
}
```

---

## 💪 SOFT SKILLS & PROFIL

### Soft Skills (Auto-évaluation CV 2019)
```json
{
  "softSkills": [
    {
      "name": "Capacité rédactionnelle",
      "level": 4,
      "maxLevel": 5
    },
    {
      "name": "Sens de l'écoute",
      "level": 4,
      "maxLevel": 5
    },
    {
      "name": "Sérieux",
      "level": 5,
      "maxLevel": 5
    },
    {
      "name": "Créatif",
      "level": 4,
      "maxLevel": 5
    },
    {
      "name": "Anglais",
      "level": 3,
      "maxLevel": 5
    }
  ]
}
```

### Profil Professionnel
```json
{
  "strengths": [
    "Grande rigueur (15 ans industrie)",
    "Sens du travail en équipe",
    "Capacité d'adaptation (reconversion réussie)",
    "Expertise technique .NET/SQL Server",
    "Expérience applications industrielles critiques",
    "TMA et support production",
    "Optimisation requêtes SQL/PL-SQL",
    "Tests et qualité logicielle"
  ],
  "experience": {
    "industrie": "15 ans (2005-2018) - ST Microelectronics",
    "developpement": "6 ans (2019-2025) - Capgemini/EDF/CEA",
    "total": "21 ans d'expérience professionnelle"
  }
}
```

### Langues
```json
{
  "languages": [
    {
      "name": "Français",
      "level": "Langue maternelle",
      "code": "fr-FR"
    },
    {
      "name": "Anglais",
      "level": "Intermédiaire/Avancé",
      "selfAssessment": "3/5",
      "code": "en-US"
    }
  ]
}
```

---

## 🎮 CENTRES D'INTÉRÊT / HOBBIES

```json
{
  "sports": [
    {
      "name": "Ski",
      "type": "Sport d'hiver"
    },
    {
      "name": "VTT",
      "subtypes": ["Descente", "Enduro"],
      "type": "Sport outdoor"
    },
    {
      "name": "Randonnée",
      "type": "Sport outdoor"
    }
  ],
  "gaming": [
    {
      "name": "Jeux Vidéo",
      "genre": "FPS (First Person Shooter)",
      "type": "Loisir numérique"
    }
  ]
}
```

---

## 📊 RÉSUMÉ STATISTIQUE

### Timeline Professionnelle Complète
```json
{
  "timeline": [
    {
      "period": "1996-2003",
      "type": "Formation",
      "detail": "Bac → Math Sup → DEUG → IUP → DUT GEII"
    },
    {
      "period": "2001",
      "type": "Service Militaire",
      "detail": "La Valbonne"
    },
    {
      "period": "2005",
      "type": "Emploi court",
      "company": "Canalog",
      "location": "Eybens"
    },
    {
      "period": "2005-2018",
      "type": "Industrie",
      "duration": "13 ans",
      "company": "ST Microelectronics",
      "role": "Technicien de maintenance",
      "location": "Crolles"
    },
    {
      "period": "2018-2019",
      "type": "Reconversion",
      "detail": "Formation AFPA Concepteur Développeur Informatique"
    },
    {
      "period": "2019",
      "type": "Stage",
      "duration": "6 mois",
      "company": "Cerberis",
      "role": "Stagiaire développeur",
      "location": "Grenoble"
    },
    {
      "period": "2019-2020",
      "type": "Premier emploi IT",
      "duration": "7 mois",
      "company": "Capgemini pour EDF/Rio Tinto",
      "role": "Développeur logiciel",
      "location": "Montbonnot"
    },
    {
      "period": "2020-2021",
      "type": "Mission TMA",
      "duration": "1 an 1 mois",
      "company": "Capgemini pour EDF",
      "role": "Support N3 / Testeur",
      "location": "Montbonnot"
    },
    {
      "period": "2021-2023",
      "type": "Développeur Backend",
      "duration": "1 an 10 mois",
      "company": "Capgemini pour EDF",
      "role": "Développeur PL/SQL et VB Script",
      "location": "Lyon",
      "project": "GEMODO"
    },
    {
      "period": "2022-2023",
      "type": "Référent Technique",
      "duration": "1 an",
      "company": "Capgemini pour EDF",
      "role": "Développeur Backend (Java KornShell Informatica)",
      "project": "GEMODO - Moteur TRT"
    },
    {
      "period": "2023-Present",
      "type": "Développeur .NET Senior",
      "duration": "~2 ans",
      "company": "Capgemini pour CEA",
      "role": "Développeur .NET TMA",
      "applications": "60 applications"
    }
  ]
}
```

### Répartition des Technologies (Années d'expérience)
```json
{
  "topSkills": [
    { "tech": ".NET / C#", "years": 6 },
    { "tech": "SQL Server", "years": 6 },
    { "tech": "Azure DevOps", "years": 6 },
    { "tech": "Entity Framework", "years": 6 },
    { "tech": "JavaScript / jQuery", "years": 6 },
    { "tech": "JIRA / Agile", "years": 6 },
    { "tech": "Visual Studio", "years": 6 },
    { "tech": "Git", "years": 6 },
    { "tech": "Angular", "years": 4 },
    { "tech": "Oracle / PL-SQL", "years": 3 },
    { "tech": "Linux", "years": 3 },
    { "tech": "Kendo UI", "years": 3 },
    { "tech": "SonarQube", "years": 3 },
    { "tech": "Java", "years": 2 },
    { "tech": "Informatica", "years": 2 }
  ]
}
```

### Secteurs d'Activité
```json
{
  "sectors": [
    {
      "name": "Énergie Nucléaire",
      "companies": ["EDF", "CEA"],
      "years": 5,
      "applications": "Systèmes industriels critiques"
    },
    {
      "name": "Industrie Minière",
      "companies": ["Rio Tinto"],
      "years": 1,
      "applications": "Manufacturing Execution Systems"
    },
    {
      "name": "Semi-conducteurs",
      "companies": ["ST Microelectronics"],
      "years": 13,
      "role": "Technicien maintenance"
    },
    {
      "name": "SaaS / Cloud",
      "companies": ["Cerberis"],
      "years": 0.5,
      "applications": "Application SaaS Azure"
    }
  ]
}
```

---

## 🎯 POINTS FORTS À METTRE EN AVANT

### Parcours Atypique & Unique
```markdown
1. **Reconversion réussie** : 15 ans industrie → Développeur expert en 6 ans
2. **Double compétence** : Technique industrielle + Développement logiciel
3. **Rigueur industrielle** : Appliquée au développement logiciel
4. **Progression rapide** : Stage → Développeur → Référent technique en 4 ans
5. **Polyvalence** : Backend, Frontend, TMA, Tests, Infrastructure
```

### Expertise Technique Solide
```markdown
1. **Stack Microsoft complète** : .NET, SQL Server, Azure, IIS
2. **Applications industrielles critiques** : EDF nucléaire, CEA recherche
3. **Grande expérience TMA** : 60 applications, support production
4. **Optimisation** : Requêtes SQL, performances, multithreading
5. **DevOps** : CI/CD, Jenkins, Ansible, Azure DevOps
```

### Soft Skills Exceptionnels
```markdown
1. **Rigueur** : 15 ans industrie (maintenance équipements critiques)
2. **Travail en équipe** : Scrum, sprints, collaboration
3. **Capacité d'apprentissage** : Reconversion réussie, technologies multiples
4. **Autonomie** : Référent technique, prise de décisions
5. **Communication** : Rédaction, documentation, échanges avec éditeurs (Aveva)
```

---

## 📄 FORMAT POUR cv-data.json

Voir fichier séparé : `src/assets/data/cv-data.json` (à créer)

---

**Dernière mise à jour** : 2025-11-09
**Source** : Extraction EXHAUSTIVE des 2 CVs PDF
**Status** : Prêt pour intégration complète dans portfolio

**Note importante** : Adapter le nom "Gabriel" → "Mafal GAI" dans tous les documents !
