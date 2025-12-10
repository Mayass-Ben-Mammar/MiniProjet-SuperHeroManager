import { useState, type ChangeEvent, type FormEvent } from "react";

interface HeroFormData {
  nom: string;
  alias: string;
  univers: string;
  pouvoirs: string;
  description: string;
}

interface HeroFormProps {
  onSubmit: (heroData: HeroFormData) => void;
  onCancel: () => void;
  initialData?: HeroFormData;
}

export default function HeroForm({ onSubmit, onCancel, initialData }: HeroFormProps) {
  const [formData, setFormData] = useState<HeroFormData>(
    initialData || {
      nom: "",
      alias: "",
      univers: "Marvel",
      pouvoirs: "",
      description: ""
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "#1a1a1a",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "600px",
      margin: "20px auto"
    }}>
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        {initialData ? "Modifier un héros" : "Ajouter un héros"}
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ color: "white", display: "block", marginBottom: "5px" }}>
          Nom *
        </label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white"
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ color: "white", display: "block", marginBottom: "5px" }}>
          Alias
        </label>
        <input
          type="text"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white"
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ color: "white", display: "block", marginBottom: "5px" }}>
          Univers *
        </label>
        <select
          name="univers"
          value={formData.univers}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white"
          }}
        >
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ color: "white", display: "block", marginBottom: "5px" }}>
          Pouvoirs
        </label>
        <input
          type="text"
          name="pouvoirs"
          value={formData.pouvoirs}
          onChange={handleChange}
          placeholder="Ex: Force surhumaine, Vol, Télékinésie"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ color: "white", display: "block", marginBottom: "5px" }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "5px",
            color: "white",
            resize: "vertical"
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {initialData ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "12px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}