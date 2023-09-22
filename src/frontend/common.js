const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpg;base64,${window.btoa(binary)}`;
};

const generatePlatformLink = (platform) => {
  const { name, roms, type } = platform;

  if (type === 'separator') {
    platformLinks.append(`<hr />`);
    return;
  }

  if (type === 'label') {
    platformLinks.append(`
      <li class="platform-name secondary">
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

  const liEl = jQuery(`<li class="anchor"></li>`);
  liEl.append(anchorEl);
  platformLinks.append(liEl);
};

const generatePlatforms = async () => {
  romSettings.platforms.forEach(async (platform) => {
    generatePlatformLink(platform);

    platform.coverPath = platform.coverPath || platform.name;
    platform.romPath = platform.romPath || platform.name;

    if (!platform.roms?.length) return;

    const platformNameEl = jQuery(`
      <h3 id="${platform.name}">
        ${platform.name}
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
    romsContainer.append(platformEl);
  });
};

const getBaseUrl = () => {
  return location.protocol + '//' + location.host + location.pathname;
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
  if (appSettings.minCoverHeight) {
    jQuery(':root').css('--min-cover-height', appSettings.minCoverHeight);
  }
  if (appSettings.maxColumns) {
    jQuery(':root').css('--max-columns', appSettings.maxColumns);
  }

  appSettings.coverFontSize = appSettings.coverFontSize || '1.25em';
  appSettings.coverPadding = appSettings.coverPadding || '16px';
  appSettings.coverWidth = appSettings.coverWidth || '192px';
  appSettings.minCoverHeight = appSettings.minCoverHeight || '136px';
  appSettings.maxColumns = appSettings.maxColumns || 7;
  appSettings.showRomCount = appSettings.showRomCount != false;

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

const platformLinks = jQuery('#platformLinks');
const romsContainer = jQuery('#romsContainer');
