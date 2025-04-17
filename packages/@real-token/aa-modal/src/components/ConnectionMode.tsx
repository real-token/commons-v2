import { useMemo, useState } from "react";
import { CONNECTION_MODE, connectionModeOptions } from "../types";
import { Tabs } from "@mantine/core";
import { AaModalConfig } from "../types/aaModalConfig";
import { AaConnectionModePanel } from "./connectionModePanel/AaConnectionModePanel/AaConnectionModePanel";
import { ExternalConnectionModelPanel } from "./connectionModePanel/ExternalConnectionModelPanel/ExternalConnectionModelPanel";

export const ConnectionMode = ({ config }: { config: AaModalConfig }) => {
  const { connectionMode } = config;

  const [value, setValue] = useState<CONNECTION_MODE>(CONNECTION_MODE.aa);

  const displayedOptions: CONNECTION_MODE[] = useMemo(() => {
    return Object.keys(connectionMode ?? {})
      .map((key) => key as CONNECTION_MODE)
      .filter(
        (key) =>
          config.connectionMode?.[key].connectorsName.length > 0 &&
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
            config={config.connectionMode[CONNECTION_MODE.aa]}
          />,
        ],
        [
          CONNECTION_MODE.external,
          <ExternalConnectionModelPanel
            config={config.connectionMode[CONNECTION_MODE.external]}
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
            {
              connectionModeOptions[
                option as keyof typeof connectionModeOptions
              ]
            }
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
