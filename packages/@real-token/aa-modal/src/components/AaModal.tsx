import { useEffect } from "react";
import { ContextModalProps } from "@mantine/modals";
import { Flex } from "@mantine/core";
import { LanguageSwitcher } from "./Buttons/LanguageSwitcher";
import { RealTokenLogo } from "../assets/RealtokenLogo/RealTokenLogo";
import { merge } from "lodash";
import { useMemo } from "react";
import { AaModalConfig, defaultAaModalConfig } from "../types/aaModalConfig";
import { ConnectionMode } from "./ConnectionMode";
import { TranslationProvider } from "./TranslationProvider";
import { AaModalProvider } from "./AaModalProvider";
import { useAA } from "@real-token/aa-core";
import { modals } from "@mantine/modals";
import { useCheckConfig } from "../hooks/useCheckConfig";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type AaModalProps = DeepPartial<AaModalConfig>;

export const AaModalContent = ({
  config,
  id,
}: {
  config: AaModalConfig;
  id: string;
}) => {
  const { connectionMode } = config;
  useCheckConfig(config);

  const { walletAddress } = useAA();
  useEffect(() => {
    if (walletAddress) {
      modals.close(id);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (Object.keys(connectionMode ?? {}).length == 0) {
      throw new Error("No config connectionMode provided");
    }
  }, [config]);

  return (
    <Flex direction={"column"} gap={"md"} w={"100%"}>
      <Flex justify={"space-between"} align={"center"}>
        <RealTokenLogo />
        <LanguageSwitcher />
      </Flex>
      <ConnectionMode config={config} />
    </Flex>
  );
};

export const AaModal = (props: ContextModalProps<AaModalProps>) => {
  const config = useMemo(
    () => merge({}, defaultAaModalConfig, props.innerProps),
    [props.innerProps]
  ) as AaModalConfig;
  return (
    <TranslationProvider>
      <AaModalProvider config={config}>
        <AaModalContent config={config} id={props.id} />
      </AaModalProvider>
    </TranslationProvider>
  );
};

//   const { t } = useTranslation("main");
//   const { forceWallet } = innerProps;

//   const { loginReady, login, loginConfig, walletAddress } = useAA();

//   // useEffect(() => {
//   //   if (walletAddress && walletAddress !== "") closeModal(id);
//   // }, [walletAddress]);

//   const [connectExternalWallet, setConnectExternalWallet] = useState(false);

//   // const [email, setEmail] = useState("");
//   // const connectWithEmail = () => {
//   //   login("auth", {
//   //     loginProvider: "email_passwordless",
//   //     login_hint: email,
//   //   });
//   // };

//   if (connectExternalWallet) {
//     return <AdvancedView onBack={() => setConnectExternalWallet(false)} />;
//   }
//   return (
//     <Flex direction={"column"} gap={"md"}>
//       <LoadingOverlay visible={!loginReady} />
//       <Flex justify={"space-between"} align={"center"} px={"xl"}>
//         <RealTokenLogo />
//         <LanguageSwitcher />
//       </Flex>
//       <Flex direction={"column"} px={"xl"} gap={"md"}>
//         <Flex direction={"column"}>
//           <Text fz={36} fw={600} className={classes.text}>
//             {t("signin.title")}
//           </Text>
//           <Text fz={16} fw={500} className={classes.text}>
//             {t("signin.subtitle")}
//           </Text>
//         </Flex>
//         <Flex direction={"column"} gap={"lg"}>
//           <Flex direction={"column"} gap={"sm"} w={"100%"}>
//             <ModalButton
//               leftSection={<IconBrandGoogle />}
//               onClick={() =>
//                 login("auth", { loginProvider: "google" }, forceWallet)
//               }
//               variant={"outline"}
//             >
//               <Text fw={600}>{t("providers.continueWithGoogle")}</Text>
//             </ModalButton>
//             <Providers
//               loginConfig={loginConfig as LoginConfig}
//               forceWallet={forceWallet}
//             />
//           </Flex>
//         </Flex>
//         <Divider />
//         <Flex direction={"column"} gap={"sm"}>
//           <TextInput
//             placeholder={t("emailPasswordless.subtitle")}
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//           />
//           <Button onClick={() => connectWithEmail()} disabled={email == ""}>
//             {t("emailPasswordless.title")}
//           </Button>
//         </Flex>
//         <Text fz={12} c={"dimmed"}>
//           {t("privacyPolicy")}
//         </Text>
//       </Flex>
//       <Flex gap={"xs"} align={"center"} w={"100%"} px={"20%"}>
//         <div className={classes.line} />
//         <Text fz={16} c={"dimmed"}>
//           {t("providers.or")}
//         </Text>
//         <div className={classes.line} />
//       </Flex>
//       <Flex gap={"sm"} w={"100%"} px={"10%"} justify={"center"}>
//         <Button
//           size={"xs"}
//           color={"#FAAE1D"}
//           leftSection={<IconWallet size={18} />}
//           onClick={() => setConnectExternalWallet(true)}
//         >
//           {t("providers.connectExternalWallet")}
//         </Button>
//         <Button size={"xs"} color={"#156CAB"}>
//           {t("help")}
//         </Button>
//       </Flex>
//     </Flex>
//   );
// };
