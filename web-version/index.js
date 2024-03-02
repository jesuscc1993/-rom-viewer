const getRomCover = (coverPath) => {
  return coverPath;
};

const onRomClick = (romSettings, platform, rom) => {
  const fullRomPath = `"${getRomPath(romSettings, platform, rom)}"`;

  console.info(`Clicked on ROM ${fullRomPath}.`);
};

const initialize = async () => {
  processSettings(romSettings);

  generatePlatforms();
};

initialize();
