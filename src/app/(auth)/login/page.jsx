import LoginForm from "@/components/loginForm/LoginForm";
import { auth } from "@/lib/auth";

const LoginPage = async () => {
  const session = await auth();

  console.log(session);

  return (
    <>
      <div> This is the Login page</div>
      <LoginForm />
    </>
  );
};

export default LoginPage;
