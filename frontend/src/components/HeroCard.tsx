import { useNavigate } from "react-router-dom";

interface HeroCardProps {
  hero: {
    nom: string;
    univers: string;
    image: string;
  };
  heroId: string; // ← On utilise un ID unique (le nom du héros)
}

export default function HeroCard({ hero, heroId }: HeroCardProps) {
  console.log(" Clic sur héros :", hero.nom);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
  console.log("Navigation vers :", `/hero/${heroId}`);
  navigate(`/hero/${encodeURIComponent(heroId)}`);
}}
    >
      <img
        src={hero.image}
        alt={hero.nom}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "5px"
        }}
      />
      <h3 style={{ color: "white", marginTop: "10px" }}>{hero.nom}</h3>
      <p style={{ color: "#888", fontSize: "14px" }}>{hero.univers}</p>
    </div>
  );
}