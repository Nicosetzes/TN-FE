"use client";

import OvalSpinner from "@/components/spinners/OvalSpinner";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/context/SessionContext";
import { toastError } from "@/utils/alerts";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { contextLoader, logout, setDeniedRoute, userSession } = useSession();

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!contextLoader) {
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
          setLoading(false); // + Refrescar token? Consultar a Martín
          setDeniedRoute(pathname); // Guardo la ruta, para luego redirigir al usuario en caso de login exitoso
          router.replace("/login");
          toastError(3000, "No hay sesión activa", "Por favor, inicie sesión");
        }
      };

      validateToken();
    }
  }, [contextLoader, userSession, logout, setDeniedRoute, router, pathname]);

  if (loading) return <OvalSpinner />;
  else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
