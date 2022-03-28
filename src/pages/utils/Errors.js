export class SubmitError extends Error {
  constructor(message) {
    super(message);
    this.name = "SubmitError";
  }
}

export class CalcAmountError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalcAmountError";
  }
}