import { Button, Pill } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { useCurrentNetwork } from "@real-token/core";

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

  // const networkConfig = useCurrentNetwork();

  // const chainId = useV2RootStore((state) => state.chainId);

  // const hideButton =
  //   process.env.NEXT_PUBLIC_NODE_ENV === "production"
  //     ? // hide button in prod if not gnosis
  //       chainId !== "0x64"
  //     : // hide button in dev if not sepolia or gnosis
  //       !(chainId == "0xaa36a7" || chainId == "0x64");

  // if (hideButton) return <></>;

  return (
    <Button
      color="#156CAB"
      leftSection={
        <img src={"wallet-connect.svg"} width={16} alt="wallet connect" />
      }
      onClick={() => openModal()}
      rightSection={<TxToValidate count={txs.wc.length} />}
    >
      {"WalletConnect"}
    </Button>
  );
};
