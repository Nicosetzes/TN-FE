"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const CreateExperimentalDesignStepOne = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const { handleSubmit, register, setValue, watch } = useForm();

  const onSubmit = ({ name }) => {
    updateExperimentalDesign({ key: "name", step: currentStep, value: name });
    router.push("/dashboard/experimental-designs/create/step-2");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const hasValueBeenDeclared = experimentalDesign
        .filter((element) => element.step === currentStep)
        .at(0);
      if (hasValueBeenDeclared) {
        console.log("El paso ya se había confirmado");
        setValue("name", hasValueBeenDeclared.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchName = watch("name");

  console.log(experimentalDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/dashboard/experimental-designs/create/step-2"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("name")} placeholder="Nombre" />
        <input
          type="submit"
          value="Enviar"
          disabled={!watchName}
          className="button-primary"
        />
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepOne;
