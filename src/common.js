const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpg;base64,${window.btoa(binary)}`;
};

const generatePlatformLink = (ulEl, platform) => {
  const { name, roms, type } = platform;

  if (type === 'separator') {
    ulEl.append(`<hr />`);
    return;
  }

  if (type === 'label') {
    ulEl.append(`
      <li class="platform-name secondary static">
        <strong>${name}</strong>
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
  const ulEl = jQuery(`<ul class="link-list no-style"></ul>`);

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
    <p>
      <span class="secondary">
        Default emulator
      </span><br />
      <span>
        ${getLastPathSection(platform.emulatorPath, true)}
      </span>
    </p>
  `);

  rightSidebarEl.append(`
    <p>
      <span class="secondary">
        Default cover path
      </span><br />
      <span>
        /${platform.coverPath || platform.romPath}
      </span>
    </p>
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

const processSettings = (settings) => {
  window.appSettings = settings.appSettings || {};

  if (appSettings.coverFontSize) {
    jQuery(':root').css('--cover-font-size', appSettings.coverFontSize);
  }
  if (appSettings.coverPadding) {
    jQuery(':root').css('--cover-padding', appSettings.coverPadding);
  }
  if (appSettings.coverWidth) {
    jQuery(':root').css('--cover-width', appSettings.coverWidth);
  }
  if (appSettings.maxColumns) {
    jQuery(':root').css('--max-columns', appSettings.maxColumns);
  }
  if (appSettings.minCoverHeight) {
    jQuery(':root').css('--min-cover-height', appSettings.minCoverHeight);
  }
  if (appSettings.sidebarWidth) {
    jQuery(':root').css('--sidebar-width', appSettings.sidebarWidth);
  }

  appSettings.coverFontSize = appSettings.coverFontSize || '1.25em';
  appSettings.coverPadding = appSettings.coverPadding || '16px';
  appSettings.coverWidth = appSettings.coverWidth || '192px';
  appSettings.maxColumns = appSettings.maxColumns || 7;
  appSettings.minCoverHeight = appSettings.minCoverHeight || '136px';
  appSettings.showRomCount = appSettings.showRomCount != false;
  appSettings.sidebarWidth = appSettings.sidebarWidth || '192px';

  // jQuery('.platform-info').append(`
  //   <span class="platform-name">Settings</span>
  //   <p>
  //     <small><pre>${JSON.stringify(appSettings, null, 2)}</pre></small>
  //   </p>
  // `);
};

const replaceExtension = (filename, newExtension) => {
  return filename.includes('.')
    ? filename.replace(/\.[^.]+$/, `.${newExtension}`)
    : `${filename}.${newExtension}`;
};

const sanitizeRomName = (filename) => {
  return filename.replace(/\s*(\(.*?\)|\[.*?\]|{.*?}|.*\/|.*\\)\s*/g, '');
};

const buildPath = (...pathParts) => {
  return pathParts.filter((path) => !!path).join('/');
};

const baseUrl = getBaseUrl();

const leftSidebarEl = jQuery('#leftSidebar');
const romsContainerEl = jQuery('#romsContainer');
const rightSidebarEl = jQuery('#rightSidebar');
