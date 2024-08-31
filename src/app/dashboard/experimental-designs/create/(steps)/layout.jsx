"use client";

import styles from "./styles.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { ArrowRight } from "@/components/icons/ArrowRight";

const StepsLayout = ({ children }) => {
  const pathname = usePathname();

  const currentStep = Number(pathname.at(-1));

  return (
    <div className={styles.container}>
      {currentStep !== 1 && (
        <Link
          href={{
            pathname: `/dashboard/experimental-designs/create/step-${
              currentStep - 1
            }`,
          }}
        >
          <Button
            className={styles.arrowLeft}
            color="none"
            startContent={<ArrowLeft />}
          >
            Previous step
          </Button>
        </Link>
      )}
      {currentStep !== 5 && (
        <Link
          href={{
            pathname: `/dashboard/experimental-designs/create/step-${
              currentStep + 1
            }`,
          }}
        >
          <Button
            className={styles.arrowRight}
            color="none"
            endContent={<ArrowRight />}
          >
            Next step
          </Button>
        </Link>
      )}
      {children}
    </div>
  );
};

export default StepsLayout;
