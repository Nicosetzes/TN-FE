"use client";

import ExperimentalDesignBreadcrumb from "@/components/experimentalDesignBreadcrumb/ExperimentalDesignBreadcrumb";
import ExplanatoryVariableContainer from "@/components/explanatoryVariableContainer/page";
import { explanatoryVariableLevelsFormSchema } from "@/utils/definitions";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastError } from "@/utils/alerts";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CreateExperimentalDesignStepFive = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, setExperimentalDesign } = useExperimentalDesign();

  const methods = useForm({
    resolver: zodResolver(explanatoryVariableLevelsFormSchema),
  });

  const validateForm = async () => {
    const isFormValidated = await methods.trigger();

    if (!isFormValidated) {
      toastError(3000, "Error en el formulario", "Intente nuevamente");
      return;
    }

    // Solo llamar a handleSubmit si la validación es exitosa
    methods.handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
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
    router.push("/virtual-lab/experimental-designs/create/step-6");
  };

  useEffect(() => {
    if (experimentalDesign.length) {
      const haveValuesBeenDeclared = experimentalDesign.filter(
        (item) => Number(item.step) === currentStep - 1
      );

      if (haveValuesBeenDeclared.length) {
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

  // const initialValues = explanatory_variables.length
  //   ? explanatory_variables
  //       .at(0)
  //       .value.map((variable) => variable.levels.map((lvl) => lvl.value))
  //   : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/virtual-lab/experimental-designs/create/step-4"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/virtual-lab/experimental-designs/create/step-6"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <ExperimentalDesignBreadcrumb
        pathname={pathname}
        step={currentStep}
        isOverviewHidden={!experimentalDesign.length}
      />
      {!explanatory_variables.length ? (
        <div className={styles.containerError}>
          <div>Aún no se han definido las variables explicatorias</div>
          <Link
            href={{
              pathname: `/virtual-lab/experimental-designs/create/step-${
                currentStep - 1
              }`,
            }}
            className="button-primary"
          >
            Ir al paso anterior
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
            <button
              value="Enviar"
              className="button-primary"
              onClick={validateForm}
            >
              Enviar
            </button>
          </form>
        </FormProvider>
      )}
    </motion.div>
  );
};

export default CreateExperimentalDesignStepFive;
