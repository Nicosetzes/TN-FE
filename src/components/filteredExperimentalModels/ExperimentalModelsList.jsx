import styles from "./styles.module.css";
import { AnimatePresence, motion } from "framer-motion";

const ExperimentalModelsList = ({ list, action }) => {
  const isOpen = list.length ? true : false;

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          exit="exit"
          className={styles.container}
        >
          {list.map(({ commonName, species }) => (
            <div
              key={species}
              onClick={() => action(species)}
              className={styles.listElement}
            >
              {<i>{species}</i>} {`(${commonName})`}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExperimentalModelsList;
