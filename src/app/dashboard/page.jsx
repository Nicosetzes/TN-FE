"use client";

import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  // Router is useful to redirect a user (e.g. after an action or event)
  // It's client side navigation

  const handleClick = () => {
    router.push("/dashboard/experimental-designs");
  };

  return (
    <>
      <div> This is the Dashboard page</div>
      <button onClick={handleClick}>Experimental designs</button>
    </>
  );
};

export default DashboardPage;
