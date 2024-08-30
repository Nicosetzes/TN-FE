import Links from "./links/Links";
import styles from "./styles.module.css";

const Navbar = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>LOGO</div>
      <Links />
    </div>
  );
};

export default Navbar;
