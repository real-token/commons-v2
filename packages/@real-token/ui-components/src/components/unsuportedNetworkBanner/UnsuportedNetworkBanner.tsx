import { useTranslation } from "react-i18next";
import {
  useRealTokenUIConfig,
  useIsUnsuportedNetwork,
  useGetNetworkById,
} from "@real-token/core";
import { useSwitchChain } from "wagmi";
import { Flex, FlexProps } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import clsx from "clsx";
import classes from "./UnsuportedNetworkBanner.module.css";

export function UnsuportedNetworkBanner({ ...props }: FlexProps) {
  const { t } = useTranslation("common", { keyPrefix: "header" });

  const { defaultNetworkId } = useRealTokenUIConfig();
  const { switchChain } = useSwitchChain();

  const defaultNetworkConfig = useGetNetworkById(Number(defaultNetworkId));

  const isUnsuportedNetwork = useIsUnsuportedNetwork();
  if (!isUnsuportedNetwork || !defaultNetworkConfig) {
    return null;
  }

  return (
    <Flex gap={4} className={clsx(classes.banner, props.className)} {...props}>
      <IconAlertCircle
        size={20}
        aria-label={"Network"}
        style={{ marginRight: "8px" }}
      />
      <div>
        {t("notAllowedNetwork")}
        <span
          onClick={() =>
            switchChain({
              chainId: Number(defaultNetworkId),
            })
          }
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {t("switchNetwork", {
            networkName: defaultNetworkConfig.displayName,
          })}
        </span>
      </div>
    </Flex>
  );
}
