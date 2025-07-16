export const norm = (str) => {
    const lc = str.toLowerCase();
    const noSpaces = lc.replace(/ /g, '');
    return noSpaces;
  }