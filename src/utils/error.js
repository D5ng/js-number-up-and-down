export class NumberTypeError extends Error {
  constructor(message) {
    super(message)
    this.name = "TypeError"
  }
}
