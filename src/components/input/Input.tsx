import { FC, InputHTMLAttributes, forwardRef } from "react";
import styles from "./input.module.scss";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  ...rest
}) => {
  return <input {...rest} className={styles.input} value={value} />;
};
