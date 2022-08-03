const fs = require('fs');

const configPath = `neutralino.config.json`;
const packagePath = `package.json`;

const configPackage = (versionNumber) => {
  let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  if (versionNumber) {
    packageJson.version = versionNumber;
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
};

const configNeu = (isRelease, versionNumber) => {
  let configJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const isDev = !isRelease;
  configJson.logging = {
    enabled: isDev,
    writeToLogFile: isDev,
  };
  configJson.modes.window.enableInspector = isDev;

  if (versionNumber) {
    configJson.version = versionNumber;
  }

  fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2), 'utf8');
};

const execute = () => {
  const params = process.argv.slice(2);
  if (
    (params.length == 1 && !['true', 'false'].includes(params[0])) ||
    (params.length == 2 && !params[1].match(/^\d+\.\d+\.\d+$/)) ||
    params.length > 2
  ) {
    return console.error(
      'Invalid parameters. The script expects 0-2 parameters (isRelease: bool, versionNumber: version).'
    );
  }

  const isRelease = (params.length && params[0] == 'true') || false;
  const version = (params.length > 1 && params[1]) || undefined;

  configPackage(version);
  configNeu(isRelease, version);

  console.log(
    `Successfully configured ${isRelease ? 'release' : 'dev'} build${
      version ? ` ${version}` : ''
    }.`
  );
};

execute();
