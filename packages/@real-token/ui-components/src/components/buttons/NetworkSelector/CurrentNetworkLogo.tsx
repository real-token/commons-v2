import { useCurrentNetwork } from "@real-token/core";

export function CurrentNetworkLogo() {
  const currentNetwork = useCurrentNetwork();
  if (!currentNetwork) {
    return <></>;
  }
  return (
    <currentNetwork.logo
      width={20}
      height={20}
      color="var(--mantine-color-brand)"
    />
  );
}
