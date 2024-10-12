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

  const experimentalDesignWithoutSteps = experimentalDesign.map(
    ({ key, value }) => {
      return { key, value };
    }
  );

  const experimentalDesignAsAnObject = {
    name: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "name")
      ?.at(0)?.value,
    experimental_model: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "experimental_model")
      ?.at(0)?.value,
    response_variable: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "response_variable")
      ?.at(0)?.value,
    explanatory_variables: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "explanatory_variables")
      ?.at(0)
      ?.value.map(({ value, levels }) => {
        return {
          value,
          levels: levels.map((level) => {
            return level.value;
          }),
        };
      }),
    sampling_unit: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "sampling_unit")
      ?.at(0)?.value,
    biological_replicates: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "biological_replicates")
      ?.at(0)?.value,
    technical_replicates: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "technical_replicates")
      ?.at(0)?.value,
    total_repetitions: experimentalDesignWithoutSteps
      .filter(({ key }) => key == "total_repetitions")
      ?.at(0)?.value,
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
            href="/virtual-lab/experimental-designs/create/step-1"
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
            experimentalDesign={experimentalDesignAsAnObject}
            submit={submitExperimentalDesign}
          />
        </>
      )}
    </div>
  );
};

export default CreateExperimentalDesignPage;
