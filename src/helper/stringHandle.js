export const findFirstDiff = (a, b) => {
  let i = 0;
  if (a === b) return -1;
  while (a.charAt(i) === b.charAt(i)) i++;

  return i;
};
