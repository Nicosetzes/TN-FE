import styles from "./styles.module.css";

const CreateExperimentalDesignPage = () => {
  return (
    <div>
      <div>Crear diseño experimental</div>
      <div className={styles.container}>
        <p>
          Te haremos una serie de preguntas para generar tu diseño experimental
        </p>
        <button className="button-primary">Comenzar</button>
      </div>
    </div>
  );
};

export default CreateExperimentalDesignPage;
