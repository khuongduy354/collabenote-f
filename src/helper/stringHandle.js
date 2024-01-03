import { OpTypes, Operation } from "../components/classes/operation";

export const findFirstDiff = (a, b) => {
  let i = 0;
  if (a === b) return -1;
  while (a.charAt(i) === b.charAt(i)) i++;

  return i;
};

export const opsToText = (opsList) => {
  let result = [];
  for (let idx in opsList) {
    let op = opsList[idx];
    switch (op.optype) {
      case OpTypes.Insert:
        result[op.position] = op.text;
        break;
      case OpTypes.Delete:
        result[op.position] = "";
        break;
      default:
        throw new Error("Invalid optypes");
    }
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] === undefined) result[i] = " ";
  }
  return result.join("");
};
export const extractOperation = (oldVal, newVal) => {
  if (oldVal.length === newVal.length) {
    return null;
  }
  if (oldVal.length > newVal.length) {
    let pos = findFirstDiff(oldVal, newVal);
    return new Operation(OpTypes.Delete, { position: pos });
  }
  if (oldVal.length < newVal.length) {
    let pos = findFirstDiff(oldVal, newVal);
    return new Operation(OpTypes.Insert, {
      position: pos,
      text: newVal.charAt(pos),
    });
  }
};
