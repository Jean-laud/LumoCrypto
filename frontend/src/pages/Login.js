import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      navigate("/portfolio");
    } catch {
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Accède à ton espace LumoCrypto</p>

        <input
          className="login-input"
          type="email"
          placeholder="Adresse email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login-input"
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-login" type="submit">
          Se connecter
        </button>

        {message && <p className="error-message">{message}</p>}

        <p className="login-register">
          Pas encore de compte ?{" "}
          <Link className="btn btn-login" to="/register">
            Créer un compte
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
