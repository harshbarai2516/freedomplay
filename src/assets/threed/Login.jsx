import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { username, password };

    axios
      .post("https://thewonder.uk/royalgame/api/login", payload)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("username", username);
        console.log("Login Successful", res);
        navigate("/twod");
      })
      .catch((err) => {
        console.log("Login Failed", err);
        alert("Invalid username or password!");
      });
  };

  return (
    <div className={`bg-dark ${styles.mainContainer}`}>
      <div className={`${styles.container} border border-5 border-secondary rounded-4`}>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <h1 className="fw-bold text-center" style={{ color: "purple" }}>
            Login
          </h1>
          <input
            type="text"
            className={`${styles.inputField}`}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
          />
          <input
            type="password"
            className={`${styles.inputField}`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className={`${styles.loginBtn}`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
