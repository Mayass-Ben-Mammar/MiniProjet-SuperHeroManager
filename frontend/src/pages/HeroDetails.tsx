import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getHeroByName } from "../api/heroApi";

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

interface HeroDetailsProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function HeroDetails({ setIsLoggedIn }: HeroDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    if (!id) return;
    getHeroByName(id)
      .then(setHero)
      .catch(() => setHero(null));
  }, [id]);

  if (!hero) {
    return (
      <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
        <Navbar onLogout={() => setIsLoggedIn(false)} />
        <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
          <h1>Héros introuvable</h1>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            Retour au dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Navbar onLogout={() => setIsLoggedIn(false)} />

      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Retour
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "400px 1fr",
            gap: "40px",
            backgroundColor: "#1a1a1a",
            padding: "30px",
            borderRadius: "10px"
          }}
        >
          <div>
            <img
              src={`/images/${hero.image}`}
              alt={hero.nom}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <button
                onClick={() => navigate(`/edit-hero/${hero.nom}`)}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Modifier
              </button>
              <button
                onClick={async () => {
                  if (!confirm("Voulez-vous vraiment supprimer ce héros ?")) return;

                  const token = localStorage.getItem("token");
                  if (!token) {
                    alert("Tu dois être connecté pour supprimer");
                    return;
                  }

                  try {
                    const res = await fetch(
                      `http://localhost:5000/api/heroes/name/${encodeURIComponent(hero.nom)}`,
                      {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );

                    if (!res.ok) {
                      const text = await res.text();
                      alert("Erreur suppression : " + text);
                      return;
                    }

                    alert("Héros supprimé !");
                    navigate("/dashboard");
                  } catch (err: any) {
                    alert("Erreur réseau : " + err.message);
                  }
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Supprimer
              </button>
            </div>
          </div>

          <div style={{ color: "white" }}>
            <h1 style={{ marginBottom: "10px" }}>{hero.nom}</h1>
            <p style={{ color: "#888", marginBottom: "20px" }}>{hero.alias}</p>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#ffc107" }}>Univers</h3>
              <p>{hero.univers}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#ffc107" }}>Description</h3>
              <p>{hero.description || "Aucune description"}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#ffc107" }}>Origine</h3>
              <p>{hero.origine}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ color: "#ffc107" }}>Pouvoirs</h3>
              <p>{hero.pouvoirs.join(", ") || "Aucun pouvoir"}</p>
            </div>

            <div>
              <h3 style={{ color: "#ffc107" }}>Première apparition</h3>
              <p>{hero.premiereApparition || "Inconnue"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}