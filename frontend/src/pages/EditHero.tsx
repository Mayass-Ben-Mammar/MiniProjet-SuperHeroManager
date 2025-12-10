import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroForm from "../components/HeroForm";
import { getHeroByName } from "../api/heroApi";

interface EditHeroProps {
  setIsLoggedIn: (value: boolean) => void;
}

interface HeroFormData {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string;
  description: string;
}

export default function EditHero({ setIsLoggedIn }: EditHeroProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<HeroFormData | null>(null);

  useEffect(() => {
    if (!id) return;
    getHeroByName(id)
      .then((h) =>
        setInitialData({
          nom: h.nom,
          alias: h.alias,
          univers: h.univers,
          pouvoirs: h.pouvoirs.join(", "),
          description: h.description,
        })
      )
      .catch(() => setInitialData(null));
  }, [id]);

  if (!initialData) return <p style={{ color: "white" }}>Chargement...</p>;

  const handleSubmit = async (heroData: HeroFormData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Tu dois être connecté pour modifier");
      return;
    }

    const payload = {
      nom: heroData.nom,
      alias: heroData.alias || "",
      univers: heroData.univers,
      pouvoirs: heroData.pouvoirs
        .split(",")
        .map((p: string) => p.trim())
        .filter((p: string) => p),
      description: heroData.description || "",
      origine: "Inconnu",
      premiereApparition: "",
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/heroes/name/${encodeURIComponent(id!)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        alert("Erreur modification : " + text);
        return;
      }

      const updated = await res.json();
      alert(`Héros "${updated.nom}" modifié !`);
      navigate(`/hero/${updated.nom}`);
    } catch (err: any) {
      alert("Erreur réseau : " + err.message);
    }
  };

  const handleCancel = () => navigate(`/hero/${id}`);

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Navbar onLogout={() => setIsLoggedIn(false)} />
      <div style={{ padding: "20px" }}>
        <button
          onClick={handleCancel}
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
          ← Retour aux détails
        </button>
        <HeroForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={initialData}
        />
      </div>
    </div>
  );
}