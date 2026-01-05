LumoCrypto — Backend

Le backend de LumoCrypto est une API REST sécurisée permettant la gestion d’un portefeuille de cryptomonnaies.  
Il gère l’authentification, la persistance des données et la récupération des prix en temps réel via CoinGecko.


Stack technique

- Node.js  
- Express  
- PostgreSQL  
- JWT  
- bcrypt  
- API CoinGecko  


Architecture

```
backend/
│
├── src/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── portfolio.js
│   │   └── user.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── services/
│   │   └── coingecko.js
│   ├── utils/
│   │   └── symbolMap.js
│   └── server.js
│
├── db.js
├── .env
└── package.json
```


Installation

bash
cd backend
npm install


Créer un fichier `.env` :


JWT_SECRET=super_secret_lumocrypto_2025

DB_USER=postgres
DB_PASSWORD=mot_de_passe
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lumocrypto15


Lancer le serveur :

bash
npm run dev


Authentification

Toutes les routes protégées nécessitent :


Authorization: Bearer <token>


Le token est généré lors du login.


Endpoints principaux

Auth
- POST `/auth/register`
- POST `/auth/login`

User
- GET `/user/me`

Portfolio
- GET `/portfolio/assets`
- POST `/portfolio/add-asset`
- POST `/portfolio/assets/add`
- POST `/portfolio/assets/remove`
- DELETE `/portfolio/assets/:id`


Sécurité

- Hashage bcrypt  
- JWT avec expiration  
- Middleware robuste  
- Requêtes SQL paramétrées  
- Isolation stricte des données utilisateur  
