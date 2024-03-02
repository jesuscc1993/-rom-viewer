const romSettingsPath = `${NL_CWD}/rom-viewer.settings.jsonc`;

let romSettings;

const getRomCover = async (coverPath) => {
  let imageSrc;
  try {
    const imageBytes = await Neutralino.filesystem.readBinaryFile(coverPath);
    imageSrc = arrayBufferToBase64(imageBytes);
  } catch (err) {
    logger.error(err);
  }
  return imageSrc;
};

const onRomClick = async (romSettings, platform, rom) => {
  const emulatorPath = `"${getEmulatorPath(romSettings, platform, rom)}"`;
  const fullRomPath = `"${getRomPath(romSettings, platform, rom)}"`;

  logger.info(`Running ROM ${fullRomPath} on emulator ${emulatorPath}.`);
  await Neutralino.os.execCommand(`${emulatorPath} ${fullRomPath}`);
};

const onEmulatorClick = async (romSettings, platform) => {
  const emulatorPath = `"${getEmulatorPath(romSettings, platform)}"`;

  logger.info(`Running emulator ${emulatorPath}.`);
  await Neutralino.os.execCommand(emulatorPath);
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

  const settingsEl = jQuery(`
    <ul class="no-style link-list settings-list">
      <li class="header">
        <div>
          Settings
        </div>
      </li>
    </ul>
  `);

  const editSettingsEl = jQuery(`
    <li>
      <a href>Edit</a>
    </li>
  `);
  editSettingsEl.click(async (e) => {
    e.preventDefault();

    await Neutralino.os.execCommand(romSettingsPath);
  });
  settingsEl.append(editSettingsEl);

  const reloadEl = jQuery(`
    <li>
      <a href>Reload</a>
    </li>
  `);
  reloadEl.click((e) => {
    e.preventDefault();

    location.reload();
  });
  settingsEl.append(reloadEl);

  generatePlatforms();

  leftSidebarEl.append(settingsEl);
};

const logger = {
  error: async (text) => await Neutralino.debug.log(text, 'ERROR'),
  info: async (text) => await Neutralino.debug.log(text, 'INFO'),
  log: async (text) => await Neutralino.debug.log(text),
  warn: async (text) => await Neutralino.debug.log(text, 'WARNING'),
};

initialize();
