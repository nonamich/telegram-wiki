export const TELEGRAM_MAX_CONTENT_LENGTH = 500;
export const TELEGRAM_MAX_IMAGE_DIMENSIONS = 4000;
export const TELEGRAM_PREFER_IMAGE_WIDTH = 1200;
export const TELEGRAM_MAX_IMAGE_BYTES = 3_000_000;
export const TELEGRAM_ALLOWED_TAGS = [
  'b',
  'i',
  'u',
  's',
  'b',
  'a',
  'tg-emoji',
  'code',
  'pre',
  'strong',
  'em',
  'ins',
  'strike',
  'tg-spoiler',
];
export const TELEGRAM_DANGEROUSLY_HTML_TAG = 'body';
export const TELEGRAM_TAGS_TO_UNWRAP = [TELEGRAM_DANGEROUSLY_HTML_TAG];
export const TELEGRAM_BLACK_LIST_OF_IMAGE = [
  'Путін',
  'Путин',
  'Император_Николай_II',
  'Петра_I',
  'Putin',
  'Flag_of_Russia',
  'Flag_of_the_Soviet',
  'Russian_Imperial_Army',
  'Forces_of_the_Russian',
  'Flag_of_Germany_\\(1935–1945\\)',
  'Hitler',
  'arms_of_Russia',
];
export const TELEGRAM_MAX_ON_THIS_DAY_TEXT = 600;
