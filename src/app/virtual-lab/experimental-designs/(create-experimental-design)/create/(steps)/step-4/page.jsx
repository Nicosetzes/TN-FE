"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { explanatoryVariablesFormSchema } from "@/utils/definitions";
import { AlertCircle } from "@/components/icons/AlertCircle";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { MinusSign } from "@/components/icons/MinusSign";
import { PlusSign } from "@/components/icons/PlusSign";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError } from "@/utils/alerts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CreateExperimentalDesignStepFour = () => {
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
    unregister,
    trigger,
    watch,
  } = useForm({
    resolver: zodResolver(explanatoryVariablesFormSchema),
  });

  const validateForm = async () => {
    const isFormValidated = await trigger();

    console.log(isFormValidated);

    console.log(errors);

    if (!isFormValidated) {
      toastError(3000, "Error en el formulario", "Intente nuevamente");
      return;
    }

    // Solo llamar a handleSubmit si la validación es exitosa
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    const explanatory_variables = Object.keys(data)
      .filter((key) => key.startsWith("explanatory_variable_"))
      .map((key) => ({
        name: key,
        value: data[key],
        levels: [], // Inicializamos levels como un array vacío
      }))
      .filter(({ value }) => value);

    updateExperimentalDesign({
      step: currentStep,
      key: "explanatory_variables",
      value: explanatory_variables,
    });
    router.push("/virtual-lab/experimental-designs/create/step-5");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const haveValuesBeenDeclared = experimentalDesign.filter(
        (element) => element.step === currentStep
      );

      if (haveValuesBeenDeclared.length) {
        console.log("El paso ya se había confirmado");
        console.log(haveValuesBeenDeclared);
        const { value } = haveValuesBeenDeclared.at(0);
        value.forEach(({ name, value }, index) => {
          setValue(name, value);
          // if (index === 0) setIsFirstRowOpen(true);
          if (index === 1) setIsSecondRowOpen(true);
          if (index === 2) setIsThirdRowOpen(true);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchfirstExplanatoryVariable = watch("explanatory_variable_1");
  const watchSecondExplanatoryVariable = watch("explanatory_variable_2");
  const watchThirdExplanatoryVariable = watch("explanatory_variable_3");

  // const [isFirstRowOpen, setIsFirstRowOpen] = useState(false);
  const [isSecondRowOpen, setIsSecondRowOpen] = useState(false);
  const [isThirdRowOpen, setIsThirdRowOpen] = useState(false);

  console.log(experimentalDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/virtual-lab/experimental-designs/create/step-3"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/virtual-lab/experimental-designs/create/step-5"
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
        <div className={styles.formRow}>
          {"Agregue las variables explicativas (máx. 3):"}
        </div>
        <div className={styles.formRow}>
          <AlertCircle size={32} className={styles.alertCircle} />
          <input
            {...register("explanatory_variable_1")}
            placeholder="Ingrese la variable 1"
          />
        </div>
        <div className={styles.formCustomError}>
          {errors?.explanatory_variable_1?.message}
        </div>
        <div className={styles.formRow}>
          {!isSecondRowOpen ? (
            <PlusSign
              size={32}
              className={styles.plusSign}
              onClick={() => setIsSecondRowOpen(!isSecondRowOpen)}
            />
          ) : (
            <>
              <MinusSign
                size={32}
                className={styles.minusSign}
                onClick={() => {
                  setIsSecondRowOpen(!isSecondRowOpen);
                  setIsThirdRowOpen(false); // En esta excepción, siempre quiero que se cierre
                  setValue("explanatory_variable_2", undefined);
                  setValue("explanatory_variable_3", undefined);
                }}
              />
              <input
                {...register("explanatory_variable_2")}
                placeholder="Ingrese la variable 2"
              />
            </>
          )}
        </div>
        <div className={styles.formCustomError}>
          {errors?.explanatory_variable_2?.message}
        </div>
        {isSecondRowOpen && (
          <>
            <div className={styles.formRow}>
              {!isThirdRowOpen ? (
                <PlusSign
                  size={32}
                  className={styles.plusSign}
                  onClick={() => setIsThirdRowOpen(!isThirdRowOpen)}
                />
              ) : (
                <>
                  <MinusSign
                    size={32}
                    className={styles.minusSign}
                    onClick={() => {
                      setIsThirdRowOpen(!isThirdRowOpen);
                      setValue("explanatory_variable_3", undefined);
                    }}
                  />
                  <input
                    {...register("explanatory_variable_3")}
                    placeholder="Ingrese la variable 3"
                  />
                </>
              )}
            </div>
            <div className={styles.formCustomError}>
              {errors?.explanatory_variable_3?.message}
            </div>
          </>
        )}
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

export default CreateExperimentalDesignStepFour;
