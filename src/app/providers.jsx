"use client";

import { NextUIProvider } from "@nextui-org/react";
// import { ExperimentalDesignProvider } from "@/context/ExperimentalDesignContext";

export const Providers = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
