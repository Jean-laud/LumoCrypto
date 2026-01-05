function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Déconnexion
    </button>
  );
}

export default LogoutButton;