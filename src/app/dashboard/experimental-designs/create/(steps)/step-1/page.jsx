"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Link from "next/link";
import { useEffect } from "react";

const CreateExperimentalDesignStepOne = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const { handleSubmit, register, setValue, watch } = useForm();

  const onSubmit = (data) => {
    updateExperimentalDesign({ step: currentStep, value: data });
    router.push("/dashboard/experimental-designs/create/step-2");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const hasValueBeenDeclared = experimentalDesign
        .filter((element) => element.step === currentStep)
        .at(0);
      hasValueBeenDeclared && setValue("name", hasValueBeenDeclared.value.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchName = watch("name");

  console.log(experimentalDesign);

  return (
    <div className={styles.container}>
      <Link href="/dashboard/experimental-designs/create/step-2">
        Siguiente <ArrowRight />
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
    </div>
  );
};

export default CreateExperimentalDesignStepOne;
