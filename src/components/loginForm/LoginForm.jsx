"use client";

import styles from "./styles.module.css";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
