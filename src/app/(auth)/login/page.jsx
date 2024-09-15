"use client";

import OvalSpinner from "@/components/spinners/OvalSpinner";
import LoginForm from "@/components/loginForm/LoginForm";
import { useSession } from "@/context/SessionContext";

const LoginPage = () => {
  const { contextLoader, userSession, logout } = useSession();

  if (contextLoader) return <OvalSpinner />;
  return userSession ? (
    <>
      <div>Usted ya está logueado!</div>
      <div>Bienvenido, {userSession.first_name}</div>
      <button className="button-primary" onClick={logout}>
        Cerrar sesión
      </button>
    </>
  ) : (
    <>
      <div> Esta es la página de login</div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
