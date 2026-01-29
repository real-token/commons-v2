import { FC } from "react";
import { ActionIcon, Indicator, Popover } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useTransactionCart } from "@real-token/web3";
import { CartPopoverContent } from "../CartPopover/CartPopoverContent";

export const CartButton: FC = () => {
  const { totalCount, groups, isSimulating } = useTransactionCart();
  const [popoverOpened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const openFullModal = () => {
    close();
    modals.openContextModal({
      modal: "transactionCart",
      innerProps: {},
      size: "lg",
      title: null,
      withCloseButton: true,
    });
  };

  const handleClick = () => {
    if (isMobile) {
      openFullModal();
    } else {
      open();
    }
  };

  // Don't render if cart is empty
  if (totalCount === 0) {
    return null;
  }

  return (
    <Popover
      opened={popoverOpened && !isMobile}
      onClose={close}
      position="bottom-end"
      shadow="md"
      width={380}
    >
      <Popover.Target>
        <Indicator
          label={totalCount}
          size={16}
          color="red"
          processing={isSimulating}
        >
          <ActionIcon
            size={36}
            color="brand"
            variant="subtle"
            onClick={handleClick}
            aria-label="Transaction Cart"
          >
            <IconShoppingCart size={20} />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <CartPopoverContent
          groups={groups}
          onExpand={openFullModal}
          onClose={close}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
