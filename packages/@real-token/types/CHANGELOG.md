# @real-token/types

## 2.0.23

### Patch Changes

- a9eeeaf: fix(monorepo):

  - trubopack config, cache now working

  feat(ui-component):

  - CopyToAddress, ManageAaAccounts, WatchAddress wallet menu items, WatchWalletModal

  feat(web3):

  - readOnly connector and rainbow-kit wallet
  - hook and modals to check last sdk version

  feat(aa-modal):

  - ReadOnly connection mode

  feat(i18n-locales):

  - modals translations

## 2.0.22

### Patch Changes

- e5d91ae: chore: upgrade aa-core to v2.0.0-beta.23

## 2.0.21

### Patch Changes

- 85db506: fix(core): RealTokenUiProvider merge config with lodash

## 2.0.20

### Patch Changes

- aa77c0c: fix web3, upgrade deps versions

## 2.0.19

### Patch Changes

- 434832c: fix(aa-modal):

  - Tabs translations not working
  - LanguageSwitcher not working at init
  - Remove connectors name from config. Connectors are now get from aa-core trough wagmi.
  - PostCSS not in esbuild causing wrong css style applied to components

  fix(commons-website-examples):

  - Update deps
  - Fix development server: Buffer polyfill

  fix(web3):

  - Decoding crashing
  - WC Decoding decodes AA transactions instead of WC

  All fix:

  - Upgrade aa-core to last version
  - Upgrade wagmi peerDeps version

## 2.0.18

### Patch Changes

- f747089: fix: i18next, NetworkSelector

## 2.0.17

### Patch Changes

- 37da5e1: fix: aa-modal, ui-components crash

## 2.0.16

### Patch Changes

- 321a0c0: feat(aa-core):

  - add env to UiProvider
  - add aaModalConfig to UiProvider

  feat(ui-components):

  - connect button doing nothing

  fix(aa-modal):

  - export config types
  - export default config

## 2.0.15

### Patch Changes

- 4430ef1: fix: bundling

## 2.0.14

### Patch Changes

- deef784: feat: ESM only bundle

## 2.0.13

### Patch Changes

- feat(web3): WalletConnectModal; manage active session and session approval
  feat(web3): WalletConnectButton
  fix(web3): bundle error
- Add types for web3 package
- fix(web3): building error
- fix: add "files" option to package.json to include all files in bundle file

## 2.0.12

### Patch Changes

- feat(web3): WalletConnectModal; manage active session and session approval
  feat(web3): WalletConnectButton
  fix(web3): bundle error
- Add types for web3 package
- fix: add "files" option to package.json to include all files in bundle file

## 2.0.11

### Patch Changes

- aaabad2: fix: aa-core package version

## 2.0.10

### Patch Changes

- 3b0ae7c: feat: decoding to web3 package

## 2.0.9

### Patch Changes

- d93f678: fix: chainLogo

## 2.0.8

### Patch Changes

- b1c94cb: fix: logo

## 2.0.7

### Patch Changes

- 8c2284e: Fix: types errors on logos

## 2.0.6

### Patch Changes

- 18a39f8: Add ActionButton, new network logo

## 2.0.5

### Patch Changes

- b919d60: Fix: web3, ui-components, types packages

## 2.0.4

### Patch Changes

- Add types for web3 package
- fix: add "files" option to package.json to include all files in bundle file

## 2.0.3

### Patch Changes

- 7beabbe: Fix: use tsc to generate types instead of webpack pkugins

## 2.0.2

### Patch Changes

- 40dfac6: Fix: generate types with ts intease of webpack plugins

## 2.0.1

### Patch Changes

- Add types for web3 package

## 2.0.0

### Major Changes

- 955fc23: v1
