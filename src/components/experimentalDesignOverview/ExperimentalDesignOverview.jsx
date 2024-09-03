import { usePathname } from "next/navigation";
import styles from "./styles.module.css";
import Link from "next/link";

const ExperimentalDesignOverview = ({ data, submit }) => {
  console.log(data);

  const pathname = usePathname();

  return (
    <div className={styles.container}>
      {data.map(({ step, key, value }) => (
        <div key={key} className={styles.category}>
          <div>
            {Array.isArray(value) ? (
              <ul>
                {value.map(({ name, value, levels }) => (
                  <li key={name}>
                    {`${name}: ${value} `}
                    {levels &&
                      levels.map(({ name, value }) => (
                        <span key={name}>{`(${value})`}</span>
                      ))}
                  </li>
                ))}
              </ul>
            ) : (
              <div>{`${key}: ${value}`}</div>
            )}
          </div>
          <Link href={`${pathname}/step-${step}`} className="button-primary">
            Modificar
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ExperimentalDesignOverview;
