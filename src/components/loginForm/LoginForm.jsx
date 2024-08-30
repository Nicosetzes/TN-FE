"use client";

import styles from "./styles.module.css";
import { useFormState } from "react-dom";
import { login } from "@/lib/action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(login, undefined);

  useEffect(() => {
    state?.success && router.push("/");
  }, [state?.success, router]);

  return (
    <>
      <form action={formAction} className={styles.form}>
        <div className={styles.row}>
          <input type="text" name="username" placeholder="Usuario" />
        </div>
        <div className={styles.row}>
          <input type="text" name="password" placeholder="Contraseña" />
        </div>
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
        {state?.error}
      </form>
    </>
  );
};

export default LoginForm;
