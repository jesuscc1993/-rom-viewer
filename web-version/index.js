const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach((rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.filename;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');
    const coverPath = `file:///${romSettings.coverPath}/${
      platform.coverPath || platform.romPath
    }/${romName}.jpg`;

    const romEl = jQuery(`
        <div class="rom" click="onClick" title="${romName}">
          <img class="rom-cover" alt="${romName}" src="${coverPath}">
        </div>
      `);

    romsGridEl.append(romEl);
  });

  return romsGridEl;
};

const initialize = async () => {
  generatePlatforms();

  processSettings(romSettings);
};

initialize();
