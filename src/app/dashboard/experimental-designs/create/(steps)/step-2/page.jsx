"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import SpeciesList from "@/components/filteredSpecies/SpeciesList";
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

  const [filteredSpecies, setFilteredSpecies] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [isSpeciesListVisible, setIsSpeciesListVisible] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  console.log(experimentalDesign);

  // useEffect(() => {
  //   console.log("Chequeo si el paso ya se confirmó");
  //   if (experimentalDesign.length) {
  //     const hasValueBeenDeclared = experimentalDesign
  //       .filter((element) => element.step === currentStep)
  //       .at(0);
  //     if (hasValueBeenDeclared) {
  //       console.log("El paso ya se había confirmado");
  //       setValue("species", hasValueBeenDeclared.value);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  useEffect(() => {
    const hasValueBeenDeclared = experimentalDesign.find(
      (element) => element.step === currentStep
    );

    if (hasValueBeenDeclared) {
      setValue("species", hasValueBeenDeclared.value);
      setSelectedSpecies(hasValueBeenDeclared.value);
      setIsSubmitEnabled(true);
      setIsSpeciesListVisible(false);
    }
  }, [pathname, experimentalDesign, currentStep, setValue]);

  const watchSpecies = watch("species");

  useEffect(() => {
    if (watchSpecies && watchSpecies.length > 2) {
      if (watchSpecies !== selectedSpecies) {
        setIsSpeciesListVisible(true);
        setIsSubmitEnabled(false);
        handleSearch(watchSpecies);
      } else {
        setIsSpeciesListVisible(false);
        setIsSubmitEnabled(true);
      }
    } else {
      setIsSpeciesListVisible(false);
      setFilteredSpecies([]);
    }
  }, [watchSpecies, selectedSpecies]);

  const handleSearch = (input) => {
    const results = biologicalModels.filter(
      ({ species, kingdom }) =>
        species.toLowerCase().includes(input.toLowerCase()) ||
        kingdom.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSpecies(results);
  };

  const selectSpecies = (selection) => {
    setSelectedSpecies(selection);
    setFilteredSpecies([]);
    setValue("species", selection);
    setIsSubmitEnabled(true);
  };

  const onSubmit = ({ species }) => {
    updateExperimentalDesign({
      key: "species",
      step: currentStep,
      value: species,
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
          {...register("species")}
          placeholder="Ingrese la especie o reino..."
        />
        {isSpeciesListVisible && (
          <SpeciesList list={filteredSpecies} action={selectSpecies} />
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
