import { ButtonHTMLAttributes, FC } from "react";
import "./button.module.scss";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};
