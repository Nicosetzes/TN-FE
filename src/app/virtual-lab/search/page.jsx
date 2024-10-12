import styles from "./styles.module.css";
import Link from "next/link";

const SearchPage = () => {
  return (
    <div className={styles.container}>
      <div>Búsqueda</div>
      <Link className="button-primary" href="/virtual-lab">
        Volver
      </Link>
    </div>
  );
};

export default SearchPage;
