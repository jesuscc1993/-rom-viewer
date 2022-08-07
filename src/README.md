# Desktop version

## Setup

Run `npm run update` to install/update NeutralinoJS.

## Development

### Configure

Copy `/templates/rom-viewer.settings.template.jsonc` as `rom-viewer.settings.jsonc` and fill in your data.

### Run

Run `npm run`.

## Release

### Build

1. Run `npm run configure` to configure the mode (dev / release) and version.
2. Run `npm run build` to compile the executable desktop app (can be found under `/dist`).

### Configure

Copy `/templates/rom-viewer.settings.template.jsonc` as `/dist/rom-viewer/rom-viewer.settings.jsonc` and fill in your data.

## Run

Run the corresponding executable version for your OS (found under `/dist/rom-viewer`).
