import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import "../styles/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await register(email, password);
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2 className="register-title">Inscription</h2>
        <p className="register-subtitle">Crée ton compte LumoCrypto</p>

        <input
          className="register-input"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-register" type="submit">
          Créer un compte
        </button>

        {message && <p className="error-message">{message}</p>}

        <p className="register-login">
          Déjà un compte ?{" "}
          <Link className="btn btn-register" to="/login">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
