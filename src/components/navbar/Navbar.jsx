import Links from "./links/Links";
import styles from "./styles.module.css";
import { auth } from "@/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>LOGO</div>
      <Links session={session} />
    </div>
  );
};

export default Navbar;
