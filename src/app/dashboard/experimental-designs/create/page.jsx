"use client";

import styles from "./styles.module.css";
import Link from "next/link";

const CreateExperimentalDesignPage = () => {
  return (
    <div className={styles.container}>
      <p>
        Te haremos una serie de preguntas para generar tu diseño experimental
      </p>
      <Link
        href="/dashboard/experimental-designs/create/step-1"
        className="button-primary"
      >
        Comenzar
      </Link>
    </div>
  );
};

export default CreateExperimentalDesignPage;
