"use client";

import { createContext, useContext, useState } from "react";

const ExperimentalDesignContext = createContext();

export const useExperimentalDesign = () =>
  useContext(ExperimentalDesignContext);

export const ExperimentalDesignProvider = ({ children }) => {
  const [experimentalDesign, setExperimentalDesign] = useState([]);

  const updateExperimentalDesign = ({ step, key, value }) => {
    const isStepInExperimentalDesign = experimentalDesign.filter(
      (element) => element.step === step
    );

    if (!isStepInExperimentalDesign.length) {
      console.log("Agrego nuevo");
      setExperimentalDesign([...experimentalDesign, { step, key, value }]);
    } else {
      const updatedExperimentalDesign = experimentalDesign.map((element) => {
        console.log("Modifico");
        if (element.step === step) {
          return { ...element, key, value };
        }
        return element;
      });
      setExperimentalDesign(updatedExperimentalDesign);
    }
  };

  return (
    <ExperimentalDesignContext.Provider
      value={{
        experimentalDesign,
        setExperimentalDesign,
        updateExperimentalDesign,
      }}
    >
      {children}
    </ExperimentalDesignContext.Provider>
  );
};
