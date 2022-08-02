const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:image/jpg;base64,${window.btoa(binary)}`;
};

const generatePlatformLinks = (platforms) => {
  const baseUrl = getBaseUrl();

  const platformAnchors = jQuery('<ul class="links-container"></ul>');

  const sectionAnchors = jQuery('<ul class="links-container"></ul>');

  platforms.forEach((platform, i) => {
    const label = platform;

    platformAnchors.append(
      `<li><a href="${baseUrl}?platform=${platform}">${label}</a></li>`
    );
    sectionAnchors.append(
      `<li><a href="${baseUrl}#${platform}">${label}</a></li>`
    );
  });

  jQuery('#platformFilter').append(platformAnchors);
  jQuery('#platformLinks').append(sectionAnchors);
};

const generatePlatforms = async () => {
  const searchParams = getSearchParams();
  const platformParam =
    searchParams.platform && decodeURI(searchParams.platform);

  const platformKeys = Object.keys(romSettings.platforms).filter(
    (key) => romSettings.platforms[key].roms.length
  );

  if (platformParam) {
    jQuery('#platformLinks').html('');
    jQuery('#platformFilter').html(`
      <div class="links-container">
        <h3>Limit to: ${platformParam}</h3>
        <a href="${getBaseUrl()}">🡠 All platforms</a>
      </div>
    `);
  } else {
    generatePlatformLinks(platformKeys);
  }

  platformKeys.forEach(async (platformKey) => {
    if (platformParam && platformParam !== platformKey) return;

    const platform = romSettings.platforms[platformKey];
    const roms = platform.roms;

    if (!roms.length) return;

    const platformRoms = jQuery(
      `<div class="platform ${platformKey}">
        <h3 id="${platformKey}">${platformKey}</h3>
      </div>`
    );

    platformRoms.append(await generateRoms(roms, platform));
    jQuery('#romsContainer').append(platformRoms);
  });
};

const getBaseUrl = () => {
  return location.protocol + '//' + location.host + location.pathname;
};

const getSearchParams = () => {
  if (!location.search.length) return [];

  const params = location.search.slice(1).split('&');
  return params.reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[key] = value;
    return acc;
  }, {});
};

const replaceExtension = (filename, newExtension) => {
  return filename.includes('.')
    ? filename.replace(/\.[^.]+$/, `.${newExtension}`)
    : `${filename}.${newExtension}`;
};

const sanitizeRomName = (filename) => {
  return filename.replace(/\s*(\(.*?\)|\[.*?\])\s*/g, '');
};
