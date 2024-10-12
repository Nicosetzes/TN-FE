import styles from "./styles.module.css";
import Link from "next/link";

const SocialPage = () => {
  return (
    <div className={styles.container}>
      <div>Social (carta de presentación)</div>
      <Link className="button-primary" href="/virtual-lab">
        Volver
      </Link>
    </div>
  );
};

export default SocialPage;
