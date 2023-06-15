/**
 * Removes accentuated characters from a string. Taken from:
 * https://stackoverflow.com/questions/70287406/how-to-replace-all-accented-characters-with-english-equivalents
 */
export const normalizeString = (string: string) => {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}