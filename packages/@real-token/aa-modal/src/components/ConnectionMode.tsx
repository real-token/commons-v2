import { useMemo, useState } from "react";
import { CONNECTION_MODE, connectionModeOptions } from "../types";
import { Tabs } from "@mantine/core";
import { AaModalConfig } from "../types/aaModalConfig";
import { AaConnectionModePanel } from "./connectionModePanel/AaConnectionModePanel/AaConnectionModePanel";
import { ExternalConnectionModelPanel } from "./connectionModePanel/ExternalConnectionModelPanel/ExternalConnectionModelPanel";
import { ParsedConnectorsConfig } from "../hooks/useParsedConnectorsConfig";
import { useTranslation } from "react-i18next";

export const ConnectionMode = ({
  config,
  parsedConnectorsConfig,
}: {
  config: AaModalConfig;
  parsedConnectorsConfig: ParsedConnectorsConfig;
}) => {
  const { t } = useTranslation("main");
  const [value, setValue] = useState<CONNECTION_MODE>(CONNECTION_MODE.aa);

  const displayedOptions: CONNECTION_MODE[] = useMemo(() => {
    return Object.keys(config.connectionModeVisibility ?? {})
      .map((key) => key as CONNECTION_MODE)
      .filter(
        (key) =>
          config.connectionModeVisibility?.[key] &&
          config.connectionModeVisibility?.[
            key as keyof typeof config.connectionModeVisibility
          ]
      );
  }, [config]);

  const connectionModePanel: Map<CONNECTION_MODE, React.ReactNode> =
    useMemo(() => {
      return new Map([
        [
          CONNECTION_MODE.aa,
          <AaConnectionModePanel
            config={config.connectionModeConfig[CONNECTION_MODE.aa]}
            socialsConnectors={parsedConnectorsConfig.aa_socials}
            advancedConnectors={parsedConnectorsConfig.aa_advanced}
          />,
        ],
        [
          CONNECTION_MODE.external,
          <ExternalConnectionModelPanel
            connectors={parsedConnectorsConfig.external}
            config={config.connectionModeConfig[CONNECTION_MODE.external]}
          />,
        ],
        [CONNECTION_MODE.tba, <></>],
      ]);
    }, [config]);

  if (displayedOptions.length == 1) {
    return connectionModePanel.get(displayedOptions[0]);
  }

  return (
    <Tabs
      value={value}
      onChange={(value) => setValue(value as CONNECTION_MODE)}
      defaultValue={CONNECTION_MODE.aa}
      w={"100%"}
      variant="pills"
      radius="md"
    >
      <Tabs.List>
        {displayedOptions.map((option) => (
          <Tabs.Tab key={option} value={option}>
            {t(
              connectionModeOptions[
                option as keyof typeof connectionModeOptions
              ]
            )}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {displayedOptions.map((option) => (
        <Tabs.Panel key={option} value={option} mt={"md"}>
          {connectionModePanel.get(option)}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
