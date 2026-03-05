import { Loader, Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconShieldCog } from "@tabler/icons-react";
import { useManageMFA } from '@web3auth/modal/react'
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const ManageMFAMenuItem = () => {

    const { t: nT } = useTranslation("notifications");
    const { t } = useTranslation("common", { keyPrefix: "wallet" });

    const { manageMFA, loading, error }= useManageMFA();

    useEffect(() => {
        if(error !== null){
            console.error("Error managing MFA: ", error)
            notifications.show({
                title: nT("manageMfaError.title"),
                message: nT("manageMfaError.message"),
                color: 'red',
            })
        }
    }, [error])

    return (
        <Menu.Item
          leftSection={<IconShieldCog size={18} />}
          onClick={async () => {
            await manageMFA();
          }}
        >
            {loading ? (
                <Loader size={"sm"}/>
            ) : t("manageMFA")}
        </Menu.Item>
    );
}