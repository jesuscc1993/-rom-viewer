const getRomCover = (coverPath) => {
  return coverPath;
};

const onRomClick = (romSettings, platform, rom) => {
  const fullRomPath = `"${getRomPath(romSettings, platform, rom)}"`;

  console.info(`Clicked on ROM ${fullRomPath}.`);
};

const onEmulatorClick = async (romSettings, platform) => {
  const emulatorPath = `"${getEmulatorPath(romSettings, platform)}"`;

  logger.info(`Clicked on emulator ${emulatorPath}.`);
};

const initialize = async () => {
  processSettings(romSettings);

  generatePlatforms();
};

initialize();
