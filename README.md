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

## Config description

```
{
  "romPath": "", // base rom path, should be an absolute path
  "coverPath": "", // base cover path, should be an absolute path
  "emulatorPath": "", // base emulator path, should be an absolute path
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
