"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { experimentalDesignNameFormSchema } from "@/utils/definitions";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastFormError } from "@/utils/alerts";
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

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(experimentalDesignNameFormSchema),
  });

  const validateForm = async () => {
    const isFormValidated = await trigger();

    if (!isFormValidated) {
      toastFormError(3000);
      return;
    }

    handleSubmit(onSubmit)();
  };

  const onSubmit = ({ experimental_design_name }) => {
    updateExperimentalDesign({
      key: "experimental_design_name",
      step: currentStep,
      value: experimental_design_name,
    });
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
        const { key, value } = hasValueBeenDeclared;
        setValue(key, value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchExperimentalDesignName = watch("experimental_design_name");

  console.log(experimentalDesign);

  console.log(errors);

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
      <ExperimentalDesignBreadcrumb
        pathname={pathname}
        step={currentStep}
        isOverviewHidden={!experimentalDesign.length}
      />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("experimental_design_name")} placeholder="Nombre" />
        <div className={styles.formCustomError}>
          {errors?.experimental_design_name?.message}
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

export default CreateExperimentalDesignStepOne;
