import { ActionIconProps, ActionIcon } from "@mantine/core";
import classes from "./Buttons.module.css";

interface ModalButtonCompactProps extends ActionIconProps {
  onClick?: () => void;
  className?: string;
}
export const ModalButtonCompact = ({
  onClick,
  className,
  ...props
}: ModalButtonCompactProps) => {
  return (
    <ActionIcon
      {...props}
      classNames={{
        root: `${classes.root} ${className}`,
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      {props.children}
    </ActionIcon>
  );
};
