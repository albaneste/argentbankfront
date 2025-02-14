import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const connexion = async (event) => {
        event.preventDefault();

        try {
            const reponse = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (reponse.ok) {
                const data = await reponse.json();
                const token = data?.body?.token;

                if (token) {
                    sessionStorage.setItem("token", token);

                    if (rememberme) {
                        localStorage.setItem("token", token);
                    }

                    navigate("/profil", { replace: true });
                } else {
                    setError("Erreur: le token est manquant dans la réponse.");
                }
            } else {
                setError("Le mot de passe et/ou votre identifiant est incorrect.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setError("Une erreur s'est produite lors de la tentative de connexion.");
        }
    };

    return (
        <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h2>Sign In</h2>
                    <form onSubmit={connexion}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberme}
                                onChange={(event) => setRememberme(event.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="sign-in-button">
                        Sign In
                        </button>
                    </form>
                </section>
            </main>
    );
};

export default Login;