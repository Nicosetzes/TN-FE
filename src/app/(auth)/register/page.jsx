"use client";

import OvalSpinner from "@/components/spinners/OvalSpinner";
import RegisterForm from "@/components/RegisterForm/page";
import { useSession } from "@/context/SessionContext";

const RegisterPage = () => {
  const { contextLoader, logout, userSession } = useSession();

  if (contextLoader) return <OvalSpinner />;

  return userSession ? (
    <>
      <div>
        Para registrar un nuevo usuario, primero debe cerrar la sesión actual
      </div>
      <div>Usuario: {userSession.first_name}</div>
      <button className="button-primary" onClick={logout}>
        Cerrar sesión
      </button>
    </>
  ) : (
    <>
      <div>Esta es la página de registro</div>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
