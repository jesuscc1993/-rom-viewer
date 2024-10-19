const getRomCover = (coverPath) => {
  return coverPath;
};

const onRomClick = (romSettings, platform, rom) => {
  const fullRomPath = getRomPath(romSettings, platform, rom);
  const emulatorKey = getEmulatorKey(platform, rom);
  const link = `emu://${emulatorKey};${fullRomPath}`;
  window.open(link);

  console.info(`Clicked on ROM "${fullRomPath}".`);
  console.info(`Trying to open "${link}"...`);
};

const onEmulatorClick = async (romSettings, platform) => {
  const emulatorPath = `"${getEmulatorPath(romSettings, platform)}"`;

  console.info(`Clicked on emulator ${emulatorPath}.`);
};

const initialize = async () => {
  processSettings(romSettings);

  generatePlatforms();
};

initialize();
