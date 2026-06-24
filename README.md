# Beam

A monorepo of [Raycast](https://www.raycast.com/) extensions.

## Extensions

- [`box-drawing`](extensions/box-drawing) — Browse and copy box-drawing
  characters to the clipboard.

## Development

This is a [pnpm](https://pnpm.io/) workspace. Shared dependency versions are
managed via the [catalog](https://pnpm.io/catalogs) in `pnpm-workspace.yaml`.

```sh
pnpm install            # install all dependencies
pnpm -F box-drawing dev # develop a single extension
pnpm -r build           # build every extension
pnpm -r lint            # lint every extension
pnpm format             # format the whole repo with Prettier
```
