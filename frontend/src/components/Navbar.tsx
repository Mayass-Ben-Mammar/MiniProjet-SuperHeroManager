interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav style={{
      backgroundColor: "#1a1a1a",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #333"
    }}>
      <h2 style={{ color: "white", margin: 0 }}>SuperHero Manager</h2>
      <button 
        onClick={onLogout}
        style={{
          padding: "8px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Se déconnecter
      </button>
    </nav>
  );
}