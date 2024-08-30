"use client";

import styles from "./styles.module.css";

const LoginForm = () => {
  return (
    <>
      <form action="" className={styles.form}>
        <div className={styles.row}>
          <input type="text" name="username" placeholder="Usuario" />
        </div>
        <div className={styles.row}>
          <input type="text" name="password" placeholder="Contraseña" />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
