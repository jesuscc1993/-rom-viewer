let platforms;
let platformNames;
let selectedPlatform;
let selectedPlatformIndex;
let selectedRomIndex = 0;
let selectedRom;

const Key = {
  Up: 'UP',
  Left: 'LEFT',
  Down: 'DOWN',
  Right: 'RIGHT',
};

/* keyboard navigation */
const bindKeyboardKeys = () => {
  platforms = romSettings.platforms.filter(({ roms }) => !!roms?.length);
  platformNames = platforms.map((platform) => platform.name);

  const hash = window.location.hash.substring(1);
  setSelectedPlatformByIndex(
    platformNames.includes(hash) ? platformNames.indexOf(hash) : 0
  );

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
        console.debug(`${event.key} pressed`);
    }
  });
};

const onDirectionPress = (event, direction) => {
  event.preventDefault();

  if ([Key.Up, Key.Down].includes(direction)) {
    if (direction === Key.Up) selectPrevPlatform();
    if (direction === Key.Down) selectNextPlatform();
  }

  if ([Key.Left, Key.Right].includes(direction)) {
    if (direction === Key.Left) selectPrevRom();
    if (direction === Key.Right) selectNextRom();
  }
};

/* platform selection */
const selectPrevPlatform = () => {
  setSelectedPlatformByIndex(
    (selectedPlatformIndex - 1 + platformNames.length) % platformNames.length
  );
};

const selectNextPlatform = () => {
  setSelectedPlatformByIndex(
    (selectedPlatformIndex + 1) % platformNames.length
  );
};

const setSelectedPlatformByIndex = (platformIndex = selectedPlatformIndex) => {
  selectedPlatformIndex = platformIndex;
  selectedPlatform = platforms[platformIndex];
  setSelectedRomByIndex(0);
  setHashAndScroll(selectedPlatform.name);
};

/* rom selection */
const selectPrevRom = () => {
  setSelectedRomByIndex(
    (selectedRomIndex - 1 + selectedPlatform.roms.length) %
      selectedPlatform.roms.length
  );
};

const selectNextRom = () => {
  setSelectedRomByIndex((selectedRomIndex + 1) % selectedPlatform.roms.length);
};

const setSelectedRomByIndex = (romIndex = selectedRomIndex) => {
  selectedRomIndex = romIndex;
  selectedRom = selectedPlatform.roms[romIndex];
  console.debug(
    `∞ selectedRomIndex, selectedRom:`,
    selectedRomIndex,
    selectedRom
  );
};
