"use server";

import { signIn, signOut } from "./auth";
import { SignInFormSchema } from "@/lib/definitions";

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  // Utilizo un schema creado con Zod para validar el formato de los inputs

  const validatedFields = SignInFormSchema.safeParse({
    username,
    password,
  });

  // Para evitar llamadas innecesarias a la API del authentication provider o a la base de datos,
  // se puede forzar un early return en la Server Action si algún campo del formulario no es validado por el esquema.

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // API ENDPOINT: Chequear si el usuario existe en la DB y si la contraseña es correcta

    await signIn("credentials", { username, password });
    return { success: true };
  } catch (err) {
    console.log(err);
    if (err?.type?.includes("CredentialsSignin"))
      return { error: "Invalid username or password" };
    throw err;
  }
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};
