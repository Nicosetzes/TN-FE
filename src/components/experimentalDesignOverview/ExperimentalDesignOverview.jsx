import ExperimentalDesignGroups from "../experimentalDesignGroups/ExperimentalDesignGroups";
import { usePathname } from "next/navigation";
import styles from "./styles.module.css";

const ExperimentalDesignOverview = ({ data, submit }) => {
  const pathname = usePathname();

  const experimentalDesign = {
    name: data.find(({ key }) => key == "name")?.value,
    experimental_model: data.find(({ key }) => key == "experimental_model")
      ?.value,
    response_variables: [
      {
        name: data.find(({ key }) => key == "response_variable")?.value,
        unit: null,
      },
    ],
    explanatory_variables: data
      .find(({ key }) => key == "explanatory_variables")
      ?.value.map(({ levels, value }) => {
        return { name: value, levels: levels.map(({ value }) => value) };
      }),
    sampling_unit: data.find(({ key }) => key == "sampling_unit")?.value,
    biological_replicates: data.find(
      ({ key }) => key == "biological_replicates"
    )?.value,
    technical_replicates: data.find(({ key }) => key == "technical_replicates")
      ?.value,
    total_repetitions: data.find(({ key }) => key == "total_repetitions")
      ?.value,
  };

  const keyFormatter = (key) => {
    if (key == "name") return "Título: ";
    else if (key == "experimental_model") return "Modelo experimental: ";
    else if (key == "response_variable") return "Variable respuesta: ";
    else if (key.includes("explanatory"))
      return `Variable explicatoria ${key.at(-1)}: `;
    else if (key == "sampling_unit") return "Unidad muestral: ";
    else if (key == "biological_replicates")
      return "Número de réplicas biológicas: ";
    else if (key == "technical_replicates")
      return "Número de réplicas técnicas: ";
    else return "Repeticiones totales: ";
  };

  console.log(experimentalDesign);

  const experimentalDesignConfirmation = () => {
    const experimentalDesignForBE = JSON.stringify(experimentalDesign);

    console.log(experimentalDesignForBE);
  };

  const obtainExplanatoryVariableLevelsCombinations = () => {
    const { explanatory_variables } = experimentalDesign;

    console.log(explanatory_variables);

    if (explanatory_variables) {
      const levelCombinations = explanatory_variables
        .map((variable) => variable.levels?.map((level) => level))
        .reduce(
          (acc, array) => {
            return acc.flatMap((accItem) =>
              array.map((arrayItem) => [...accItem, arrayItem])
            );
          },
          [[]]
        );

      return levelCombinations;
    } else return null;
  };

  return (
    <>
      <div className={styles.container}>
        {data.map(({ key, value }) => (
          <div key={key} className={styles.category}>
            <div>
              {Array.isArray(value) ? (
                <ul>
                  {value.map(({ name, value, levels }) => (
                    <li key={name}>
                      {`${keyFormatter(name)} ${value}`}
                      {levels?.length ? ` (` : null}
                      {levels &&
                        levels.map(({ name, value }, index) => (
                          <span key={name}>
                            {`${value}`}
                            {index != levels.length - 1 && ", "}
                          </span>
                        ))}
                      {levels?.length ? `)` : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  {keyFormatter(key)}
                  {key == "experimental_model" ? (
                    <i>{value}</i>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {experimentalDesign.explanatory_variables?.at(0).levels.length &&
      experimentalDesign.biological_replicates ? (
        <ExperimentalDesignGroups
          experimentalGroups={obtainExplanatoryVariableLevelsCombinations()}
          replicates={experimentalDesign.biological_replicates}
        />
      ) : null}
      <button
        onClick={experimentalDesignConfirmation}
        className="button-primary"
      >
        Confirmar
      </button>
    </>
  );
};

export default ExperimentalDesignOverview;
