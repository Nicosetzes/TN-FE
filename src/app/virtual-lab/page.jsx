"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { Search } from "@/components/icons/Search";
import { Dialog } from "@/components/icons/Dialog";
import { Users } from "@/components/icons/Users";
import { List } from "@/components/icons/List";
import { Star } from "@/components/icons/Star";
import { Tube } from "@/components/icons/Tube";
import styles from "./styles.module.css";
import Link from "next/link";

const DashboardPage = () => {
  const title = "Mi laboratorio"; // Vendrá del BE

  return (
    <>
      <ProtectedRoute>
        <div className={styles.title}>{title}</div>
        <div className={styles.container}>
          <Link className={styles.link} href="/virtual-lab/lines-of-research">
            Líneas de investigación <List size={24} />
          </Link>
          <Link
            className={styles.link}
            href="/virtual-lab/experimental-designs"
          >
            Diseños experimentales <Tube size={24} />
          </Link>
          <Link className={styles.link} href="/virtual-lab/social">
            Social <Users size={24} />
          </Link>
          <Link className={styles.link} href="/virtual-lab/search">
            Búsqueda <Search size={24} />
          </Link>
          <Link className={styles.link} href="/virtual-lab/highlighted-results">
            Resultados destacados <Star size={24} />
          </Link>
          <Link className={styles.link} href="/virtual-lab/discussion-board">
            Tablero de discusión <Dialog size={24} />
          </Link>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default DashboardPage;
