const romSettingsPath = `${NL_CWD}/rom-viewer.settings.jsonc`;

let romSettings;

const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach(async (rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romPath = typeof rom === 'string' ? rom : rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');
    const coverPath = `${buildPath(
      romSettings.coverPath,
      rom.coverPath || platform.coverPath || platform.romPath,
      romName
    )}.jpg`;

    let imageSrc;
    try {
      const imageBytes = await Neutralino.filesystem.readBinaryFile(coverPath);
      imageSrc = arrayBufferToBase64(imageBytes);
    } catch (err) {
      logger.error(err);
    }

    const coverEl = jQuery(
      imageSrc
        ? `<img class="rom-cover" alt="${romName}" src="${imageSrc}"></img>`
        : `<div class="rom-cover rom-title" alt="${romName}">${romName}</div>`
    );

    const romEl = jQuery(`<div class="rom" title="${romName}"></div>`);
    romEl.append(coverEl);
    romEl.click(async () => {
      const emulatorPath = `"${buildPath(
        romSettings.emulatorPath,
        rom.emulatorPath || platform.emulatorPath
      )}"`;

      const fullRomPath = `"${buildPath(
        romSettings.romPath,
        platform.romPath,
        romPath
      )}"`;

      logger.info(`Running ROM ${fullRomPath} on emulator ${emulatorPath}.`);

      await Neutralino.os.execCommand(`${emulatorPath} ${fullRomPath}`);
    });

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
    const romPath = typeof rom === 'string' ? rom : rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');

    const romEl = jQuery(`
      <li class="rom" title="${romName}">
        <span>${romName}</span>
      </li>
    `);
    romEl.click(async () => {
      const emulatorPath = `"${buildPath(
        romSettings.emulatorPath,
        rom.emulatorPath || platform.emulatorPath
      )}"`;

      const fullRomPath = `"${buildPath(
        romSettings.romPath,
        platform.romPath,
        romPath
      )}"`;

      logger.info(`Running ROM ${fullRomPath} on emulator ${emulatorPath}.`);

      await Neutralino.os.execCommand(`${emulatorPath} ${fullRomPath}`);
    });

    ulEl.append(romEl);
  });

  return ulEl;
};

const initialize = async () => {
  Neutralino.init();

  window.addEventListener('contextmenu', (event) => event.preventDefault());

  try {
    const settings = await Neutralino.filesystem.readFile(romSettingsPath);

    romSettings = JSON.parse(settings.replace(/\/\/.*/g, ''));
    processSettings(romSettings);
  } catch (err) {
    logger.error(err.message);

    jQuery('#romsContainer').html(`<p>ERROR: ${err.message}</p>`);
    return;
  }

  const optionsEl = jQuery(`
    <p></p>
  `);

  const editSettingsEl = jQuery(`
    <a href>Edit Settings</a>
  `);
  editSettingsEl.click(async (e) => {
    e.preventDefault();

    await Neutralino.os.execCommand(romSettingsPath);
  });
  optionsEl.append(editSettingsEl);

  optionsEl.append('&nbsp;');

  const reloadEl = jQuery(`
    <a href>↻</a>
  `);
  reloadEl.click((e) => {
    e.preventDefault();

    location.reload();
  });
  optionsEl.append(reloadEl);

  generatePlatforms();

  leftSidebarEl.append(optionsEl);
};

const logger = {
  error: async (text) => await Neutralino.debug.log(text, 'ERROR'),
  info: async (text) => await Neutralino.debug.log(text, 'INFO'),
  log: async (text) => await Neutralino.debug.log(text),
  warn: async (text) => await Neutralino.debug.log(text, 'WARNING'),
};

initialize();
