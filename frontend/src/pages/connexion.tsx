import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        alert("Identifiants incorrects : " + text);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token); // ← STOCKAGE DU TOKEN
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err: any) {
      alert("Erreur réseau : " + err.message);
    }
  };

  return (
  <div style={{ padding: "40px", color: "white", backgroundColor: "#111", minHeight: "100vh" }}>
    <h1>Se connecter</h1>

    <label>
      Nom d'utilisateur :
      <br />
      <input
        type="text"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
      />
    </label>

    <br />

    <label>
      Mot de passe :
      <br />
      <input
        type="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />
    </label>

    <br />

    <button onClick={handleSubmit}>Connexion</button>

    <br /><br />

    <button
      onClick={async () => {
        if (!username || !password) {
          alert("Remplis tous les champs");
          return;
        }
        try {
          const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role: "editor" }),
          });
          if (!res.ok) {
            const text = await res.text();
            alert("Erreur inscription : " + text);
            return;
          }
          alert("Inscription réussie ! Tu peux te connecter.");
        } catch (err: any) {
          alert("Erreur réseau : " + err.message);
        }
      }}
      style={{ marginLeft: "10px", backgroundColor: "#28a745", color: "white" }}
    >
      S'inscrire
    </button>
  </div>
);
}