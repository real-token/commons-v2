import { Flex, Text, Menu, Avatar, Paper, Indicator } from "@mantine/core";
import { useAA } from "@real-token/aa-core";
import { useAccount } from "wagmi";
import { useQuery } from "wagmi/query";
import { useIsAA } from "@real-token/web3";

interface RkDetails {
  id: string;
  name: string;
  icon: string;
  iconUrl: () => Promise<string>;
  iconAccent?: string;
  iconBackground?: string;
}

export const CurrentConnectorMenuItem = () => {
  const { getUserInfo, walletAddress } = useAA();
  const { connector } = useAccount();

  const isAA = useIsAA();

  const { data: userInfo } = useQuery<any, Error, any, any>({
    queryKey: ["user-info", walletAddress],
    enabled: isAA,
    queryFn: async () => {
      const userInfo = await getUserInfo();
      return userInfo;
    },
  });

  const connectorInfo = connector?.rkDetails as RkDetails;
  const { data: icon } = useQuery<string, Error, string, string[]>({
    queryKey: ["current-connector-icon", connectorInfo.id],
    queryFn: async () => {
      if (connectorInfo.iconUrl instanceof Function) {
        const iconUrl = await connectorInfo.iconUrl();
        return iconUrl;
      }
      return connectorInfo.iconUrl;
    },
  });

  if (!connectorInfo) return <></>;

  // TODO: add render function for TBA account

  if (isAA) {
    return (
      <Menu.Item p={0}>
        <Paper p={"sm"}>
          <Flex
            direction={"column"}
            gap={4}
            align="center"
            justify="space-between"
            w="100%"
          >
            <Flex gap={4} align="center">
              <Indicator
                label={
                  <img
                    style={{
                      width: 15,
                      height: 15,
                    }}
                    src={icon}
                    alt={userInfo?.typeOfLogin}
                  />
                }
                color={"black"}
                size={20}
                position="top-start"
              >
                <Avatar
                  size={30}
                  src={userInfo?.profileImage}
                  alt={userInfo?.name}
                />
              </Indicator>
              <Flex direction="column" gap={2}>
                <Text fw={500} fz={"md"}>
                  {userInfo?.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {userInfo?.email}
                </Text>
              </Flex>
            </Flex>
            <Text fz={10} c="dimmed">
              Powered by RealToken wallet
            </Text>
          </Flex>
        </Paper>
      </Menu.Item>
    );
  }

  return (
    <Menu.Item p={0}>
      <Paper p={"sm"}>
        <Flex gap={"sm"} align={"center"}>
          {icon && <Avatar size={26} src={icon} alt={connector?.name} />}
          <Text>{connector?.name}</Text>
        </Flex>
      </Paper>
    </Menu.Item>
  );
};
