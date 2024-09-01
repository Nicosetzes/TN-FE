import Link from "next/link";
import styles from "./styles.module.css";

const ExperimentalDesignsPage = () => {
  return (
    <>
      <Link href="/dashboard/experimental-designs/1">
        Diseño experimental 1
      </Link>
      <div className={styles.container}>
        <Link
          className="button-primary"
          href="/dashboard/experimental-designs/create"
        >
          Crear nuevo
        </Link>
      </div>
    </>
  );
};

export default ExperimentalDesignsPage;
