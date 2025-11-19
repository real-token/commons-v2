# @real-token/core

## 3.1.0

### Minor Changes

- Spender mapping for permit and approve
- Translations to web3
- Move aa-modal web3auth type to web3 package

### Patch Changes

- Fix i18next config
- Fix notifications permit
- Fix circular deps
- Updated dependencies
  - @real-token/aa-modal@3.1.0
  - @real-token/types@3.1.0

## 3.0.0

### Major Changes

- ba3e40a: chore: release stable version

### Patch Changes

- Updated dependencies [ba3e40a]
  - @real-token/aa-modal@3.0.0
  - @real-token/types@3.0.0

## 2.0.26

### Patch Changes

- 60a85b6: chore: upgrade deps for translations (i18next)
- Updated dependencies [60a85b6]
  - @real-token/aa-modal@2.0.26
  - @real-token/types@2.0.26

## 2.0.25

### Patch Changes

- ddf130a: feat: upgrade aa-modal to use web3auth instead of rainbow
- Updated dependencies [ddf130a]
  - @real-token/aa-modal@2.0.25
  - @real-token/types@2.0.25

## 2.0.24

### Patch Changes

- ee1e839: fix: language detector, web3
- Updated dependencies [ee1e839]
  - @real-token/aa-modal@2.0.24
  - @real-token/types@2.0.24

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

- Updated dependencies [a9eeeaf]
  - @real-token/aa-modal@2.0.23
  - @real-token/types@2.0.23

## 2.0.22

### Patch Changes

- e5d91ae: chore: upgrade aa-core to v2.0.0-beta.23
- Updated dependencies [e5d91ae]
  - @real-token/aa-modal@2.0.22
  - @real-token/types@2.0.22

## 2.0.21

### Patch Changes

- 85db506: fix(core): RealTokenUiProvider merge config with lodash
- Updated dependencies [85db506]
  - @real-token/aa-modal@2.0.21
  - @real-token/types@2.0.21

## 2.0.20

### Patch Changes

- aa77c0c: fix web3, upgrade deps versions
- Updated dependencies [aa77c0c]
  - @real-token/aa-modal@2.0.20
  - @real-token/types@2.0.20

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

- Updated dependencies [434832c]
  - @real-token/aa-modal@2.0.19
  - @real-token/types@2.0.19

## 2.0.18

### Patch Changes

- f747089: fix: i18next, NetworkSelector
- Updated dependencies [f747089]
  - @real-token/aa-modal@2.0.18
  - @real-token/types@2.0.18

## 2.0.17

### Patch Changes

- 37da5e1: fix: aa-modal, ui-components crash
- Updated dependencies [37da5e1]
  - @real-token/aa-modal@2.0.17
  - @real-token/types@2.0.17

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

- Updated dependencies [321a0c0]
  - @real-token/aa-modal@2.0.16
  - @real-token/types@2.0.16

## 2.0.15

### Patch Changes

- 4430ef1: fix: bundling
- Updated dependencies [4430ef1]
  - @real-token/types@2.0.15

## 2.0.14

### Patch Changes

- deef784: feat: ESM only bundle
- Updated dependencies [deef784]
  - @real-token/types@2.0.14

## 2.0.13

### Patch Changes

- feat(web3): WalletConnectModal; manage active session and session approval
  feat(web3): WalletConnectButton
  fix(web3): bundle error
- Add types for web3 package
- fix(web3): building error
- fix: add "files" option to package.json to include all files in bundle file
- Updated dependencies
- Updated dependencies
- Updated dependencies
- Updated dependencies
  - @real-token/types@2.0.13

## 2.0.12

### Patch Changes

- feat(web3): WalletConnectModal; manage active session and session approval
  feat(web3): WalletConnectButton
  fix(web3): bundle error
- Add types for web3 package
- fix: add "files" option to package.json to include all files in bundle file
- Updated dependencies
- Updated dependencies
- Updated dependencies
  - @real-token/types@2.0.12

## 2.0.11

### Patch Changes

- aaabad2: fix: aa-core package version
- Updated dependencies [aaabad2]
  - @real-token/types@2.0.11

## 2.0.10

### Patch Changes

- 3b0ae7c: feat: decoding to web3 package
- Updated dependencies [3b0ae7c]
  - @real-token/types@2.0.10

## 2.0.9

### Patch Changes

- d93f678: fix: chainLogo
- Updated dependencies [d93f678]
  - @real-token/types@2.0.9

## 2.0.8

### Patch Changes

- b1c94cb: fix: logo
- Updated dependencies [b1c94cb]
  - @real-token/types@2.0.8

## 2.0.7

### Patch Changes

- 8c2284e: Fix: types errors on logos
- Updated dependencies [8c2284e]
  - @real-token/types@2.0.7

## 2.0.6

### Patch Changes

- 18a39f8: Add ActionButton, new network logo
- Updated dependencies [18a39f8]
  - @real-token/types@2.0.6

## 2.0.5

### Patch Changes

- b919d60: Fix: web3, ui-components, types packages
- Updated dependencies [b919d60]
  - @real-token/types@2.0.5

## 2.0.4

### Patch Changes

- Add types for web3 package
- fix: add "files" option to package.json to include all files in bundle file
- Updated dependencies
- Updated dependencies
  - @real-token/types@2.0.4

## 2.0.3

### Patch Changes

- 7beabbe: Fix: use tsc to generate types instead of webpack pkugins
- Updated dependencies [7beabbe]
  - @real-token/types@2.0.3

## 2.0.2

### Patch Changes

- 40dfac6: Fix: generate types with ts intease of webpack plugins
- Updated dependencies [40dfac6]
  - @real-token/types@2.0.2

## 2.0.1

### Patch Changes

- Add types for web3 package
- Updated dependencies
  - @real-token/types@2.0.1

## 2.0.0

### Major Changes

- 955fc23: v1

### Patch Changes

- Updated dependencies [955fc23]
  - @real-token/types@2.0.0
