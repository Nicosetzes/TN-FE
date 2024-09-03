"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { MinusSign } from "@/components/icons/MinusSign";
import { PlusSign } from "@/components/icons/PlusSign";
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

  const { handleSubmit, register, setValue, watch } = useForm();

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
    router.push("/dashboard/experimental-designs/create/step-5");
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
          if (index === 0) setIsFirstRowOpen(true);
          if (index === 1) setIsSecondRowOpen(true);
          if (index === 2) setIsThirdRowOpen(true);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchfirstExplanatoryVariable = watch("explanatory_variable_1");

  const [isFirstRowOpen, setIsFirstRowOpen] = useState(false);
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
        href="/dashboard/experimental-designs/create/step-3"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/dashboard/experimental-designs/create/step-5"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          {
            "Presioná el botón para agregar una nueva variable explicatoria (máx. 3)."
          }
        </div>
        <div className={styles.formRow}>
          {!isFirstRowOpen ? (
            <PlusSign
              size={32}
              className={styles.plusSign}
              onClick={() => {
                setIsFirstRowOpen(!isFirstRowOpen);
              }}
            />
          ) : (
            <>
              <MinusSign
                size={32}
                className={styles.minusSign}
                onClick={() => {
                  setIsFirstRowOpen(!isFirstRowOpen);
                  setValue("explanatory_variable_1", null);
                }}
              />
              <input
                {...register("explanatory_variable_1")}
                placeholder="Ingrese la variable 1"
              />
            </>
          )}
        </div>
        {isFirstRowOpen && (
          <>
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
                      setValue("explanatory_variable_2", null);
                    }}
                  />
                  <input
                    {...register("explanatory_variable_2")}
                    placeholder="Ingrese la variable 2"
                  />
                </>
              )}
            </div>
          </>
        )}
        {isSecondRowOpen && (
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
                    setValue("explanatory_variable_3", null);
                  }}
                />
                <input
                  {...register("explanatory_variable_3")}
                  placeholder="Ingrese la variable 3"
                />
              </>
            )}
          </div>
        )}
        {isFirstRowOpen && (
          <input
            type="submit"
            value="Confirmar"
            disabled={!watchfirstExplanatoryVariable}
            className="button-primary"
          />
        )}
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepFour;
