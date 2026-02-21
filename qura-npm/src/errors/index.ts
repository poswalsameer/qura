export class QuraCodeError extends Error {
  public readonly code: string

  constructor(message: string, code: string = 'QURA_ERR_INTERNAL') {
    super(message)
    this.name = 'QuraCodeError'
    this.code = code

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QuraCodeError)
    }
  }
}
