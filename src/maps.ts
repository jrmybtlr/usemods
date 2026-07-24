export const currencySymbols = new Map([
  ['en-US', 'USD'], ['en-GB', 'GBP'], ['en-AU', 'AUD'], ['en-CA', 'CAD'], ['en-NZ', 'NZD'],
  ['en-ZA', 'ZAR'], ['de-DE', 'EUR'], ['fr-FR', 'EUR'], ['es-ES', 'EUR'], ['it-IT', 'EUR'],
  ['pt-PT', 'EUR'], ['nl-NL', 'EUR'], ['fi-FI', 'EUR'], ['da-DK', 'DKK'], ['sv-SE', 'SEK'],
  ['nb-NO', 'NOK'], ['pl-PL', 'PLN'], ['tr-TR', 'TRY'], ['ru-RU', 'RUB'], ['ja-JP', 'JPY'],
  ['zh-CN', 'CNY'], ['ko-KR', 'KRW'], ['ar-SA', 'SAR'], ['he-IL', 'ILS'], ['id-ID', 'IDR'],
  ['ms-MY', 'MYR'], ['th-TH', 'THB'], ['vi-VN', 'VND'], ['hi-IN', 'INR'], ['bn-IN', 'INR'],
  ['pa-IN', 'INR'], ['gu-IN', 'INR'], ['or-IN', 'INR'], ['ta-IN', 'INR'], ['te-IN', 'INR'],
  ['kn-IN', 'INR'], ['ml-IN', 'INR'],
])

export const configLocales = new Set([
  'en-US', 'en-GB', 'en-CA', 'en-AU', 'fr-FR', 'es-ES', 'de-DE', 'it-IT', 'ja-JP', 'ko-KR',
  'zh-CN', 'zh-TW', 'pt-PT', 'pt-BR', 'ru-RU', 'nl-NL', 'da-DK', 'sv-SE', 'nb-NO', 'fi-FI',
  'pl-PL', 'tr-TR', 'ar-SA', 'he-IL', 'id-ID', 'ms-MY', 'th-TH', 'vi-VN',
])

export const configUnits = new Set([
  // Area
  'acre', 'hectare',
  // Digital Storage
  'bit', 'byte', 'kilobit', 'kilobyte', 'megabit', 'megabyte', 'gigabit', 'gigabyte', 'terabit', 'terabyte', 'petabyte',
  // Temperature
  'celsius', 'fahrenheit',
  // Length
  'centimeter', 'inch', 'foot', 'yard', 'mile', 'mile-scandinavian', 'millimeter', 'meter', 'kilometer',
  // Volume
  'fluid-ounce', 'gallon', 'liter', 'milliliter',
  // Weight
  'gram', 'kilogram', 'ounce', 'pound', 'stone',
  // Time
  'day', 'hour', 'microsecond', 'millisecond', 'minute', 'month', 'nanosecond', 'second', 'week', 'year',
  // Miscellaneous
  'degree', 'percent',
])

export const unchangingPlurals = new Set([
  'sheep', 'fish', 'deer', 'hay', 'moose', 'series', 'species', 'aircraft', 'bison', 'buffalo',
  'cod', 'elk', 'halibut', 'hovercraft', 'lego', 'mackerel', 'salmon', 'spacecraft', 'swine',
  'trout', 'tuna',
])

export const irregularPlurals = new Map([
  ['addendum', 'addenda'], ['agendum', 'agenda'], ['alumnus', 'alumni'], ['analysis', 'analyses'],
  ['anathema', 'anathemata'], ['antenna', 'antennae'], ['appendix', 'appendices'], ['axis', 'axes'],
  ['bacterium', 'bacteria'], ['basis', 'bases'], ['bureau', 'bureaux'], ['cactus', 'cacti'],
  ['cherub', 'cherubim'], ['child', 'children'],
  ['corrigendum', 'corrigenda'], ['crisis', 'crises'], ['criterion', 'criteria'], ['curriculum', 'curricula'],
  ['custom', 'customs'], ['datum', 'data'], ['diagnosis', 'diagnoses'], ['die', 'dice'], ['dogma', 'dogmata'],
  ['ellipsis', 'ellipses'], ['erratum', 'errata'], ['focus', 'foci'], ['foot', 'feet'],
  ['formula', 'formulae'], ['forum', 'fora'], ['fungus', 'fungi'], ['genus', 'genera'], ['goose', 'geese'],
  ['hypothesis', 'hypotheses'], ['index', 'indices'], ['lemma', 'lemmata'], ['louse', 'lice'], ['man', 'men'],
  ['matrix', 'matrices'], ['medium', 'media'], ['memorandum', 'memoranda'], ['millennium', 'millennia'], ['mouse', 'mice'],
  ['nucleus', 'nuclei'],
  ['oasis', 'oases'], ['ovum', 'ova'], ['ox', 'oxen'], ['parenthesis', 'parentheses'],
  ['person', 'people'], ['phenomenon', 'phenomena'], ['radius', 'radii'], ['schema', 'schemata'],
  ['stimulus', 'stimuli'], ['stigma', 'stigmata'],
  ['stoma', 'stomata'], ['stratum', 'strata'], ['syllabus', 'syllabi'], ['symposium', 'symposia'], ['synthesis', 'syntheses'],
  ['thesis', 'theses'], ['tooth', 'teeth'], ['vertex', 'vertices'], ['woman', 'women'],
])

export const numberUnderTwenty = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
export const numberTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
export const numberScales = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion']

export const formatTitleExceptions = new Set([
  'a', 'an', 'to', 'the', 'for', 'and', 'nor', 'but', 'or', 'yet', 'so', 'in', 'is', 'it', 'than', 'on', 'at', 'with',
  'under', 'above', 'from', 'of', 'although', 'because', 'since', 'unless',
])

// File Size Conversion
export const bytesInUnit = new Map([
  ['byte', 1],
  ['kilobyte', 1024],
  ['megabyte', 1024 ** 2],
  ['gigabyte', 1024 ** 3],
  ['terabyte', 1024 ** 4],
  ['petabyte', 1024 ** 5],
])

// Length Conversion
export const lengthUnitConversions = new Map([
  ['millimeter', { value: 1, system: 'metric' }],
  ['centimeter', { value: 10, system: 'metric' }],
  ['meter', { value: 1000, system: 'metric' }],
  ['kilometer', { value: 1000000, system: 'metric' }],
  ['inch', { value: 25.4, system: 'imperial' }],
  ['foot', { value: 304.8, system: 'imperial' }],
  ['yard', { value: 914.4, system: 'imperial' }],
  ['mile', { value: 1609344, system: 'imperial' }],
])

// Volume Conversion
export const volumeUnitConversions = new Map([
  ['milliliter', { value: 1, system: 'metric' }],
  ['liter', { value: 1000, system: 'metric' }],
  ['cup', { value: 236.588, system: 'imperial' }],
  ['tablespoon', { value: 14.7868, system: 'imperial' }],
  ['teaspoon', { value: 4.92892, system: 'imperial' }],
])

export const weightUnitConversions = new Map([
  ['gram', { value: 1, system: 'metric' }],
  ['kilogram', { value: 1000, system: 'metric' }],
  ['ounce', { value: 28.3495, system: 'imperial' }],
  ['pound', { value: 453.592, system: 'imperial' }],
  ['stone', { value: 6350.293, system: 'imperial' }],
])
