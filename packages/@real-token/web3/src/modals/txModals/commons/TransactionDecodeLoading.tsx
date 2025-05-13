import { Flex, Skeleton } from "@mantine/core";

interface TransactionDecodeLoadingProps {
  loading: boolean;
}
export const TransactionDecodeLoading = ({
  loading,
}: TransactionDecodeLoadingProps) => {
  return (
    <Flex direction={"column"} gap={"md"}>
      <Skeleton h={50} w={"100%"} />
      <Skeleton h={30} w={"100%"} />
      <Flex direction={"column"} gap={"xs"}>
        <Flex justify={"space-between"} gap={"sm"}>
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"100%"} />
        </Flex>
        <Flex justify={"space-between"} gap={"sm"}>
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"100%"} />
        </Flex>
        <Flex justify={"space-between"} gap={"sm"}>
          <Skeleton h={20} w={"100%"} />
          <Skeleton h={20} w={"100%"} />
        </Flex>
      </Flex>
      <Skeleton h={100} w={"100%"} />
      <Flex justify={"space-between"} gap={"sm"}>
        <Skeleton h={50} w={"100%"} />
        <Skeleton h={50} w={"100%"} />
      </Flex>
    </Flex>
  );
};
