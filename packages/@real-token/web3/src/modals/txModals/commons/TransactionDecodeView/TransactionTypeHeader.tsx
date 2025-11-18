import { Card, Flex, Text } from "@mantine/core";

interface TransactionTypeHeaderProps {
  type: string;
}
export const TransactionTypeHeader = ({ type }: TransactionTypeHeaderProps) => {
  return (
    <Card.Section px={"sm"} py={"xs"} withBorder>
      <Flex justify={"space-between"} align={"center"}>
        <Text fw={600} fz={20}>
          {type}
        </Text>
        {/* <Button
          variant={"transparent"}
          rightSection={<IconArrowRight size={16} />}
        >
          {"View raw"}
        </Button> */}
      </Flex>
    </Card.Section>
  );
};
