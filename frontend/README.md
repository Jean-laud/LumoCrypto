LumoCrypto — Frontend

Le frontend de LumoCrypto est une application React moderne permettant à l’utilisateur de gérer son portefeuille crypto via une interface simple, fluide et sécurisée.


Stack technique

- React  
- React Router  
- JavaScript  
- CSS  
- Fetch API  
- LocalStorage (token JWT)  


Fonctionnalités

Authentification
- Inscription  
- Connexion  
- Stockage du token  
- Redirection automatique  
- Protection des routes  

Portefeuille crypto
- Affichage des actifs  
- Prix en temps réel  
- Valeur totale  
- Ajout / retrait / suppression  
- Mise à jour automatique  

UI / UX 
- Pages cohérentes  
- Burger menu  
- Responsive  

---

Architecture

```
frontend/
│
├── src/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Portfolio.js
│   ├── components/
│   │   ├── AddAssetForm.js
│   │   ├── LogoutButton.js
│   │   └── ProtectedRoute.js
│   ├── services/
│   │   ├── api.js
│   │   
│   ├── styles/
│   │   ├── login.css
│   │   ├── register.css
│   │   └── portfolio.css
│   ├── App.jsx
│   └── index.js
│
└── package.json
```


Installation

```bash
cd frontend
npm install
npm start
```

http://localhost:3000


Communication avec le backend

Toutes les requêtes passent par `services/api.js`.

Exemple :

```js
fetch("http://localhost:4000/portfolio/assets", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token")
  }
});
```

Sécurité côté client

- Token JWT dans localStorage  
- Vérification avant accès au Portfolio  
- Redirection si non connecté  
- Aucune donnée sensible stockée  

Tests

- Navigation  
- Connexion / déconnexion  
- Ajout / suppression d’actifs  
- Gestion des erreurs  


Évolutions possibles

- Mode sombre  
- Graphiques  
- Export CSV  
- Page profil  
- Animations  