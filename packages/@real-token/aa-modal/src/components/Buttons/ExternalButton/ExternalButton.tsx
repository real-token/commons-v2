import { PropsWithChildren } from "react";
import { ModalButton } from "../ModalButton"
import { Text, Flex } from "@mantine/core";
import classes from './ExternalButton.module.css';

interface ExternalButtonProps extends PropsWithChildren{
    label: string
    onClick: () => void
}
export const ExternalButton = ({ children, label, onClick }: ExternalButtonProps) => {
    return (
        <Flex gap={'sm'} direction={'column'} align={'center'}>
            <ModalButton className={classes.externalButton} onClick={() => onClick()}>
                {children}
            </ModalButton>
            <Text>{label}</Text>
        </Flex>
    )
}