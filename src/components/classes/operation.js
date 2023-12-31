export class OpTypes {
  static Delete = 0;
  static Insert = 1;
}
export class Operation {
  constructor(optype, payload) {
    this.optype = optype;
    switch (optype) {
      case OpTypes.Delete:
        this.position = payload.position;
        break;
      case OpTypes.Insert:
        this.position = payload.position;
        this.text = payload.text;
        break;
      default:
        throw new Error("Invalid optypes");
    }
  }
}
