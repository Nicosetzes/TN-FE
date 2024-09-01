"use client";

import { createContext, useContext, useState } from "react";

const ExperimentalDesignContext = createContext();

export const useExperimentalDesign = () =>
  useContext(ExperimentalDesignContext);

export const ExperimentalDesignProvider = ({ children }) => {
  const [experimentalDesign, setExperimentalDesign] = useState([]);

  const [state, setState] = useState("Estado inicial");
  console.log("Current State:", state);

  const updateExperimentalDesign = ({ step, value }) => {
    const isStepInExperimentalDesign = experimentalDesign.filter(
      (element) => element.step === step
    );

    if (!isStepInExperimentalDesign.length) {
      console.log("Agrego nuevo");
      setExperimentalDesign([...experimentalDesign, { step, value }]);
    } else {
      const updatedExperimentalDesign = experimentalDesign.map((element) => {
        console.log("Modifico");
        if (element.step === step) {
          return { ...element, value };
        }
        return element;
      });
      setExperimentalDesign(updatedExperimentalDesign);
    }
  };

  return (
    <ExperimentalDesignContext.Provider
      value={{ experimentalDesign, updateExperimentalDesign }}
    >
      {children}
    </ExperimentalDesignContext.Provider>
  );
};
