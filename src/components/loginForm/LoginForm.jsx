"use client";

import { useSession } from "@/context/SessionContext";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

const LoginForm = () => {
  const { login } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Llamado a la API (BE)

    const response = {
      status: "success",
      data: {
        first_name: "admin",
        last_name: "admin",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L2FwaS91c2VyL2xvZ2luIiwiaWF0IjoxNzI1NzUwODU3LCJleHAiOjE3MjU4MzcyNTcsIm5iZiI6MTcyNTc1MDg1NywianRpIjoieFJpejhuMmROaUU3aTJHayIsInN1YiI6IjEiLCJwcnYiOiIyYjFjOTQyY2VjM2FmMjFiNWQ3OTVjM2M1NDM2YzY1ODg0M2U3NjU1In0.dVYQh4L8-3g-jpCYMxA9HujArINb8SvQT5peyPzfuFo",
      },
      message: "SUCCESSFULL_LOGIN",
    };

    if (response.status !== "success") return; // Manejar errores

    if (response.status === "success") {
      const {
        data: { first_name, last_name, token },
      } = response;

      document.cookie = `token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;

      login({ first_name, last_name, token }); // Ejecuto login (del context) para actualizar la session en CONTEXT API
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.row}>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            {...register("username", { required: true })}
          />
          {errors.username && <span>Username is required!</span>}
        </div>
        <div className={styles.row}>
          <input
            type="text"
            name="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && <span>Password is required!</span>}
        </div>
        <input type="submit" className="button-primary" />
      </form>
    </>
  );
};

export default LoginForm;
