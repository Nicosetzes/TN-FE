"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { biologicalReplicatesFormSchema } from "@/utils/definitions";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError } from "@/utils/alerts";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const CreateExperimentalDesignStepSix = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesignWithMultipleEntries } =
    useExperimentalDesign();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    trigger,
    // watch,
  } = useForm({
    resolver: zodResolver(biologicalReplicatesFormSchema),
  });

  const validateForm = async () => {
    const isFormValidated = await trigger();

    if (!isFormValidated) {
      toastError(3000, "Error en el formulario", "Intente nuevamente");
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    const entries = Object.keys(data).map((key) => ({
      name: key,
      value: data[key],
    }));

    updateExperimentalDesignWithMultipleEntries(currentStep, entries);

    router.push("/dashboard/experimental-designs/create");
  };

  useEffect(() => {
    console.log("Chequeo si los pasos ya se habían confirmado");
    if (experimentalDesign.length) {
      const haveValuesBeenDeclared = experimentalDesign.filter(
        (element) => element.step === currentStep
      );

      if (haveValuesBeenDeclared.length) {
        console.log("Los pasos ya se había confirmado");

        haveValuesBeenDeclared.forEach(({ key, value }) => {
          setValue(key, value);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // const watchSamplingUnit = watch("sampling_unit");
  // const watchBiologicalReplicates = watch("biological_replicates");
  // const watchTechnicalReplicates = watch("technical_replicates");
  // const watchTotalRepetitions = watch("total_repetitions");

  console.log(experimentalDesign);

  console.log(errors);

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
      <Link
        href="/dashboard/experimental-designs/create"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <ExperimentalDesignBreadcrumb
        pathname={pathname}
        step={currentStep}
        isOverviewHidden={!experimentalDesign.length}
      />
      {/* Falta validar que al menos un paso haya sido validado antes de podés ver el overview */}
      {experimentalDesign.length ? (
        <Link
          href="/dashboard/experimental-designs/create"
          className={styles.arrowRight}
        >
          Siguiente <ArrowRight size={36} />
        </Link>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("sampling_unit")} placeholder="Unidad muestral" />
        <div className={styles.formCustomError}>
          {errors?.["sampling_unit"]?.message}
        </div>
        <input
          {...register("biological_replicates", { valueAsNumber: true })}
          placeholder="Cantidad de réplicas biológicas"
        />
        <div className={styles.formCustomError}>
          {errors?.["biological_replicates"]?.message}
        </div>
        <input
          {...register("technical_replicates", { valueAsNumber: true })}
          placeholder="Cantidad de réplicas técnicas"
        />
        <div className={styles.formCustomError}>
          {errors?.["technical_replicates"]?.message}
        </div>
        <input
          {...register("total_repetitions", { valueAsNumber: true })}
          placeholder="Cantidad de repeticiones totales"
        />
        <div className={styles.formCustomError}>
          {errors?.["total_repetitions"]?.message}
        </div>
        <button
          value="Enviar"
          className="button-primary"
          onClick={validateForm}
        >
          Enviar
        </button>
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepSix;
