export interface CreateQuraCodeOptions {
  /** The text brand name to display in the center */
  name: string
  /** Primary color of the QR code (hex format, e.g., #1A73E8) */
  color: string
  /** URL or text data to encode */
  url: string
}

export interface QuraCodeResult {
  /** Indicates whether the QR code generation was successful */
  success: boolean
  /** The Base64 encoded string of the PNG image */
  base64: string
}
