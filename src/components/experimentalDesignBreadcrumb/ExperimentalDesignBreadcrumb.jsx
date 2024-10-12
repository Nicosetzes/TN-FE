"use client";

import { ArrowRight } from "../icons/ArrowRight";
import styles from "./styles.module.css";
import Link from "next/link";

const ExperimentalDesignBreadcrumb = ({ isOverviewHidden, step }) => {
  const url = "/virtual-lab/experimental-designs/create";

  const steps = [
    {
      name: "Título",
      pathname: `${url}/step-1`,
    },
    {
      name: "Modelo experimental",
      pathname: `${url}/step-2`,
    },
    {
      name: "Variable respuesta",
      pathname: `${url}/step-3`,
    },
    {
      name: "Factores",
      pathname: `${url}/step-4`,
    },
    {
      name: "Niveles de los factores",
      pathname: `${url}/step-5`,
    },
    {
      name: "Cantidad de réplicas",
      pathname: `${url}/step-6`,
    },
    {
      name: "Revisar",
      pathname: isOverviewHidden ? null : `${url}`,
    },
  ].filter(({ pathname }) => pathname);

  return (
    <div className={styles.container}>
      {steps.map(({ name, pathname }, index) => (
        <Link
          key={name}
          href={pathname}
          className={`${styles.link} ${
            (step == pathname.at(-1) || (!step && index == steps.length - 1)) &&
            styles.active
          }`}
        >
          {!index == 0 && (
            <span>
              <ArrowRight size={24} />
            </span>
          )}
          {name}
        </Link>
      ))}
    </div>
  );
};

export default ExperimentalDesignBreadcrumb;
