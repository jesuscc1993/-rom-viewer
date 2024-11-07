const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpg;base64,${window.btoa(binary)}`;
};

const generateRoms = async (platform) => {
  const romsGridEl = jQuery(`<div class="roms-grid"></div>`);

  platform.roms.forEach(async (rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');
    const coverPath = `${buildPath(
      romSettings.coverPath,
      rom.coverPath || platform.coverPath || platform.romPath,
      romName
    )}.jpg`;

    const imageSrc = await getRomCover(coverPath);
    const coverEl = jQuery(
      imageSrc
        ? `<img class="rom-cover" alt="${romName}" src="${imageSrc}"></img>`
        : `<div class="rom-cover rom-title" alt="${romName}">${romName}</div>`
    );

    const romEl = jQuery(`<div class="rom" title="${romName}"></div>`);
    romEl.append(coverEl);
    romEl.click((e) => {
      e.preventDefault();

      onRomClick(romSettings, platform, rom);
    });

    romsGridEl.append(romEl);
  });

  return romsGridEl;
};

const generateRomList = async (platform) => {
  const ulEl = jQuery(`<ul class="no-style link-list roms-list"></ul>`);

  const platformEl = jQuery(`
    <li class="header">
      <div>
        <strong>${platform.name}</strong>
        ${
          appSettings.showRomCount
            ? `<span class="tertiary">(${platform.roms.length})<span>`
            : undefined
        }
      </div>
    </li>
  `);
  ulEl.append(platformEl);

  platform.roms.forEach(async (rom) => {
    const romFilename = typeof rom === 'string' ? rom : rom.name || rom.path;
    const romName = sanitizeRomName(romFilename).replace(/\.[^.]*$/, '');

    const romEl = jQuery(`
      <li class="rom" title="${romFilename}">
        <a href>
          ${romName}
        </a>
      </li>
    `);
    romEl.click((e) => {
      e.preventDefault();

      onRomClick(romSettings, platform, rom);
    });

    ulEl.append(romEl);
  });

  return ulEl;
};

const generatePlatformLink = (ulEl, platform) => {
  const { name, roms, type } = platform;

  if (type === 'separator') {
    ulEl.append(`<hr />`);
    return;
  }

  if (type === 'label') {
    ulEl.append(`
      <li class="header">
        <div>
          <strong>${name}</strong>
        </div>
      </li>
    `);
    return;
  }

  if (!roms?.length) return;

  const anchorEl = jQuery(`
    <a href="${baseUrl}#${name}">
      ${name}
    </a>
  `);
  if (appSettings.showRomCount) {
    anchorEl.append(`
      <span class="tertiary">
        (${roms.length})
      <span>
    `);
  }
  anchorEl.click((e) => {
    generatePlatformDetails(platform);
  });

  const liEl = jQuery(`<li class="anchor"></li>`);
  liEl.append(anchorEl);
  ulEl.append(liEl);
  leftSidebarEl.append(ulEl);
};

const generatePlatforms = async () => {
  const ulEl = jQuery(`<ul class="no-style link-list platforms-list"></ul>`);

  romSettings.platforms.forEach(async (platform) => {
    generatePlatformLink(ulEl, platform);

    platform.coverPath = platform.coverPath || platform.name;
    platform.romPath = platform.romPath || platform.name;

    if (!platform.roms?.length) return;

    const platformNameEl = jQuery(`
      <h3 id="${platform.name}">
        ${platform.label || platform.name}
      </h3>
    `);

    if (appSettings.showRomCount) {
      platformNameEl.append(`
        <span class="tertiary">
          (${platform.roms.length})
        <span>
      `);
    }

    const platformEl = jQuery(`<div class="platform ${platform.name}"></div>`);
    platformEl.append(platformNameEl);
    platformEl.append(await generateRoms(platform));
    romsContainerEl.append(platformEl);
  });

  leftSidebarEl.append(ulEl);
};

const generatePlatformDetails = async (platform) => {
  rightSidebarEl.empty();

  const romList = await generateRomList(platform);
  rightSidebarEl.append(romList);

  rightSidebarEl.append(`
    <ul class="no-style link-list">
      <li class="header">
        <div>
          <strong>Default emulator</strong>
        </div>
      </li>
      <li class="emulator-link" title="/${platform.emulatorPath}">
        <a href>
          ${sanitizeEmulatorName(
            getLastPathSection(platform.emulatorPath, true)
          )}
        </a>
      </li>
    </ul>
  `);
  rightSidebarEl.find('.emulator-link').click((e) => {
    e.preventDefault();

    onEmulatorClick(romSettings, platform);
  });

  rightSidebarEl.append(`
    <ul class="no-style link-list">
      <li class="header">
        <div>
          <strong>Default cover path</strong>
        </div>
      </li>
      <li class="no-hover">
        <div>
          /${platform.coverPath || platform.romPath}
        </div>
      </li>
    </ul>
  `);
};

const getBaseUrl = () => {
  return location.protocol + '//' + location.host + location.pathname;
};

const getLastPathSection = (path, removeExtension) => {
  let lastSection = path.split(/[\\|/]/).pop();
  if (removeExtension) lastSection = lastSection.replace(/\.[^/.]+$/, '');
  return lastSection;
};

const getEmulatorPath = (romSettings, platform) => {
  return buildPath(romSettings.emulatorPath, platform.emulatorPath);
};

const getEmulatorKey = (platform, rom) => {
  return rom.emulatorKey || platform.emulatorKey;
};

const getRomPath = (romSettings, platform, rom) => {
  return buildPath(
    romSettings?.romPath,
    platform?.romPath,
    typeof rom === 'string' ? rom : rom.path
  );
};

const processSettings = (settings) => {
  window.appSettings = settings.appSettings || {};

  appSettings.coverFontSize = appSettings.coverFontSize || '1.25em';
  appSettings.coverPadding = appSettings.coverPadding || '16px';
  appSettings.coverWidth = appSettings.coverWidth || '192px';
  appSettings.maxColumns = appSettings.maxColumns || 7;
  appSettings.minCoverHeight = appSettings.minCoverHeight || '136px';
  appSettings.sidebarWidth = appSettings.sidebarWidth || '192px';

  appSettings.showRomCount = appSettings.showRomCount != false;
  appSettings.showShadows = appSettings.showShadows != false;
  appSettings.theme = appSettings.theme || 'windows';

  if (appSettings.showShadows) {
    jQuery('body').addClass('with-shadows');
  }
  jQuery('body').addClass(appSettings.theme.toLowerCase());

  jQuery(':root').css({
    '--cover-font-size': appSettings.coverFontSize,
    '--cover-padding': appSettings.coverPadding,
    '--cover-width': appSettings.coverWidth,
    '--max-columns': appSettings.maxColumns,
    '--min-cover-height': appSettings.minCoverHeight,
    '--sidebar-width': appSettings.sidebarWidth,
  });
};

const replaceExtension = (filename, newExtension) => {
  return filename.includes('.')
    ? filename.replace(/\.[^.]+$/, `.${newExtension}`)
    : `${filename}.${newExtension}`;
};

const sanitizeEmulatorName = (filename) => {
  return filename.replace(/[\s-_]+.*/g, '');
};

const sanitizeRomName = (filename) => {
  return filename.replace(/\s*(\(.*?\)|\[.*?\]|{.*?}|.*\/|.*\\)\s*/g, '');
};

const buildPath = (...pathParts) => {
  return pathParts.filter((path) => !!path).join('/');
};

const bindKeyboardKeys = () => {
  platforms = romSettings.platforms
    .filter(
      ({ name, type, roms }) => !!(name && type !== 'label' && roms.length)
    )
    .map((platform) => platform.name);

  const hash = window.location.hash.substring(1);
  selectedPlatformIndex = platforms.includes(hash)
    ? platforms.indexOf(hash)
    : 0;
  setHashAndScroll(platforms[selectedPlatformIndex]);

  document.addEventListener('keydown', (event) => {
    switch (event.key.toUpperCase()) {
      case 'ARROWUP':
      case 'W':
        onDirectionPress(event, Key.Up);
        break;
      case 'ARROWLEFT':
      case 'A':
        onDirectionPress(event, Key.Left);
        break;
      case 'ARROWDOWN':
      case 'S':
        onDirectionPress(event, Key.Down);
        break;
      case 'ARROWRIGHT':
      case 'D':
        onDirectionPress(event, Key.Right);
        break;
      default:
        console.log(`${event.key} pressed`);
    }
  });
};

const onDirectionPress = (event, direction) => {
  event.preventDefault();
  console.log(`${direction} pressed`);

  if ([Key.Up, Key.Down].includes(direction)) {
    if (direction === Key.Up) {
      selectedPlatformIndex--;

      if (selectedPlatformIndex < 0) {
        selectedPlatformIndex = platforms.length - 1;
      }
    }
    if (direction === Key.Down) {
      selectedPlatformIndex++;

      if (selectedPlatformIndex > platforms.length - 1) {
        selectedPlatformIndex = 0;
      }
    }
  }

  setHashAndScroll(platforms[selectedPlatformIndex]);
};

const setHashAndScroll = (hash) => {
  history.pushState(
    null,
    null,
    hash ? `#${hash}` : window.location.pathname + window.location.search
  );

  const targetElement = document.getElementById(hash);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const baseUrl = getBaseUrl();

const leftSidebarEl = jQuery('#leftSidebar');
const romsContainerEl = jQuery('#romsContainer');
const rightSidebarEl = jQuery('#rightSidebar');

const Key = {
  Up: 'UP',
  Left: 'LEFT',
  Down: 'DOWN',
  Right: 'RIGHT',
};

let platforms;
let selectedPlatformIndex;
