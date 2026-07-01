# <img src="https://github.com/dhruvkb/beam/raw/main/readme_assets/logo.png" alt="" align="left" width="40" height="40"> Beam

A monorepo of [Raycast](https://www.raycast.com/) extensions.

## Extensions

- <img src="https://github.com/dhruvkb/beam/raw/main/extensions/box-drawing/assets/extension-icon.png" alt="" align="left" width="24" height="24"> [`box-drawing`](extensions/box-drawing) — Browse and copy box-drawing
  characters to the clipboard.
- <img src="https://github.com/dhruvkb/beam/raw/main/extensions/catppuccin/assets/extension-icon.png" alt="" align="left" width="24" height="24"> [`catppuccin`](extensions/catppuccin) — Browse Catppuccin colors and copy them
  in various formats.
- <img src="https://github.com/dhruvkb/beam/raw/main/extensions/tailwind/assets/extension-icon.png" alt="" align="left" width="24" height="24"> [`tailwind`](extensions/tailwind) — Browse Tailwind CSS colors and copy them in
  various formats.

## Development

This is a [pnpm](https://pnpm.io/) workspace. Shared dependency versions are
managed via the [catalog](https://pnpm.io/catalogs) in `pnpm-workspace.yaml`.
Linting and formatting are configured once at the repo root and run across every
extension.

```sh
pnpm install            # install all dependencies
pnpm -F box-drawing dev # develop a single extension
pnpm build              # build every extension
pnpm lint               # lint the whole repo
pnpm format             # format the whole repo with Prettier
```

Each extension lives in its own directory under `extensions/`. To work on one,
run `pnpm -F <name> dev` (where `<name>` is the extension's `package.json`
name). This starts `ray develop`, which builds the extension, loads it into
Raycast, and live-reloads on every change. Leave it running while iterating.

A new extension just needs a directory under `extensions/`; it picks up the
root linting, formatting, and shared dependency versions automatically.

## Loading into Raycast

These extensions are never published to the Raycast store — they run as local
**development** extensions. `pnpm -F <name> dev` registers an extension with
Raycast, and that registration **persists after the watcher is stopped**, so a
single run is enough to keep a command available. Two things to remember:

- Raycast must be running, and the registration points at this repo on disk
  (`~/Developer/dhruvkb/beam`), so don't move or delete the clone.
- On a fresh machine, `~/dotfiles/bootstrap/raycast.zsh` clones this repo to
  that location and loads every extension automatically, so there's usually
  nothing to do by hand.
