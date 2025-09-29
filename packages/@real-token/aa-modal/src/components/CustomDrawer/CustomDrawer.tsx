import classes from "./CustomDrawer.module.css";
import { Button, Flex, Paper, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

interface CustomDrawerProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const CustomDrawer = ({
  isOpen,
  onClose,
  title,
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
        {/** Header */}
        <Flex justify={title ? "space-between" : "flex-end"} align={"center"}>
          {title ? <Title order={3}>{title}</Title> : undefined}
          <Button
            onClick={onClose}
            variant={"transparent"}
            style={{ width: "fit-content" }}
          >
            <IconX size={24} />
          </Button>
        </Flex>
        {/** Content */}
        <div className={classes.content}>{children}</div>
      </Paper>
    </div>
  );
};
