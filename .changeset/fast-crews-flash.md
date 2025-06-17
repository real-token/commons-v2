---
"@real-token/aa-modal": patch
"@real-token/core": patch
"@real-token/i18n-locales": patch
"@real-token/types": patch
"@real-token/ui-components": patch
"@real-token/web3": patch
---

fix(aa-modal):

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
