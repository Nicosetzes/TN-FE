import styles from "./styles.module.css";
import Link from "next/link";

const LinesOfReseachPage = () => {
  return (
    <div className={styles.container}>
      <div>Líneas de investigación</div>
      <Link className="button-primary" href="/virtual-lab">
        Volver
      </Link>
    </div>
  );
};

export default LinesOfReseachPage;
