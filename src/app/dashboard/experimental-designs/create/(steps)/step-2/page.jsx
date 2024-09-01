"use client";

import { useExperimentalDesign } from "@/context/ExperimentalDesignContext";
import SpeciesList from "@/components/filteredSpecies/SpeciesList";
import { ArrowRight } from "@/components/icons/ArrowRight";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { usePathname, useRouter } from "next/navigation";
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

  const onSubmit = (data) => {
    updateExperimentalDesign({ step: currentStep, value: data });
    router.push("/dashboard/experimental-designs/create/step-3");
  };

  console.log(experimentalDesign);

  useEffect(() => {
    console.log("Chequeo si el paso ya se confirmó");
    if (experimentalDesign.length) {
      const hasValueBeenDeclared = experimentalDesign
        .filter((element) => element.step === currentStep)
        .at(0);
      if (hasValueBeenDeclared) {
        setValue("species", hasValueBeenDeclared.value.species);
        setFilteredSpecies("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const watchSpecies = watch("species");

  const handleSearch = (input) => {
    const results = biologicalModels.filter(
      ({ species, kingdom }) =>
        species.toLowerCase().includes(input.toLowerCase()) ||
        kingdom.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSpecies(results);
  };

  useEffect(() => {
    if (
      watchSpecies?.length > 2 &&
      watchSpecies.length !== selectedSpecies.length
    ) {
      setSelectedSpecies("");
      handleSearch(watchSpecies);
    } else {
      setFilteredSpecies("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSpecies]);

  const [filteredSpecies, setFilteredSpecies] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("");

  const selectSpecies = (selection) => {
    setSelectedSpecies(selection);
    setFilteredSpecies("");
    setValue("species", selection);
  };

  return (
    <div className={styles.container}>
      <Link
        href={{
          pathname: `/dashboard/experimental-designs/create/step-1`,
        }}
      >
        Volver <ArrowLeft />
      </Link>
      <Link
        href={{
          pathname: `/dashboard/experimental-designs/create/step-3`,
        }}
      >
        Siguiente <ArrowRight />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          {...register("species")}
          placeholder="Ingrese la especie o reino..."
        />
        {filteredSpecies.length ? (
          <SpeciesList list={filteredSpecies} action={selectSpecies} />
        ) : null}
        <input
          type="submit"
          value="Seleccionar"
          disabled={!selectedSpecies}
          className="button-primary"
        />
      </form>
    </div>
  );
};

export default CreateExperimentalDesignStepTwo;
