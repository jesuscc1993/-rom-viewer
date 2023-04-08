const romSettings = {
  appSettings: {
    coverFontSize: '1.25em',
    coverWidth: '192px',
    maxColumns: 7,
    minCoverHeight: '136px',
    showRomCount: true,
  },
  romPath: '',
  coverPath: '',
  emulatorPath: '',
  platforms: [
    { label: 'PlayStation', type: 'label' },
    {
      label: 'PS1',
      emulatorPath: 'DuckStation/duckstation-qt-x64-ReleaseLTCG.exe',
      roms: [],
    },
    {
      label: 'PS2',
      emulatorPath: 'PCSX2/pcsx2-qtx64.exe',
      roms: [],
    },
    {
      label: 'PS3',
      emulatorPath: 'RPCS3/rpcs3.exe',
      roms: [],
    },
    {
      label: 'PSP',
      emulatorPath: 'PPSSPP/PPSSPPWindows64.exe',
      roms: [],
    },
    { label: 'Nintendo', type: 'label' },
    {
      label: 'SNES',
      emulatorPath: 'bSNES/bsnes_hd.exe',
      roms: [],
    },
    {
      label: 'GBA',
      emulatorPath: 'mGBA/mGBA.exe',
      coverPath: 'GBA/_framed',
      roms: [],
    },
    {
      label: 'NDS',
      emulatorPath: 'DesMuMe/DeSmuME-VS2019-x64-Release.exe',
      roms: [],
    },
    {
      label: '3DS',
      emulatorPath: 'Citra/citra-qt.exe',
      roms: [],
    },
    { type: 'separator' },
    {
      label: 'Wii',
      emulatorPath: 'Dolphin/Dolphin.exe',
      roms: [],
    },
    {
      label: 'Wii U',
      emulatorPath: 'Cemu/Cemu.exe',
      roms: [],
    },
    {
      label: 'Switch',
      emulatorPath: 'yuzu/yuzu-windows-msvc/yuzu.exe',
      roms: [],
    },
    { label: 'Xbox', type: 'label' },
    {
      label: 'Xbox',
      emulatorPath: 'Xemu/xemu.exe',
      roms: [],
    },
    {
      label: 'X360',
      emulatorPath: 'Xenia/xenia_canary.exe',
      roms: [],
    },
  ],
};
