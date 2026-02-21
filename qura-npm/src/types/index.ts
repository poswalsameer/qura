export interface CreateQuraCodeOptions {
  /** The text brand name to display in the center if no logo is provided */
  name: string
  /** Primary color of the QR code (hex format, e.g., #1A73E8) */
  color: string
  /** Background color of the QR code */
  backgroundColor?: string
  /** URL or text data to encode */
  url: string
  /** Optional logo image path or URL */
  logo?: string
  /** The height/width of the output image in pixels (default: 1024) */
  size?: number
  /** The output format (default: png) */
  format?: 'png' | 'svg'
}

export interface QuraCodeResult {
  /** Raw bytes of the image */
  buffer: Buffer
  /** Base64 string of the image data */
  base64: string
  /** Complete Data URL ready to be used as an image src / browser tag */
  dataUrl: string
  /** Mime type (e.g., image/png or image/svg+xml) */
  mimeType: string
}
