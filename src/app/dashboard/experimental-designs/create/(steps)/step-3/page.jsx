import { ArrowRight } from "@/components/icons/ArrowRight";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import styles from "./styles.module.css";
import Link from "next/link";

const CreateExperimentalDesignStepThree = () => {
  return (
    <div className={styles.container}>
      <Link
        href={{
          pathname: `/dashboard/experimental-designs/create/step-2`,
        }}
      >
        Volver <ArrowLeft />
      </Link>
      <Link
        href={{
          pathname: `/dashboard/experimental-designs/create/step-4`,
        }}
      >
        Siguiente <ArrowRight />
      </Link>
    </div>
  );
};

export default CreateExperimentalDesignStepThree;
