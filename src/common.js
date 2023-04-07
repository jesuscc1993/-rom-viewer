const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpg;base64,${window.btoa(binary)}`;
};

const generatePlatformLink = (platform) => {
  const { label, roms, type } = platform;

  if (type === 'separator') {
    platformLinks.append(`<hr />`);
    return;
  }

  if (type === 'label') {
    platformLinks.append(`
        <li class="platform-label secondary">
          <strong>${label}</strong>
        </li>
      `);
    return;
  }

  if (!roms?.length) return;

  const anchorEl = jQuery(`
      <a href="${baseUrl}#${label}">
        ${label}
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

    platform.coverPath = platform.coverPath || platform.label;
    platform.romPath = platform.romPath || platform.label;

    if (!platform.roms?.length) return;

    const platformLabelEl = jQuery(`
      <h3 id="${platform.label}">
        ${platform.label}
      </h3>
    `);

    if (appSettings.showRomCount) {
      platformLabelEl.append(`
        <span class="tertiary">
          (${platform.roms.length})
        <span>
      `);
    }

    const platformEl = jQuery(`<div class="platform ${platform.label}"></div>`);
    platformEl.append(platformLabelEl);
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
  if (appSettings.coverSize) {
    jQuery(':root').css('--cover-size', appSettings.coverSize);
  }
  if (appSettings.maxColumns) {
    jQuery(':root').css('--max-columns', appSettings.maxColumns);
  }

  appSettings.coverFontSize = appSettings.coverFontSize || '1.25em';
  appSettings.coverSize = appSettings.coverSize || '192px';
  appSettings.maxColumns = appSettings.maxColumns || 7;
  appSettings.showRomCount = appSettings.showRomCount != false;

  // jQuery('.platform-info').append(`
  //   <span class="platform-label">Settings</span>
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

const baseUrl = getBaseUrl();

const platformLinks = jQuery('#platformLinks');
const romsContainer = jQuery('#romsContainer');
