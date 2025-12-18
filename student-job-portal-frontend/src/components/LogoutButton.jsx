export default function LogoutButton() {
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = "/";
    };
  
    return (
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>
    );
  }
  