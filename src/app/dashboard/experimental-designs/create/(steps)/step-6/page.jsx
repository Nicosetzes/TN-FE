"use client";

import { ArrowLeft } from "@/components/icons/ArrowLeft";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const CreateExperimentalDesignStepSix = () => {
  return (
    <motion.div className={styles.container}>
      <Link
        href="/dashboard/experimental-designs/create/step-5"
        className={styles.arrowLeft}
      >
        Volver <ArrowLeft size={36} />
      </Link>
      <div>Este es el paso 6</div>
    </motion.div>
  );
};

export default CreateExperimentalDesignStepSix;
