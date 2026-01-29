## PREREQUISITES

1. Install mandatory deps:
   `yarn add @real-token/aa-core @real-token/web3 @tanstack/react-query^5.72.0 @web3auth/modal^10.0.3 viem^2.29 wagmi^2.16.1`
2. `RealTokenWeb3Provider` from `@real-token/web3` needs to be setup.

## SETUP

1. Import `AaModal` modal exported from `@real-token/aa-modal` in `modals` props from `MantineProviders` exported from `@real-token/ui-components`:

```tsx
import { MantineProviders } from '@real-token/ui-components';
import { AaModal } from '@real-token/aa-modal';

<MantineProviders
    modals={{
        aaModal: AaModal
    }}
>
{...}
</MantineProviders>
```

> [!WARNING]
> The name MUST exactly be `aaModal` when you import the aa modal. Other name will create an error when clicking on `AaConnectButton` button from `@real-token/web3` package.
