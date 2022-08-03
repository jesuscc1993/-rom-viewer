const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach(async (rom) => {
    const romFile = sanitizeRomName(rom);
    const romName = romFile.replace(/\.[^.]*$/, '');
    const romPath = `${romSettings.romPath}/${platform.romPath}/${rom}`;
    const coverPath = `${romSettings.coverPath}/${
      platform.coverPath || platform.romPath
    }/${replaceExtension(romFile, 'jpg')}`;

    let imageSrc;
    try {
      const imageBytes = await Neutralino.filesystem.readBinaryFile(coverPath);
      imageSrc = arrayBufferToBase64(imageBytes);
    } catch (err) {
      console.error(err);
    }

    const coverEl = jQuery(
      imageSrc
        ? `<img class="rom-cover" alt="${romName}" src="${imageSrc}"></img>`
        : `<div class="rom-cover rom-title" alt="${romName}">${romName}</div>`
    );

    const romEl = jQuery(`
        <div class="rom" click="onClick" title="${romName}"></div>
      `);
    romEl.append(coverEl);
    romEl.click(async () => {
      await Neutralino.os.execCommand(
        `"${romSettings.emulatorPath}/${platform.emulatorPath}" "${romPath}"`
      );
    });

    romsGridEl.append(romEl);
  });

  return romsGridEl;
};

let romSettings;

const initialize = async () => {
  Neutralino.init();

  try {
    romSettings = JSON.parse(
      await Neutralino.filesystem.readFile(`${NL_CWD}/rom-viewer.settings.json`)
    );

    if (romSettings.coverSize) {
      jQuery(':root').css('--cover-size', romSettings.coverSize);
    }
    if (romSettings.maxColumns) {
      jQuery(':root').css('--max-columns', romSettings.maxColumns);
    }
    if (romSettings.coverFontSize) {
      jQuery(':root').css('--cover-font-size', romSettings.coverFontSize);
    }
  } catch (err) {
    alert(err.message);
  }

  generatePlatforms();
};

initialize();
