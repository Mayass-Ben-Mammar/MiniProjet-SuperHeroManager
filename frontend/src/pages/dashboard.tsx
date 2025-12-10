import { useEffect, useState, type ChangeEvent } from "react";
import HeroCard from "../components/HeroCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import HeroForm from "../components/HeroForm";
import { getHeroes } from "../api/heroApi";

interface Hero {
  _id?: string;
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string[];
  description: string;
  image: string;
  origine: string;
  premiereApparition: string;
}

interface DashboardPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function DashboardPage({ setIsLoggedIn }: DashboardPageProps) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [hero, setHero] = useState("");
  const [herofiltre, setHeroFiltre] = useState<Hero[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getHeroes()
      .then(setHeroes)
      .catch((err) => console.error("Erreur API heroes", err));
  }, []);

  useEffect(() => {
    setHeroFiltre(heroes);
  }, [heroes]);

  const recherche = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHero(value);
    const filtered = heroes.filter((x) =>
      x.nom.toLowerCase().includes(value.toLowerCase())
    );
    setHeroFiltre(filtered);
  };

  const handleAddHero = async (heroData: any) => {
  // On transforme les données du formulaire pour correspondre au backend
  const payload = {
    nom: heroData.nom,
    alias: heroData.alias || "",
    univers: heroData.univers,
    pouvoirs: heroData.pouvoirs
  .split(",")
  .map((p: string) => p.trim())
  .filter((p: string) => p.length > 0),
    description: heroData.description || "",
    origine: heroData.origine || "Inconnu",
    premiereApparition: heroData.premiereApparition || "",
  };

  console.log("📤 Données envoyées :", payload);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Tu dois être connecté pour ajouter un héros");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/heroes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Réponse backend :", text);
      alert("Erreur ajout : " + text);
      return;
    }

    const newHero = await res.json();
    console.log("✅ Héros reçu du backend :", newHero);

    setHeroes((prev) => [...prev, newHero]);
    setHeroFiltre((prev) => [...prev, newHero]);
    setShowForm(false);
    alert(`Héros "${newHero.nom}" ajouté avec succès !`);
  } catch (err: any) {
    console.error("❌ Erreur réseau :", err.message);
    alert("Erreur réseau : " + err.message);
  }
};

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Navbar onLogout={() => setIsLoggedIn(false)} />

      <div style={{ padding: "20px" }}>
        <h1 style={{ color: "white" }}>Liste des Super-Héros</h1>

        <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
          <SearchBar value={hero} onChange={recherche} />
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              padding: "12px 24px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {showForm ? "Annuler" : "+ Ajouter un héros"}
          </button>
        </div>

        {showForm && (
          <HeroForm
            onSubmit={handleAddHero}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {herofiltre.map((hero) => (
            <HeroCard
              key={hero._id || hero.nom}
              heroId={hero.nom}
              hero={{
                nom: hero.nom,
                univers: hero.univers,
                image: `http://localhost:5000/uploads/${hero.image}`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}