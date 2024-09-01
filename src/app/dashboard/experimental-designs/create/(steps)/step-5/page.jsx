"use client";

import ExplanatoryVariableContainer from "@/components/explanatoryVariableContainer/page";
import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import { useForm, FormProvider } from "react-hook-form";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CreateExperimentalDesignStepFive = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const methods = useForm();

  const onSubmit = ({
    explanatoryVariableLevel11,
    explanatoryVariableLevel12,
    explanatoryVariableLevel13,
    explanatoryVariableLevel14,
    explanatoryVariableLevel15,
    explanatoryVariableLevel21,
    explanatoryVariableLevel22,
    explanatoryVariableLevel23,
    explanatoryVariableLevel24,
    explanatoryVariableLevel25,
    explanatoryVariableLevel31,
    explanatoryVariableLevel32,
    explanatoryVariableLevel33,
    explanatoryVariableLevel34,
    explanatoryVariableLevel35,
  }) => {
    const explanatoryVariablesLevels = [
      {
        id: "11",
        name: "explanatoryVariableLevel11",
        level: explanatoryVariableLevel11,
      },
      {
        id: "12",
        name: "explanatoryVariableLevel12",
        level: explanatoryVariableLevel12,
      },
      {
        id: "13",
        name: "explanatoryVariableLevel13",
        level: explanatoryVariableLevel13,
      },
      {
        id: "14",
        name: "explanatoryVariableLevel14",
        level: explanatoryVariableLevel14,
      },
      {
        id: "15",
        name: "explanatoryVariableLevel15",
        level: explanatoryVariableLevel15,
      },
      {
        id: "21",
        name: "explanatoryVariableLevel21",
        level: explanatoryVariableLevel21,
      },
      {
        id: "22",
        name: "explanatoryVariableLevel22",
        level: explanatoryVariableLevel22,
      },
      {
        id: "23",
        name: "explanatoryVariableLevel23",
        level: explanatoryVariableLevel23,
      },
      {
        id: "24",
        name: "explanatoryVariableLevel24",
        level: explanatoryVariableLevel24,
      },
      {
        id: "25",
        name: "explanatoryVariableLevel25",
        level: explanatoryVariableLevel25,
      },
      {
        id: "31",
        name: "explanatoryVariableLevel31",
        level: explanatoryVariableLevel31,
      },
      {
        id: "32",
        name: "explanatoryVariableLevel32",
        level: explanatoryVariableLevel32,
      },
      {
        id: "33",
        name: "explanatoryVariableLevel33",
        level: explanatoryVariableLevel33,
      },
      {
        id: "34",
        name: "explanatoryVariableLevel34",
        level: explanatoryVariableLevel34,
      },
      {
        id: "35",
        name: "explanatoryVariableLevel35",
        level: explanatoryVariableLevel35,
      },
    ].filter(({ level }) => level);

    updateExperimentalDesign({
      key: "explanatoryVariablesLevels",
      step: currentStep,
      value: explanatoryVariablesLevels,
    });
    router.push("/dashboard/experimental-designs/create/step-6");
  };

  const [openRows, setOpenRows] = useState(false);

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const hasValueBeenDeclared = experimentalDesign
        .filter((element) => element.step === currentStep)
        .at(0);
      console.log(hasValueBeenDeclared);
      if (hasValueBeenDeclared) {
        const { value } = hasValueBeenDeclared;
        console.log("El paso ya se había confirmado");
        value.forEach(({ level, name }) => {
          if (level) {
            methods.setValue(`${name}`, level);
            console.log("reemplazo)");
            setOpenRows(true);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const explanatoryVariables = experimentalDesign
    .filter(({ step }) => step == currentStep - 1)
    .at(0)?.value;

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
      {!explanatoryVariables ? (
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
              {explanatoryVariables.map(({ id, variable }) => (
                <ExplanatoryVariableContainer
                  key={id}
                  id={id}
                  openRows={openRows}
                  variable={variable}
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
