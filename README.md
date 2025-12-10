# MiniProjet-SuperHeroManager
Ce Mini Projet a pour but de nous apprendre à faire un site Full Stack l'aide des acquis durant le semestre <br>

# Structure du projet

```
superheromanager/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── backend/
└── README.md
```

# Le necessaires

Backend : Node.js <br>
Frontend : React + TypeScript + Vite <br>

# Comment faire ?

```
git clone https://github.com/[pseudo]/MiniProjet-SuperHeroManager.git
cd MiniProjet-SuperHeroManager
```

# Lancement backend

```
cd backend
npm install
npm run dev
```

# Lancement backend

```
cd frontend
npm install
npm run dev
```

Le serveur démarre sur le port défini dans `.env` :

```
PORT=4000

curl -X GET http://localhost:4000/users 
```
