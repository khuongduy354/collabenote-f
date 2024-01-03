// import { OpTypes, Operation } from "../components/classes/operation";
// import { Tdi, Tii, Tid, Tdd } from "../components/classes/OTfunctions";
const { OpTypes, Operation } = require("../components/classes/operation");
const { Tdi, Tii, Tid, Tdd } = require("../components/classes/OTfunctions");

test("Tii", () => {
  let op1 = new Operation(OpTypes.Insert, { position: 1, text: "a" });
  let op2 = new Operation(OpTypes.Insert, { position: 0, text: "b" });

  let result = new Operation(OpTypes.Insert, { position: 2, text: "a" });

  expect(Tii(op1, op2)).toEqual(result);

  op1 = new Operation(OpTypes.Insert, { position: 0, text: "a" });
  op2 = new Operation(OpTypes.Insert, { position: 0, text: "b" });

  result = new Operation(OpTypes.Insert, { position: 1, text: "a" });

  expect(Tii(op1, op2)).toEqual(result);
});
test("Tid", () => {
  let op1 = new Operation(OpTypes.Insert, { position: 1, text: "a" });
  let op2 = new Operation(OpTypes.Delete, { position: 0 });

  let result = new Operation(OpTypes.Insert, { position: 0, text: "a" });
  expect(Tid(op1, op2)).toEqual(result);
});
test("Tdi", () => {
  let op1 = new Operation(OpTypes.Delete, { position: 1 });
  let op2 = new Operation(OpTypes.Insert, { position: 0, text: "b" });

  let result = new Operation(OpTypes.Delete, { position: 2 });
  expect(Tdi(op1, op2)).toEqual(result);
});
test("Tdd", () => {
  let op1 = new Operation(OpTypes.Delete, { position: 1 });
  let op2 = new Operation(OpTypes.Delete, { position: 0 });

  let result = new Operation(OpTypes.Delete, { position: 0 });
  expect(Tdd(op1, op2)).toEqual(result);
});
