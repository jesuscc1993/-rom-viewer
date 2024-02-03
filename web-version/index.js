const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach((rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');
    const coverPath = `${buildPath(
      romSettings.coverPath,
      platform.coverPath || platform.romPath,
      romName
    )}.jpg`;

    const romEl = jQuery(`
      <div class="rom" click="onClick" title="${romName}">
        <img class="rom-cover" alt="${romName}" src="${coverPath}">
      </div>
    `);

    romsGridEl.append(romEl);
  });

  return romsGridEl;
};

const generateRomList = async (platform) => {
  const ulEl = jQuery(`<ul class="link-list no-style"></ul>`);

  const platformEl = jQuery(`
    <li class="platform-name secondary static">
      <strong>${platform.name}</strong>
    </li>
  `);
  if (appSettings.showRomCount) {
    platformEl.append(`
      <span class="tertiary">
        (${platform.roms.length})
      <span>
    `);
  }
  ulEl.append(platformEl);

  platform.roms.forEach(async (rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');

    const romEl = jQuery(`
      <li class="rom" title="${romName}">
        <span>${romName}</span>
      </li>
    `);

    ulEl.append(romEl);
  });

  return ulEl;
};

const initialize = async () => {
  processSettings(romSettings);

  generatePlatforms();
};

initialize();
