# Packages

## ui-components

This package contains all opinated components for building a RealToken Dapp.

## Web3

This package contains everything to initialize and use a web3 connection for a Dapp

## Core

This package contains the core such a the RealToken provider used in other packages.

# Generate new relase

Generating a new packages release is made with `changeset` package.
NOTE: All packages have the same package version even if only one has been modified.

## Init a new version

`pnpm changeset init`

## Add changes

Here you can choose the type of bump (major, minor, patch).
`pnpm changeset`

## Upgrade version

`pnpm changeset version`
Update all packages to new version
