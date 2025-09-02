import { Button, Pill } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { useChainId } from "wagmi";
import WalletConnectIcon from "./wallet-connect.svg";

interface TxToValidateProps {
  count: number;
}
const TxToValidate = ({ count }: TxToValidateProps) => {
  if (count == 0) return <></>;
  return <Pill>{count}</Pill>;
};

export const AaWalletConnectButton = () => {
  const { txs } = useAA();

  const openModal = () => {
    modals.openContextModal({
      modal: "walletConnect",
      innerProps: {},
    });
  };

  const chainId = useChainId();
  console.log("chainId", chainId);

  const hideButton =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? // hide button in prod if not gnosis
        chainId !== 100
      : // hide button in dev if not sepolia or gnosis
        !(chainId == 11155111 || chainId == 100);

  if (hideButton) return <></>;

  return (
    <Button
      color="#156CAB"
      leftSection={
        <img src={WalletConnectIcon} width={16} alt="wallet connect" />
      }
      onClick={() => openModal()}
      rightSection={<TxToValidate count={txs.wc.length} />}
    >
      {"WalletConnect"}
    </Button>
  );
};
