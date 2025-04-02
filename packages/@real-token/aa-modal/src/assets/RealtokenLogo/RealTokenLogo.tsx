import { RealtokenLogoDark } from "./RealtokenLogoDark";
import { RealtokenLogoLight } from "./RealtokenLogoLight";

export const RealTokenLogo = () => {
  return (
    <>
      <RealtokenLogoLight justify={"center"} darkHidden />
      <RealtokenLogoDark justify={"center"} lightHidden />
    </>
  );
};
