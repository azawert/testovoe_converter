import { FC } from "react";
import styles from "./loader.module.scss";

export const Loader: FC = () => {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
};
