"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const CreateExperimentalDesignStepThree = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const { handleSubmit, register, setValue, watch } = useForm();

  const onSubmit = ({ responseVariable }) => {
    updateExperimentalDesign({
      key: "responseVariable",
      step: currentStep,
      value: responseVariable,
    });
    router.push("/dashboard/experimental-designs/create/step-4");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const hasValueBeenDeclared = experimentalDesign
        .filter((element) => element.step === currentStep)
        .at(0);
      if (hasValueBeenDeclared) {
        console.log("El paso ya se había confirmado");
        setValue("responseVariable", hasValueBeenDeclared.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchResponseVariable = watch("responseVariable");

  console.log(watchResponseVariable);

  console.log(experimentalDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/dashboard/experimental-designs/create/step-2"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/dashboard/experimental-designs/create/step-4"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("responseVariable")} placeholder="Medición" />
        <input
          type="submit"
          value="Enviar"
          disabled={!watchResponseVariable}
          className="button-primary"
        />
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepThree;
