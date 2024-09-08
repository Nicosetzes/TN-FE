"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { responseVariableFormSchema } from "@/utils/definitions";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastFormError } from "@/utils/alerts";
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

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(responseVariableFormSchema),
  });

  const validateForm = async () => {
    const isFormValidated = await trigger();

    if (!isFormValidated) {
      toastFormError(3000);
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = ({ response_variable }) => {
    updateExperimentalDesign({
      key: "response_variable",
      step: currentStep,
      value: response_variable,
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
        const { key, value } = hasValueBeenDeclared;
        console.log("El paso ya se había confirmado");
        setValue(key, value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchResponseVariable = watch("response_variable");

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
      <ExperimentalDesignBreadcrumb
        pathname={pathname}
        step={currentStep}
        isOverviewHidden={!experimentalDesign.length}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("response_variable")} placeholder="Medición" />
        <div className={styles.formCustomError}>
          {errors?.response_variable?.message}
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

export default CreateExperimentalDesignStepThree;
