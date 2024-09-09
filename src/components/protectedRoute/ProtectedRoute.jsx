"use client";

import OvalSpinner from "@/components/spinners/OvalSpinner";
import { useSession } from "@/context/SessionContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { userSession, logout } = useSession();

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      if (userSession) {
        console.log("Hay sesión activa");
        try {
          //   const response = await fetch("/api/get-user-info", {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   });

          const response = { ok: true }; // temporal

          if (response.ok) {
            console.log("El token es válido, permito acceso");
            setLoading(false); // + Refrescar token? Consultar a Martín
          } else {
            console.log("Hubo un problema con la validación del token");
            logout(); // Cierro sesión, elimino userSession y reenvío a /login
          }
        } catch (error) {
          console.log("Hubo un problema inesperado");
          logout(); // Cierro sesión, elimino userSession y reenvío a /login
        }
      } else {
        console.log("No hay sesión activa, redirijo a /login");
        router.push("/login?redirect=true");
      }
    };

    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession]);

  if (loading) return <OvalSpinner />;
  else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
