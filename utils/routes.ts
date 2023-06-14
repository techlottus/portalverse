export const isValidPath = (path: string) => {
  return !!path?.trim() && !path?.includes("//") && !path?.includes(" ");
};

/**
 * Normalizes the path format by removing any slashes at the beginning and end of a path. For instance,
 * "/a/b", "a/b/" and "/a/b/" all end up as "a/b" 
 * Taken from: https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end
 */
export const normalizePath = (path: string) => path?.replace(/(^\/+|\/+$)/gm, "");