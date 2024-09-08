"use client";

import { MinusSign } from "@/components/icons/MinusSign";
import { PlusSign } from "@/components/icons/PlusSign";
import { AlertCircle } from "../icons/AlertCircle";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const ExplanatoryVariableContainer = ({ id, explanatory_variable }) => {
  const {
    formState: { errors },
    register,
    setValue,
    watch,
  } = useFormContext(); // useFormContext me permite conectar con el formulario del /step correspondiente

  const [isThirdRowOpen, setIsThirdRowOpen] = useState(false);
  const [isFourthRowOpen, setIsFourthRowOpen] = useState(false);
  const [isFifthRowOpen, setIsFifthRowOpen] = useState(false);

  const firstLevel = `explanatory_variable_level_${id}1`;
  const secondLevel = `explanatory_variable_level_${id}2`;
  const thirdLevel = `explanatory_variable_level_${id}3`;
  const fourthLevel = `explanatory_variable_level_${id}4`;
  const fifthLevel = `explanatory_variable_level_${id}5`;

  const watchFirstLevel = watch(firstLevel);
  const watchSecondLevel = watch(secondLevel);
  const watchThirdLevel = watch(thirdLevel);
  const watchFourthLevel = watch(fourthLevel);
  const watchFifthLevel = watch(fifthLevel);

  useEffect(() => {
    if (watchThirdLevel) setIsThirdRowOpen(true);
    if (watchFourthLevel) setIsFourthRowOpen(true);
    if (watchFifthLevel) setIsFifthRowOpen(true);
  }, [watchThirdLevel, watchFourthLevel, watchFifthLevel]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{`Variable: ${explanatory_variable}`}</div>
        <div>{"Presioná el botón para agregar un nuevo nivel (máx 5)"}</div>
      </div>
      <div className={styles.containerRow}>
        <AlertCircle size={32} className={styles.alertCircle} />
        <input {...register(firstLevel)} placeholder="Requerida" />
      </div>
      <div className={styles.containerCustomError}>
        {errors?.[firstLevel]?.message}
      </div>
      <div className={styles.containerRow}>
        <AlertCircle size={32} className={styles.alertCircle} />
        <input {...register(secondLevel)} placeholder="Requerida" />
      </div>
      <div className={styles.containerCustomError}>
        {errors?.[secondLevel]?.message}
      </div>
      <div className={styles.containerRow}>
        {!isThirdRowOpen ? (
          <PlusSign
            size={32}
            className={styles.plusSign}
            onClick={() => {
              watchFirstLevel &&
                watchSecondLevel &&
                setIsThirdRowOpen(!isThirdRowOpen);
            }}
          />
        ) : (
          <>
            <MinusSign
              size={32}
              className={styles.minusSign}
              onClick={() => {
                setIsThirdRowOpen(!isThirdRowOpen);
                setIsFourthRowOpen(false);
                setIsFifthRowOpen(false);
                setValue(thirdLevel, undefined);
                setValue(fourthLevel, undefined);
                setValue(fifthLevel, undefined);
              }}
            />
            <input
              {...register(thirdLevel)}
              placeholder="Ingrese una categoría"
            />
          </>
        )}
      </div>
      <div className={styles.containerCustomError}>
        {errors?.[thirdLevel]?.message}
      </div>
      {isThirdRowOpen && (
        <div className={styles.containerRow}>
          {!isFourthRowOpen ? (
            <PlusSign
              size={32}
              className={styles.plusSign}
              onClick={() =>
                watchThirdLevel && setIsFourthRowOpen(!isFourthRowOpen)
              }
            />
          ) : (
            <>
              <MinusSign
                size={32}
                className={styles.minusSign}
                onClick={() => {
                  setIsFourthRowOpen(!isFourthRowOpen);
                  setIsFifthRowOpen(!isFifthRowOpen);
                  setValue(fourthLevel, undefined);
                  setValue(fifthLevel, undefined);
                }}
              />
              <input
                {...register(fourthLevel)}
                placeholder="Ingrese una categoría"
              />
            </>
          )}
        </div>
      )}
      <div className={styles.containerCustomError}>
        {errors?.[fourthLevel]?.message}
      </div>
      {isFourthRowOpen && (
        <div className={styles.containerRow}>
          {!isFifthRowOpen ? (
            <PlusSign
              size={32}
              className={styles.plusSign}
              onClick={() =>
                watchFourthLevel && setIsFifthRowOpen(!isFifthRowOpen)
              }
            />
          ) : (
            <>
              <MinusSign
                size={32}
                className={styles.minusSign}
                onClick={() => {
                  setIsFifthRowOpen(!isFifthRowOpen);
                  setValue(fifthLevel, undefined);
                }}
              />
              <input
                {...register(fifthLevel)}
                placeholder="Ingrese una categoría"
              />
            </>
          )}
        </div>
      )}
      <div className={styles.containerCustomError}>
        {errors?.[fifthLevel]?.message}
      </div>
    </div>
  );
};

export default ExplanatoryVariableContainer;
