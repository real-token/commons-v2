import { Flex, Text } from "@mantine/core";
import {
  IconCircleArrowLeftFilled,
  IconCircleArrowRightFilled,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { SessionTypes } from "@walletconnect/types";

interface WcTxManagerModalHeaderProps {
  nbrOfTx: number;
  index: number;
  setIndex: (index: number) => void;
  currentSession: SessionTypes.Struct | undefined;
}
export const WcTxManagerModalHeader = ({
  nbrOfTx,
  index,
  setIndex,
  currentSession,
}: WcTxManagerModalHeaderProps) => {
  return (
    <Flex direction={"column"} gap={"sm"}>
      <Flex justify={"space-between"} w={"100%"}>
        {nbrOfTx > 1 ? (
          <Flex gap={"xs"} align={"center"}>
            <IconCircleArrowLeftFilled
              fill="#156CAB"
              onClick={() => setIndex(index - 1)}
              style={{
                cursor: "pointer",
                visibility: index == 0 ? "hidden" : "visible",
              }}
            />
            <Text fw={600} fz={18}>{`${index + 1}/${nbrOfTx}`}</Text>
            <IconCircleArrowRightFilled
              fill="#156CAB"
              onClick={() => setIndex(index + 1)}
              style={{
                cursor: "pointer",
                visibility: index == nbrOfTx - 1 ? "hidden" : "visible",
              }}
            />
          </Flex>
        ) : undefined}
      </Flex>
      {currentSession ? (
        <Flex gap={"xs"} align={"center"}>
          <img
            src={`${currentSession?.peer.metadata.url}/favicon.ico`}
            alt={`${currentSession?.peer.metadata.name} logo`}
            style={{ width: 24, height: 24 }}
          />
          {currentSession?.peer.metadata.name}
        </Flex>
      ) : undefined}
    </Flex>
  );
};
