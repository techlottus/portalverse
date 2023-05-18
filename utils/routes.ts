export const isValidPath = (path: string) => {
  return !!path.trim() && !path?.includes("//") && !path?.includes(" ");
};

// https://stackoverflow.com/questions/19134860/javascript-remove-strings-in-beginning-and-end
export const normalizePath = (path: string) => path?.replace(/(^\/+|\/+$)/gm, "");