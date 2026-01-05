LumoCrypto

LumoCrypto est une application web permettant à un utilisateur de gérer un portefeuille de cryptomonnaies de manière sécurisée.  
Elle offre une authentification, un espace personnel protégé et le suivi en temps réel de la valeur des actifs via une API externe.

Ce projet a été réalisé dans le cadre du **Bloc 3 – Réalisation technique d’une solution digitale (RNCP)**.


Objectifs du projet

- Concevoir une application full‑stack cohérente  
- Mettre en place une authentification sécurisée  
- Gérer des données utilisateur persistées en base de données  
- Consommer une API externe pour afficher des données dynamiques  
- Proposer une interface simple, lisible et professionnelle  


Stack technique

Front‑end
- React  
- JavaScript  
- CSS (sans framework)

Back‑end
- Node.js  
- Express  
- JWT  
- bcrypt  

Base de données
- PostgreSQL  

API externe
- CoinGecko  

Outils
- Git / GitHub  
- npm  
- Postman  


Fonctionnalités

Authentification
- Inscription  
- Connexion  
- Token JWT  
- Protection des routes  

Portefeuille crypto
- Ajout d’un actif  
- Ajout / retrait de quantité  
- Suppression d’un actif  
- Prix en temps réel  
- Valeur totale du portefeuille  


Architecture du projet

```
LumoCrypto/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── db.js
│   ├── .env (non versionné)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
│
└── README.md
```


Installation

Cloner le projet

```bash
git clone <url-du-repo>
cd LumoCrypto
```

Installation du back‑end

```bash
cd backend
npm install
```

Créer un fichier `.env` :

```
JWT_SECRET=super_secret_lumocrypto_2025

DB_USER=postgres
DB_PASSWORD=mot_de_passe
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lumocrypto15
```

Lancer le serveur :

```bash
npm run dev
```

http://localhost:4000


Installation du front‑end

```bash
cd frontend
npm install
npm start
```

http://localhost:3000



Sécurité

- Hashage des mots de passe  
- JWT  
- Middleware de protection  
- Séparation stricte des portefeuilles  
- Requêtes SQL paramétrées  


Tests

- Tests Postman (auth + portfolio + sécurité)  
- Tests fonctionnels via le navigateur  


Évolutions possibles

- Mode sombre  
- Graphiques d’évolution  
- Export CSV  
- Alertes de prix  


Projet réalisé par Jean‑laud  