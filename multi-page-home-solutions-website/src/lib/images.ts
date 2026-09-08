// Central image catalog sourced from premium stock photography.
// Strings are remote URLs referenced directly in <img> tags.

const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=${h}&w=${w}`;

export const img = {
  // Interiors / comfort
  livingFireplace: px(36777507),
  livingArmchair: px(12212553),
  livingWood: px(6580224),
  livingSnow: px(24827075),
  studio1: px(6238684),
  studio2: px(6238683),
  cottageSofa: px(7061395),
  livingRustic: px(7746476),
  earthLiving: px(32631105),

  // Houses / property
  brickHouseA: px(7587470),
  brickHouseB: px(31406334),
  homesRow: px(28575436),
  shutterHouse: px(15303808),
  warmWindow: px(11912319),
  brickHouseC: px(8143707),
  estate: px(8143668),
  mansion: px(8143683),
  backyard: px(7174108),
  forestHouse: px(7587467),

  // Energy / heating
  thermostat: px(36818203),
  radiator: px(11056184),
  heatPumpIn: px(20046689),
  acPanel: px(32737485),
  heatPumpOut: px(38067300),

  // Seasonal
  autumnTable: px(9969186),
  firewoodWall: px(31571087),
  firewoodPile: px(38168447),
  fireplaceCoffee: px(15569417),
  fireplaceWoman: px(12932972),
  firewoodBaskets: px(20033324),

  // Maintenance / property care
  paintRoller: px(5799054),
  paintRollerOrange: px(5799051),
  paintWhite: px(5317151),
  paintTools: px(5799130),
  ladderPaint: px(7218525),
  peoplePainting: px(7218029),

  // Lifestyle / people
  readingMagazine: px(7283599),
  mugCouch: px(8278951),
  readingSofa: px(6347749),
  handsMagazine: px(28500448),
  readingBed: px(6633710),

  // Product still life (square-ish)
  ceramicVase: px(29904622, 940, 940),
  marbleTable: px(26593542, 940, 940),
};

export type ImageKey = keyof typeof img;
