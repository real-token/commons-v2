import { useEffect } from "react";
import { modals } from "@mantine/modals";
import { useAA } from "@real-token/aa-core";
import { useIsAA } from "./useIsAA";

export const useCheckSdkIsLastVersion = () => {
  const { sdkVersion, latestSdkVersion, isWatching } = useAA();
  const isAA = useIsAA();

  // const publicClient = usePublicClient();

  // const { data: isAaAddress, isLoading: isAaAddressLoading } = useQuery({
  //   queryKey: ["isAaAddress", isAA],
  //   enabled: publicClient != null && isWatching && !!walletAddress,
  //   queryFn: async () => {
  //     if (!isAA || !publicClient || !walletAddress) return false;
  //     const code = await publicClient.getCode({ address: walletAddress });
  //     return code && code !== "0x";
  //   },
  // });

  useEffect(() => {
    if (isWatching || !isAA || sdkVersion === latestSdkVersion) return;
    modals.openContextModal({
      modal: "notUsingLastSdkVersion",
      innerProps: {},
    });
  }, [sdkVersion, latestSdkVersion, isAA, isWatching]);
};
