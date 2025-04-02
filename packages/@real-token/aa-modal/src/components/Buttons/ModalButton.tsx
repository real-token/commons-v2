import { ButtonProps, Button } from "@mantine/core";
import classes from './Buttons.module.css';

interface ModalButtonProps extends ButtonProps {
    onClick?: () => void;
    className?: string;
}
export const ModalButton = ({ children, onClick, className, ...props }: ModalButtonProps) => {
    return(
        <Button
            {...props}
            classNames={{
                root: `${classes.root} ${className}`
            }}
            onClick={() => { if (onClick) { onClick() } }}
        >
            {children}
        </Button>
    )
}