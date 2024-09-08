"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import ExperimentalDesignOverview from "@/components/experimentalDesignOverview/ExperimentalDesignOverview";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { usePathname, useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CreateExperimentalDesignPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { experimentalDesign } = useExperimentalDesign();

  const submitExperimentalDesign = (data) => {
    console.log(data);
  };

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
        <>
          <ExperimentalDesignBreadcrumb />
          <ExperimentalDesignOverview
            data={experimentalDesign}
            submit={submitExperimentalDesign}
          />
        </>
      )}
    </div>
  );
};

export default CreateExperimentalDesignPage;
