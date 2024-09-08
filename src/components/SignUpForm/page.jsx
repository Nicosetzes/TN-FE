"use client";

import { SignUpFormSchema } from "@/utils/definitions";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "../icons/UserProfile";
import { toastFormError } from "@/utils/alerts";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SignUpForm = () => {
  const router = useRouter();

  const [preview, setPreview] = useState();
  const [avatar, setAvatar] = useState(null); // Solo utilizo setAvatar, útil para validar por zod

  const uploadButtonLabel = preview ? "Modificar imagen" : "Subir imagen";

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = ({ first_name, last_name, email, password, avatar }) => {
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("password", password);
    if (avatar) formData.append("avatar", avatar);

    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })

    const response = { ok: true }; // temporal

    if (response.ok) {
      router.push("/login");
    } else {
      // Manejar errores
    }
  };

  const handleAvatarChange = (event) => {
    console.log("Actualizo imagen");
    const image = event.target.files[0];

    if (image) {
      const urlImage = URL.createObjectURL(image); // Genero la URL de la imagen, necesaria para mostrar el preview
      setPreview(urlImage); // Guardo la URL en preview
      setAvatar(image);
      setValue("avatar", image); // Actualiza el valor del campo en React Hook Form
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input {...register("first_name")} placeholder="Nombre" />
      <div className={styles.formCustomError}>
        {errors?.first_name?.message}
      </div>
      <input {...register("last_name")} placeholder="Apellido" />
      <div className={styles.formCustomError}>{errors?.last_name?.message}</div>
      <input {...register("email")} placeholder="Email" />
      <div className={styles.formCustomError}>{errors?.email?.message}</div>
      <input
        {...register("password")}
        type="password"
        placeholder="Contraseña"
      />
      <div className={styles.formCustomError}>{errors?.password?.message}</div>
      <div className={styles.imageContainer}>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className={styles.hidden}
          {...register("avatar", {
            onChange: handleAvatarChange, // Necesario por cómo react hook form maneja el cambio de estado en <input type="file" />
          })}
        />
        <label htmlFor="avatar" className={styles.imageInput}>
          {uploadButtonLabel}
        </label>
        {preview ? (
          <Image alt="User avatar" src={preview} width={64} height={64} />
        ) : (
          <UserProfile size={64} />
        )}
      </div>
      <div className={styles.formCustomError}>{errors?.avatar?.message}</div>

      <button type="submit" className="button-primary">
        Registrarse
      </button>
    </form>
  );
};

export default SignUpForm;
