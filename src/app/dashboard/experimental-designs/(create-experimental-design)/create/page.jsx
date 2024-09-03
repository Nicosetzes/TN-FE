"use client";

import ExperimentalDesignOverview from "@/components/experimentalDesignOverview/ExperimentalDesignOverview";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const CreateExperimentalDesignPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { experimentalDesign } = useExperimentalDesign();

  const submitExperimentalDesign = (data) => {
    console.log(data);
  };

  // const experimentalDesignDataFormatting = (data) => {
  //   const formattedData = data.map(
  //     ({ content: { key: a, value: b } }, step) => {
  //       return { key: a, value: b, step };
  //     }
  //   );
  //   return formattedData;
  // };

  return (
    <div className={styles.container}>
      {!experimentalDesign.length ? (
        <>
          <p>
            Te haremos una serie de preguntas para generar tu diseño
            experimental
          </p>
          <Link
            href="/dashboard/experimental-designs/create/step-1"
            className="button-primary"
          >
            Comenzar
          </Link>
        </>
      ) : (
        <ExperimentalDesignOverview
          data={experimentalDesign}
          submit={submitExperimentalDesign}
        />
      )}
    </div>
  );
};

export default CreateExperimentalDesignPage;
