import QRCode from 'qrcode'
import { CreateQuraCodeOptions } from '../types'
import { QuraCodeError } from '../errors'

export function getQrMatrix(data: string) {
  try {
    const qr = QRCode.create(data, { errorCorrectionLevel: 'H' })
    return {
      size: qr.modules.size,
      data: qr.modules.data
    }
  } catch (error: any) {
    throw new QuraCodeError(`Failed to generate QR Matrix: ${error.message}`, 'QURA_ERR_MATRIX')
  }
}

export function generateSvgString(options: Required<CreateQuraCodeOptions>): string {
  const { url, name, color, backgroundColor, size: imageSize, logo } = options
  const { size, data } = getQrMatrix(url)

  // Quiet zone of 4 modules as per QR specs
  const moduleSize = imageSize / (size + 8)
  const quietZoneShift = 4

  const isDark = (row: number, col: number) => {
    if (row < 0 || row >= size || col < 0 || col >= size) return false
    return data[row * size + col] === 1
  }

  const isFinderPattern = (row: number, col: number) => {
    return (row < 7 && col < 7) ||
      (row < 7 && col >= size - 7) ||
      (row >= size - 7 && col < 7)
  }

  const isCenterCutout = (row: number, col: number) => {
    // Cutout a 7x7 hole in the middle if there is a logo or text name
    if (!name && !logo) return false
    const centerStart = Math.floor(size / 2) - 4
    const centerEnd = Math.floor(size / 2) + 3
    return (row >= centerStart && row <= centerEnd) && (col >= centerStart && col <= centerEnd)
  }

  let paths = ''

  // Background
  paths += `<rect width="100%" height="100%" fill="${backgroundColor}" />\n`

  // Finder Patterns (drawn with extra rounded corners similar to qr-code-styling)
  const drawFinder = (xPos: number, yPos: number) => {
    const x = (xPos + quietZoneShift) * moduleSize
    const y = (yPos + quietZoneShift) * moduleSize

    const outrLength = 7 * moduleSize
    const innrLength = 3 * moduleSize

    const strokeWidth = moduleSize
    const outrRadius = outrLength * 0.25
    const innrRadius = innrLength * 0.5

    // Outer frame
    paths += `  <rect x="${x + strokeWidth / 2}" y="${y + strokeWidth / 2}" width="${outrLength - strokeWidth}" height="${outrLength - strokeWidth}" rx="${outrRadius}" fill="transparent" stroke="${color}" stroke-width="${strokeWidth}" />\n`
    // Inner dot
    paths += `  <rect x="${x + 2 * moduleSize}" y="${y + 2 * moduleSize}" width="${innrLength}" height="${innrLength}" rx="${innrRadius}" fill="${color}" />\n`
  }

  drawFinder(0, 0)               // Top-Left
  drawFinder(size - 7, 0)        // Top-Right
  drawFinder(0, size - 7)        // Bottom-Left

  // Main QR dots (rounded circles)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!isDark(r, c) || isFinderPattern(r, c) || isCenterCutout(r, c)) continue

      const x = (c + quietZoneShift) * moduleSize
      const y = (r + quietZoneShift) * moduleSize
      const radius = moduleSize * 0.45 // slight spacing creates dot effect
      const cx = x + moduleSize / 2
      const cy = y + moduleSize / 2

      paths += `  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" />\n`
    }
  }

  // Draw Center Logo / Brand Name
  if (logo || name) {
    const spaceSize = 8 * moduleSize
    const cx = (size + 8) * moduleSize / 2
    const cy = (size + 8) * moduleSize / 2

    if (logo) {
      // Typically the logo URL should be a dataURI base64 string for SVG embedding to work natively anywhere.
      // But we just emit the SVG <image> tag.
      const lx = cx - spaceSize / 2
      const ly = cy - spaceSize / 2
      paths += `  <image href="${logo}" x="${lx}" y="${ly}" width="${spaceSize}" height="${spaceSize}" preserveAspectRatio="xMidYMid slice" />\n`
    } else if (name) {
      const fontSize = spaceSize * 0.35
      paths += `  <text x="${cx}" y="${cy}" font-family="sans-serif" font-weight="bold" font-size="${fontSize}px" fill="${color}" text-anchor="middle" dominant-baseline="central">${name.slice(0, 20)}</text>\n`
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${imageSize} ${imageSize}" width="${imageSize}" height="${imageSize}">\n${paths}</svg>`
}
