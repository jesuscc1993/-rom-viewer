import { fileSystemService } from './services/file-system.service';
import { tap } from 'rxjs/operators';

const romSettingsPath = `../../rom-viewer.settings.jsonc`;

const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach(async (rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romPath = typeof rom === 'string' ? rom : rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');
    const coverPath = `${buildPath(
      romSettings.coverPath,
      platform.coverPath || platform.romPath,
      romName
    )}.jpg`;

    getFile(coverPath)
      .pipe(
        tap((imageBytes) => {
          imageSrc = arrayBufferToBase64(imageBytes);

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

            logger.info(
              `Running ROM ${fullRomPath} on emulator ${emulatorPath}.`
            );

            execute(`${emulatorPath} ${fullRomPath}`).subscribe();
          });

          romsGridEl.append(romEl);
        })
      )
      .subscribe();
  });

  return romsGridEl;
};

let romSettings;

const initialize = async () => {
  window.addEventListener('contextmenu', (event) => event.preventDefault());

  try {
    getFile(romSettingsPath)
      .pipe(
        tap((settings) => {
          romSettings = JSON.parse(settings.replace(/\/\/.*/g, ''));
          processSettings(romSettings);
        })
      )
      .subscribe();
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

    openFile(romSettingsPath).subscribe();
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

  platformLinks.after(optionsEl);

  generatePlatforms();
};

const logger = {
  error: (text) => console.error(text),
  info: (text) => console.info(text),
  debug: (text) => console.debug(text),
  log: (text) => console.log(text),
  warn: (text) => console.warning(text),
};

const execute = (command) => fileSystemService.execute(command);
const getFile = (path) => fileSystemService.getFile(path);
const openFile = (path) => fileSystemService.openFile(path);

initialize();
