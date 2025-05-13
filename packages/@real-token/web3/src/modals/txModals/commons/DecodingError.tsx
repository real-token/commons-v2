import { Button, Flex, Text } from "@mantine/core";

export const DecodingError = ({ refetch }: { refetch: () => void }) => {
  return (
    <Flex direction={"column"} gap={"md"} justify={"center"} p="md">
      <Text fw={700} size="lg" c="red">
        Decoding API not available
      </Text>
      <Text c="dimmed" fs="italic">
        {
          "If you trust the origin, you can proceed with blind signing the transaction at your own risk"
        }
      </Text>
      <Text size="xs" c="dimmed" mt={5}>
        {"Always verify the source before signing unknown transactions"}
      </Text>
      <Button onClick={() => refetch()}>{"Retry"}</Button>
    </Flex>
  );
};
