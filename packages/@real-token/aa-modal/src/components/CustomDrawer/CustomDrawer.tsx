import classes from "./CustomDrawer.module.css";
import { Paper } from "@mantine/core";

interface CustomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomDrawer = ({
  isOpen,
  onClose,
  children,
}: CustomDrawerProps) => {
  return (
    <div
      className={classes.wrapper}
      data-state={isOpen ? "open" : "closed"}
      onClick={onClose}
    >
      <Paper
        className={classes.drawer}
        data-state={isOpen ? "open" : "closed"}
        withBorder={true}
        radius="md"
      >
        <div className={classes.handle} onClick={onClose} />
        <div className={classes.content}>{children}</div>
      </Paper>
    </div>
  );
};
