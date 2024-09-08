import { NextResponse } from "next/server";

export const middleware = (req) => {
  const token = req.cookies.get("token"); // Obtengo cookie

  if (!token) {
    // Redirigir al login si no hay token
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const response = NextResponse.next();

  return response;
};

// Aplicar el middleware a rutas específicas
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Rutas protegidas por el middleware, /:path refiere a las sub-rutas
};
