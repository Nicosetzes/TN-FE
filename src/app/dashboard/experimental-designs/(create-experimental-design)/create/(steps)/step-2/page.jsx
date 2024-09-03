"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import ExperimentalModelsList from "@/components/filteredExperimentalModels/ExperimentalModelsList";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { biologicalModels } from "@/lib/data";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Link from "next/link";

const CreateExperimentalDesignStepTwo = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentStep = pathname.at(-1);

  const { experimentalDesign, updateExperimentalDesign } =
    useExperimentalDesign();

  const { handleSubmit, register, setValue, watch } = useForm();

  const [filteredExperimentalModels, setFilteredExperimentalModels] =
    useState("");
  const [selectedExperimentalModel, setSelectedExperimentalModel] =
    useState("");
  const [isExperimentalModelsListVisible, setIsExperimentalModelsListVisible] =
    useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  console.log(experimentalDesign);

  useEffect(() => {
    const hasValueBeenDeclared = experimentalDesign.find(
      (element) => element.step === currentStep
    );

    console.log(hasValueBeenDeclared);

    if (hasValueBeenDeclared) {
      const { key, value } = hasValueBeenDeclared;
      setValue(key, value);
      setSelectedExperimentalModel(value);
      setIsSubmitEnabled(true);
      setIsExperimentalModelsListVisible(false);
    }
  }, [pathname, experimentalDesign, currentStep, setValue]);

  const watchExperimentalModel = watch("experimental_model");

  useEffect(() => {
    if (watchExperimentalModel && watchExperimentalModel.length > 2) {
      if (watchExperimentalModel !== selectedExperimentalModel) {
        setIsExperimentalModelsListVisible(true);
        setIsSubmitEnabled(false);
        handleSearch(watchExperimentalModel);
      } else {
        setIsExperimentalModelsListVisible(false);
        setIsSubmitEnabled(true);
      }
    } else {
      setIsExperimentalModelsListVisible(false);
      setFilteredExperimentalModels([]);
    }
  }, [watchExperimentalModel, selectedExperimentalModel]);

  const handleSearch = (input) => {
    const results = biologicalModels.filter(
      ({ species, kingdom }) =>
        species.toLowerCase().includes(input.toLowerCase()) ||
        kingdom.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredExperimentalModels(results);
  };

  const selectExperimentalModel = (selection) => {
    setSelectedExperimentalModel(selection);
    setFilteredExperimentalModels([]);
    setValue("experimental_model", selection);
    setIsSubmitEnabled(true);
  };

  const onSubmit = ({ experimental_model }) => {
    updateExperimentalDesign({
      key: "experimental_model",
      step: currentStep,
      value: experimental_model,
    });
    router.push("/dashboard/experimental-designs/create/step-3");
  };

  const variants = {
    hidden: { opacity: 0, x: "-50%" },
    show: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.5 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <Link
        href="/dashboard/experimental-designs/create/step-1"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <Link
        href="/dashboard/experimental-designs/create/step-3"
        className={styles.arrowRight}
      >
        Siguiente <ArrowRight size={36} />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("experimental_model")}
          placeholder="Ingrese la especie o reino..."
        />
        {isExperimentalModelsListVisible && (
          <ExperimentalModelsList
            list={filteredExperimentalModels}
            action={selectExperimentalModel}
          />
        )}
        <AnimatePresence>
          {isSubmitEnabled && (
            <motion.input
              variants={variants}
              initial="hidden"
              animate="show"
              exit="exit"
              type="submit"
              value="Seleccionar"
              className="button-primary"
            />
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepTwo;
