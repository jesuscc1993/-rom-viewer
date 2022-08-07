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

## Cover lookup

The app will look for covers matching the ROM's name. Text between parenthesis or brackets will be ignored.

_e.g.:_
Given ROM filename  
`"Foo [bar] (baz) {qux}.iso"`,  
a cover with filename  
`"Foo.jpg"`  
will be looked up.

## Config description

```
{
  "coverFontSize": "", // font size for cover text (optional; defaults to 1.25em)
  "coverPath": "", // base cover path, should be an absolute path
  "coverSize": "", // cover size (optional; defaults to 192px)
  "emulatorPath": "", // base emulator path, should be an absolute path
  "maxColumns": "", // maximum number of rom columns to display (optional; defaults to 7)
  "romPath": "", // base rom path, should be an absolute path
  "platforms": {
    "PLATFORM_NAME": {
      "coverPath": "", // path to the covers for this platform; relative to the root coverPath (optional; defaults to the platform's name)
      "emulatorPath": "", // path to the emulator for this platform; relative to the root emulatorPath
      "romPath": "", // path to the roms for this platform; relative to the root romPath (optional; defaults to the platform's name)
      "roms": [] // list of paths to the roms, relative to the platform's romPath
    },
  }
}
```

Alternatively to a string, a rom can be an object in the following format:

```
{
  "filename": "", // filename to be displayed; will be used for the cover lookup
  "path": "" // paths to the rom, relative to the platform's romPath
}
```
