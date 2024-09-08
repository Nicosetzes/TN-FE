"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isValidSession, setIsValidSession] = useState(false); // Porque es una ruta protegida
  const router = useRouter();

  useEffect(() => {
    // Valido el token de la cookie cuando se carga la página
    const validateToken = async () => {
      // const res = await fetch("/api/validate-token", {
      //   method: "POST",
      //   credentials: "include", // Necesario para enviar las cookies al backend
      // });

      const res = { ok: true }; // Temporal

      if (res.ok) {
        setIsValidSession(true);
      } else {
        router.push("/login"); // Si el token es inválido, redirijo a /login
      }
    };

    validateToken();
  }, [router]);

  console.log(isValidSession);

  if (!isValidSession) {
    return <div>Loading...</div>; // Loading state mientras verifico la validez del token
  }

  return (
    <>
      <div>Dashboard (página protegida)</div>
      <Link href="/dashboard/experimental-designs">Experimental designs</Link>
    </>
  );
};

export default DashboardPage;
