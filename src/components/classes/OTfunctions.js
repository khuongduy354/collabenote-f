import { OpTypes } from "./operation";

export const Tii = (remoteOp, localOp) => {
  if (remoteOp.position >= localOp.position) {
    remoteOp.position += 1;
  }
  return remoteOp;
};
export const Tid = (remoteOp, localOp) => {
  if (remoteOp.position >= localOp.position) {
    remoteOp.position -= 1;
  }
  return remoteOp;
};
export const Tdd = (remoteOp, localOp) => {
  if (remoteOp.position >= localOp.position) {
    remoteOp.position -= 1;
  }
  return remoteOp;
};
export const Tdi = (remoteOp, localOp) => {
  if (remoteOp.position >= localOp.position) {
    remoteOp.position += 1;
  }
  return remoteOp;
};

export const applyOT = (remoteOp, localOp) => {
  if (remoteOp.optype === OpTypes.Insert) {
    if (localOp.optype === OpTypes.Insert) return Tii(remoteOp, localOp);
    if (localOp.optype === OpTypes.Delete) return Tid(remoteOp, localOp);
  }
  if (remoteOp.optype === OpTypes.Delete) {
    if (localOp.optype === OpTypes.Delete) return Tdd(remoteOp, localOp);
    if (localOp.optype === OpTypes.Insert) return Tdi(remoteOp, localOp);
  }

  // incase of no match, do nothing
  return remoteOp;
};
