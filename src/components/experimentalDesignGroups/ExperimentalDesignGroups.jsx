import styles from "./styles.module.css";

const ExperimentalDesignGroups = ({ experimentalGroups, replicates }) => {
  console.log(experimentalGroups);

  console.log(replicates);

  return (
    <div className={styles.experimentalGroupsContainer}>
      {experimentalGroups?.map((combination, index) => (
        <div key={index} className={styles.experimentalGroup}>
          <div className={styles.title}>{combination.join(" ")}</div>
          <div className={styles.body}>
            {Array.from({ length: replicates }, (_, index) => (
              <div key={index}>Individuo</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperimentalDesignGroups;
