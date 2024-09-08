import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import Link from "next/link";

const ExperimentalDesignOverview = ({ data, submit }) => {
  console.log(data);

  const pathname = usePathname();

  const keyFormatter = (key) => {
    if (key == "experimental_design_name") return "Título: ";
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

  const experimentalDesignConfirmation = () => {
    // const formData = new FormData();

    // formData.append(
    //   "experimental_design_name",
    //   data.find(({ key }) => key == "experimental_design_name").value
    // );
    // formData.append(
    //   "experimental_model",
    //   data.find(({ key }) => key == "experimental_model").value
    // );
    // formData.append("response_variables", {
    //   name: data.find(({ key }) => key == "response_variable").value,
    //   unit: null,
    // });
    // formData.append(
    //   "explanatory_variables",
    //   data
    //     .find(({ key }) => key == "explanatory_variables")
    //     .value.map(({ levels, value }) => {
    //       name: value, levels;
    //     })
    // );
    // formData.append(
    //   "sampling_unit",
    //   data.find(({ key }) => key == "sampling_unit").value
    // );
    // formData.append(
    //   "biological_replicates",
    //   data.find(({ key }) => key == "biological_replicates").value
    // );
    // formData.append(
    //   "technical_replicates",
    //   data.find(({ key }) => key == "technical_replicates").value
    // );
    // formData.append(
    //   "total_repetitions",
    //   data.find(({ key }) => key == "total_repetitions").value
    // );
    // formData.append("prueba", [1, 2, 3]);

    // console.log({
    //   experimental_design_name: formData.get("experimental_design_name"),
    //   experimental_model: formData.get("experimental_model"),
    //   response_variables: formData.get("response_variables"),
    //   explanatory_variables: formData.get("explanatory_variables"),
    //   sampling_unit: formData.get("sampling_unit"),
    //   biological_replicates: formData.get("biological_replicates"),
    //   technical_replicates: formData.get("technical_replicates"),
    //   total_repetitions: formData.get("total_repetitions"),
    //   prueba: formData.get("prueba"),
    // });

    console.log(
      JSON.stringify({
        experimental_design_name: data.find(
          ({ key }) => key == "experimental_design_name"
        ).value,
        experimental_model: data.find(({ key }) => key == "experimental_model")
          .value,
        response_variables: [
          {
            name: data.find(({ key }) => key == "response_variable").value,
            unit: null,
          },
        ],
        explanatory_variables: data
          .find(({ key }) => key == "explanatory_variables")
          .value.map(({ levels, value }) => {
            return { name: value, levels: levels.map(({ value }) => value) };
          }),
        sampling_unit: data.find(({ key }) => key == "sampling_unit").value,
        biological_replicates: data.find(
          ({ key }) => key == "biological_replicates"
        ).value,
        technical_replicates: data.find(
          ({ key }) => key == "technical_replicates"
        ).value,
        total_repetitions: data.find(({ key }) => key == "total_repetitions")
          .value,
      })
    );
  };

  return (
    <>
      <div className={styles.container}>
        {data.map(({ step, key, value }) => (
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
                            {!index == levels.length - 1 && ", "}
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
