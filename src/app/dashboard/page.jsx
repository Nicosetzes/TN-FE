"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <>
      <ProtectedRoute>
        <div>Dashboard (página protegida)</div>
        <Link href="/dashboard/experimental-designs">Experimental designs</Link>
      </ProtectedRoute>
    </>
  );
};

export default DashboardPage;
