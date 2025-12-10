import { type ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Rechercher un héros..." }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        maxWidth: "500px",
        padding: "12px 20px",
        fontSize: "16px",
        border: "2px solid #333",
        borderRadius: "8px",
        backgroundColor: "#1a1a1a",
        color: "white",
        outline: "none"
      }}
    />
  );
}