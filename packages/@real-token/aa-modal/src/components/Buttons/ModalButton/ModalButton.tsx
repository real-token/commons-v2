import { ButtonProps, Button } from "@mantine/core";
import classes from "./Buttons.module.css";
import clsx from "clsx";

interface ModalButtonProps extends ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: {
    root?: string;
    label?: string;
    inner?: string;
  };
  variant?: "default" | "compact";
}
export const ModalButton = ({
  children,
  onClick,
  className,
  classNames,
  variant = "default",
  ...props
}: ModalButtonProps) => {
  return (
    <Button
      {...props}
      classNames={{
        root: clsx(classes.root, classNames?.root),
        label: clsx(classes.label, classNames?.label),
        inner: clsx(classes.inner, classNames?.inner),
      }}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
      }}
    >
      {children}
    </Button>
  );
};
