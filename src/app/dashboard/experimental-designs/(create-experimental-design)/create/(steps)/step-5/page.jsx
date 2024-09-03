"use client";

import ExplanatoryVariableContainer from "@/components/explanatoryVariableContainer/page";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

const CreateExperimentalDesignStepFive = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, setExperimentalDesign } = useExperimentalDesign();

  const methods = useForm();

  const onSubmit = (data) => {
    console.log("Data recibida en onSubmit:", data);

    // Verificamos el contenido de experimentalDesign antes de mapear
    console.log(
      "Experimental Design antes de la actualización:",
      experimentalDesign
    );

    const updatedExperimentalDesign = experimentalDesign.map((item) => {
      console.log("Analizando item:", item);

      if (Number(item.step) === currentStep - 1) {
        console.log("Encontré el step 4");
        const updatedVariables = item.value.map((variable) => {
          const levels = Object.keys(data)
            .filter((key) =>
              key.startsWith(
                `explanatory_variable_level_${variable.name.at(-1)}`
              )
            )
            .map((levelKey) => ({
              name: levelKey,
              value: data[levelKey],
            }))
            .filter(({ value }) => value); // Filtramos niveles vacíos

          // Verificamos la asociación de niveles
          console.log(
            `Variable explicatoria: ${variable.name}, Niveles:`,
            levels
          );

          return {
            ...variable,
            levels,
          };
        });

        return {
          ...item,
          value: updatedVariables,
        };
      }

      return item;
    });

    // Verificamos el contenido de updatedExperimentalDesign antes de actualizar el estado
    console.log(
      "Experimental Design después de la actualización:",
      updatedExperimentalDesign
    );

    setExperimentalDesign(updatedExperimentalDesign);
    router.push("/dashboard/experimental-designs/create/step-6");
  };

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const haveValuesBeenDeclared = experimentalDesign.filter(
        (item) => Number(item.step) === currentStep - 1
      );

      if (haveValuesBeenDeclared.length) {
        console.log("El paso ya se había confirmado");
        const { value } = haveValuesBeenDeclared.at(0);
        console.log(value);
        value.forEach(({ levels }) => {
          levels.forEach(({ name, value }) => {
            methods.setValue(name, value);
          });
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const explanatory_variables = experimentalDesign.filter(
    ({ step }) => step == currentStep - 1
  );

  console.log(explanatory_variables);

  console.log(experimentalDesign);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/dashboard/experimental-designs/create/step-4"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/dashboard/experimental-designs/create/step-6"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      {!explanatory_variables.length ? (
        <div className={styles.containerError}>
          <div>Aún no se han definido las variables explicatorias</div>
          <Link
            href={{
              pathname: `/dashboard/experimental-designs/create/step-${
                currentStep - 1
              }`,
            }}
            className="button-primary"
          >
            Ir
          </Link>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            <div>
              {explanatory_variables.at(0).value.map(({ name, value }) => (
                <ExplanatoryVariableContainer
                  key={name}
                  id={name.at(-1)}
                  explanatory_variable={value}
                />
              ))}
            </div>
            <input
              type="submit"
              value="Confirmar"
              // disabled={!firstLevel || !secondLevel}
              className="button-primary"
            />
          </form>
        </FormProvider>
      )}
    </motion.div>
  );
};

export default CreateExperimentalDesignStepFive;
