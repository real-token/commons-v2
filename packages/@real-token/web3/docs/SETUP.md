## PREREQUISITES

1. Install required libs in your consumer app: \
   `yarn add @tanstack/react-query^5.72.0 @web3auth/modal^10.0.3 @real-token/aa-core @real-token/core viem wagmi`

## SETUP

1. Wrap your application with `RealTokenWeb3Provider`.

> [!NOTE]
> Where you need to wrap your application depends of the framework you are using: \
> **Next.js (App router):** `app/__app.tsx` \
> **Next.js (Page router):** `src/__app.tsx` \
> **Vites.js:** `src/main.tsx`

> [!WARNING]
> Among all the providers provided by `@real-tokens` packages. `RealTokenWeb3Provider` always needs to be the first one in the hierarchy.

2. Create a file configuration file `aa-config` to create the configuration and export it.
3. Pass the exported configuration to `RealTokenWeb3Provider` through `aaClientConfig` props.
