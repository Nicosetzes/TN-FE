"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import NavLink from "./navLink/NavLink";

const links = [
  { title: "Home", path: "/" },
  { title: "Dashboard", path: "/dashboard" },
  { title: "Contact", path: "/contact" },
];

const Links = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const session = true;
  const isAdmin = true;

  return (
    <>
      <div className={styles.navbar}>
        {links.map((link) => (
          <NavLink key={link.path} item={link} />
        ))}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <button
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <Image src="/hamburger.svg" alt="" width={24} height={24} />
      </button>
      <div className={`${styles.navbarMobile} ${open ? styles.open : ""}`}>
        {links.map((link) => (
          <NavLink key={link.path} item={link} />
        ))}
        {session ? (
          <>
            {isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <button className={styles.logout}>Logout</button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
    </>
  );
};

export default Links;
