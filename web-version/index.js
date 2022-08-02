const generateRoms = async (roms, platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  roms.forEach((rom) => {
    const romFile = sanitizeRomName(rom);
    const romName = romFile.replace(/\.[^.]*$/, '');
    const coverPath = `file:///${romSettings.coverPath}/${
      platform.coverPath || platform.romPath
    }/${replaceExtension(romFile, 'jpg')}`;

    const romEl = jQuery(`
        <a class="rom" click="onClick" title="${romName}">
          <img class="rom-cover" alt="${romName}" src="${coverPath}">
        </a>
      `);

    romsGridEl.append(romEl);
  });

  return romsGridEl;
};

const initialize = async () => {
  generatePlatforms();
};

initialize();
