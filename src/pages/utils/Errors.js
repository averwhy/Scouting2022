class SubmitError extends Error {
  constructor(message) {
    super(message);
    this.name = "SubmitError";
  }
}

class CalcAmountError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalcAmountError";
  }
}


export default [SubmitError, CalcAmountError];