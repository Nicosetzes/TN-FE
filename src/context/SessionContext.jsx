"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const router = useRouter();

  const [userSession, setUserSession] = useState(null);
  const [error, setError] = useState(null);

  // Utilizo useEffect para intentar obtener datos de sesión desde localStorage

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (token) {
      // Si hay un token en las cookies, realizo solicitud al backend para verificar su validez y obtener los datos del usuario

      // fetch("/api/get-user-info", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.status === "success") {
      //       setUserSession({
      //
      //         first_name: data.data.user.first_name,
      //         last_name: data.data.user.last_name,
      //         token: data.data.token || token,
      //       });
      //       if (data.data.token) {
      //         Cookies.set("token", data.data.token, { path: "/" });
      //       }
      //       setError(null); // Limpio errores en caso de éxito
      //     } else {
      //       handleAuthError(data.message); // Manejo el error
      //     }
      //   })
      //   .catch(() => {
      //     handleAuthError(); // Manejar error genérico
      //   });

      const response = {
        // Consultar a Martín por el formato
        status: "success",
        data: {
          first_name: "admin",
          last_name: "admin",
          token: "token_renovado_desde_el_backend",
        },
        message: "SUCCESSFULL_TOKEN",
      };

      if (response.status === "success") {
        const {
          data: { first_name, last_name, token },
        } = response;
        setUserSession({ first_name, last_name, token });
        Cookies.set("token", token, { path: "/" });
      }
    }
  }, []);

  const handleAuthError = (message) => {
    // Ver mensajes de error después de obtener response de Martín
    if (message === "Token expired" || message === "Invalid token") {
      logout();
      setError(message);
    } else {
      setError("Un error inesperado ha ocurrido");
    }
  };

  const login = (sessionData) => {
    setUserSession({
      first_name: sessionData.first_name,
      last_name: sessionData.last_name,
      token: sessionData.token,
      // Puede que se guarde más información en el futoro, ej: role
    });
    Cookies.set("token", sessionData.token, { path: "/" });
    setError(null); // Limpio errores
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" }); // Elimino la cookie
    setUserSession(null); // Borro la session en el FE
    router.push("/login");
  };

  return (
    <SessionContext.Provider
      value={{
        userSession,
        login,
        logout,
        error,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
