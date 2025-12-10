import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroForm from "../components/HeroForm";

interface AddHeroProps {
  setIsLoggedIn: (value: boolean) => void;
}

interface HeroFormData {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string;
  description: string;
}

export default function AddHero({ setIsLoggedIn }: AddHeroProps) {
  const navigate = useNavigate();

  const handleSubmit = (heroData: HeroFormData) => {
    console.log("Nouveau héros à ajouter :", heroData);
    
    // ICI : Plus tard, tu feras un appel API
    // axios.post("http://localhost:5000/api/heroes", heroData)
    
    alert(`Héros "${heroData.nom}" ajouté avec succès !`);
    navigate("/dashboard");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Navbar onLogout={() => setIsLoggedIn(false)} />
      
      <div style={{ padding: "20px" }}>
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
          ← Retour au dashboard
        </button>

        <HeroForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}