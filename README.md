# ROM Viewer

Displays a list of ROMs, grouped by platform.

![preview](preview.png)

Comes in two versions:

### Web version

Pure HTML version.
Loads faster but does not have the capability to run roms on click.

[Web version readme](/web-version/README.md)

### Desktop version

Integrated with NeutralinoJS.
Loads slower but does have the capability to run roms on click.

[NeutralinoJS version readme](/src/README.md)

<br>

## Cover lookup

The app will look for covers matching the ROM's name. Text between parenthesis or brackets will be ignored.

_e.g.:_
Given ROM filename  
`"Foo [bar] (baz) {qux}.iso"`,  
a cover with filename  
`"Foo.jpg"`  
will be looked up.

<br>

## Config description

### Application settings

| property       | description                                                   | required | type    | default  |
| -------------- | ------------------------------------------------------------- | -------- | ------- | -------- |
| coverFontSize  | Font size for the text used when no cover image is available. | optional | string  | "1.25em" |
| coverPadding   | Padding for the text used when no cover image is available.   | optional | boolean | "16px"   |
| coverWidth     | Width of each game cover.                                     | optional | string  | "192px"  |
| maxColumns     | Maximum cover per row.                                        | optional | integer | 7        |
| minCoverHeight | Minimum cover height.                                         | optional | string  | "136px"  |
| showRomCount   | Show number of roms for each platform.                        | optional | boolean | true     |

Example:

```
"appSettings": {
  "coverFontSize": "1.25em",
  "coverPadding": "16px",
  "coverWidth": "192px",
  "maxColumns": 7,
  "minCoverHeight": "136px",
  "showRomCount": true
}
```

<br>

### Platform elements

| property     | description                                                                                            | required                            | type           | example                                          |
| ------------ | ------------------------------------------------------------------------------------------------------ | ----------------------------------- | -------------- | ------------------------------------------------ |
| name         | Name of the platform. Must match the name of the folder containing the roms.                           | required for non-separator elements | string         | "PS1"                                            |
| coverPath    | Path to the covers for this platform; relative to the root coverPath. Defaults to the platform's name. | optional                            | string         | "PS1"                                            |
| emulatorPath | Path to the emulator to be used to run the platform's games; relative to the root emulatorPath.        | optional                            | integer        | "DuckStation/duckstation-qt-x64-ReleaseLTCG.exe" |
| romPath      | Path to the roms for this platform; relative to the root romPath. Defaults to the platform's name.     | optional                            | string         | "PS1"                                            |
| roms         | List of roms.                                                                                          | optional                            | Array<RomType> | true                                             |
| type         | Element type. To be used to add empty labels or separators.                                            | optional                            | string         | "label"                                          |

Platform example:

```
{
  "name": "PS1",
  "emulatorPath": "DuckStation/duckstation-qt-x64-ReleaseLTCG.exe",
  "roms": [
    "Ape Escape [SCUS-94423].bin"
  ]
}
```

Label example:

```
{
  "name": "Playstation",
  "type": "label"
}
```

Separator example:

```
{
  "type": "separator"
}
```

<br>

### RomType

| property | description                                                                                                                           | required | type   | example |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------ | ------- |
| name     | Name to display for the rom; does not need to match the file name. Will also be used for the cover lookup. Defaults to the roms path. | optional | string | "PS1"   |
| path     | Path to the rom; relative to the platform's romPath.                                                                                  | required | string | "PS1"   |

Example:

```
{
  "name": "Castlevania - Symphony of the Night",
  "path": "Akumajou Dracula X - Gekka no Yasoukyoku.bin"
}
```

or

```
{
  "path": "Ape Escape [SCUS-94423].bin"
}
```

or

```
"Ape Escape [SCUS-94423].bin"
```

<br>

## TODO

- Find something to fill the right sidebar with
