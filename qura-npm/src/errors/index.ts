export class QuraCodeError extends Error {
  public readonly code: string

  constructor(message: string, code: string = 'QURA_ERR_INTERNAL') {
    super(message)
    this.name = 'QuraCodeError'
    this.code = code

    // Maintain proper stack trace in V8 engines (like Node)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QuraCodeError)
    }
  }
}
