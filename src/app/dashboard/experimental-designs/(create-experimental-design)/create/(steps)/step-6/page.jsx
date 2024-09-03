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

const CreateExperimentalDesignStepSix = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const { handleSubmit, register, setValue, watch } = useForm();

  const onSubmit = (data) => {
    const replicates = Object.keys(data).map((key) => ({
      name: key,
      value: data[key],
    }));

    updateExperimentalDesign({
      step: currentStep,
      key: "replicates",
      value: replicates,
    });
    router.push("/dashboard/experimental-designs/create");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const haveValuesBeenDeclared = experimentalDesign.filter(
        (element) => element.step === currentStep
      );

      if (haveValuesBeenDeclared.length) {
        console.log("El paso ya se había confirmado");
        const { value } = haveValuesBeenDeclared.at(0);
        value.forEach(({ name, value }) => {
          setValue(name, value);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchSamplingUnit = watch("sampling_unit");
  const watchBiologicalReplicates = watch("biological_replicates");
  const watchTechnicalReplicates = watch("technical_replicates");
  const watchTotalRepetitions = watch("total_repetitions");

  console.log(experimentalDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/dashboard/experimental-designs/create/step-5"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>

      {/* Falta validar que no puedas avanzar si no completaste los pasos anteriores */}
      {/* También validar que no puedas avanzar si no definiste los niveles en el step 4 */}
      {/* {experimentalDesign.length === 5 && (
        <Link
          href="/dashboard/experimental-designs/create"
          className={styles.arrowRight}
        >
          Siguiente <ArrowRight size={36} />
        </Link>
      )} */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("sampling_unit")} placeholder="Unidad muestral" />
        <input
          {...register("biological_replicates")}
          placeholder="Cantidad de réplicas biológicas"
        />
        <input
          {...register("technical_replicates")}
          placeholder="Cantidad de réplicas técnicas"
        />
        <input
          {...register("total_repetitions")}
          placeholder="Cantidad de repeticiones totales"
        />
        <input
          type="submit"
          value="Enviar"
          disabled={
            !watchSamplingUnit ||
            !watchBiologicalReplicates ||
            !watchTechnicalReplicates ||
            !watchTotalRepetitions
          }
          className="button-primary"
        />
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepSix;
