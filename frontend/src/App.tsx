import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/connexion";
import DashboardPage from "./pages/dashboard";
import HeroDetails from "./pages/HeroDetails";
import AddHero from "./pages/AddHero";
import EditHero from "./pages/EditHero";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <DashboardPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Nouvelle route : Détails d'un héros */}
        <Route
          path="/hero/:id"
          element={
            isLoggedIn ? (
              <HeroDetails setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Nouvelle route : Ajouter un héros */}
        <Route
          path="/add-hero"
          element={
            isLoggedIn ? (
              <AddHero setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Nouvelle route : Modifier un héros */}
        <Route
          path="/edit-hero/:id"
          element={
            isLoggedIn ? (
              <EditHero setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}