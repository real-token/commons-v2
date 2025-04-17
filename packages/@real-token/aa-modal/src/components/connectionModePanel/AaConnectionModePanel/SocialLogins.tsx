import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Flex, SimpleGrid, Text } from "@mantine/core";
import { SocialCustomButton } from "../../SocialCustomButton";
import { ModalButtonCompact } from "../../Buttons/ModalButton/ModalButtonCompact";
import { LoginConfig } from "@real-token/aa-core";

type LoginProvider = keyof LoginConfig;

const MAX_PROVIDERS_SHOWN = 4;

interface SocialLoginsProps {
  connectors: LoginProvider[];
  forceWallet?: any;
}
export const SocialLogins = ({
  connectors,
  forceWallet,
}: SocialLoginsProps) => {
  if (!connectors) return null;

  // remove google because it's in main position
  // remove email_passwordless because it's need other configuration
  const providers = connectors.filter(
    (provider) => !["google", "email_passwordless"].includes(provider)
  );

  const [showAll, setShowAll] = useState(false);

  if (providers.length === 0) return null;
  return (
    <SimpleGrid
      cols={
        MAX_PROVIDERS_SHOWN > providers.length
          ? providers.length
          : MAX_PROVIDERS_SHOWN
      }
    >
      {providers
        .slice(0, showAll ? providers.length : MAX_PROVIDERS_SHOWN - 1)
        .map((provider) => (
          <SocialCustomButton
            socialConnectorName={provider}
            variant="compact"
          />
        ))}
      {providers.length > MAX_PROVIDERS_SHOWN ? (
        <ModalButtonCompact
          w={"100%"}
          onClick={() => setShowAll(!showAll)}
          variant={"outline"}
        >
          <Flex align={"center"} justify={"center"} gap={4}>
            {showAll ? <IconMinus size={12} /> : <IconPlus size={12} />}
            <Text>{providers.length - MAX_PROVIDERS_SHOWN + 1}</Text>
          </Flex>
        </ModalButtonCompact>
      ) : null}
    </SimpleGrid>
  );
};
