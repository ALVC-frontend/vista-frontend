"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/actions";
import styles from "./login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(email, password, rememberMe));
    if (res.success) {
      localStorage.setItem("accessToken", res.data.accessToken);
      router.push("/");
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.inputWrapper}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            id="remember-me"
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
