import QRCode from 'qrcode'
import { QuraCodeError } from "../errors"

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


export function isDark({
  row,
  col,
  size,
  data
}: {
  row: number,
  col: number,
  size: number,
  data: Uint8Array<ArrayBufferLike>
}) {
  if (row < 0 || row >= size || col < 0 || col >= size) return false
  return data[row * size + col] === 1
}

export function isFinderPattern({
  row,
  col,
  size
}: {
  row: number,
  col: number,
  size: number
}) {
  return (row < 7 && col < 7) ||
    (row < 7 && col >= size - 7) ||
    (row >= size - 7 && col < 7)
}

export function isCenterCutout({
  row,
  col,
  size,
  name
}: {
  row: number,
  col: number,
  size: number,
  name: string
}) {
  // Cutout a 7x7 hole in the middle if there is a text name
  if (!name) return false
  const centerStart = Math.floor(size / 2) - 4
  const centerEnd = Math.floor(size / 2) + 3
  return (row >= centerStart && row <= centerEnd) && (col >= centerStart && col <= centerEnd)
}

export function drawFinder({
  xPos,
  yPos,
  quietZoneShift,
  moduleSize,
  paths,
  color
}: {
  xPos: number,
  yPos: number,
  quietZoneShift: number,
  moduleSize: number,
  paths: string,
  color: string
}) {
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