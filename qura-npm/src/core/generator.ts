import { CreateQuraCodeOptions } from '../types'
import {
  drawFinder,
  getQrMatrix,
  isCenterCutout,
  isDark,
  isFinderPattern
} from '../utils'

export function generateSvgString(options: Required<CreateQuraCodeOptions>): string {
  const { url, name, color } = options
  const { size, data } = getQrMatrix(url)
  const imageSize = 1024
  const backgroundColor = '#ffffff'

  // Quiet zone of 4 modules as per QR specs
  const moduleSize = imageSize / (size + 8)
  const quietZoneShift = 4
  let paths = ''

  paths += `<rect width="100%" height="100%" fill="${backgroundColor}" />\n`

  drawFinder({ xPos: 0, yPos: 0, quietZoneShift, moduleSize, paths, color })
  drawFinder({ xPos: size - 7, yPos: 0, quietZoneShift, moduleSize, paths, color })
  drawFinder({ xPos: 0, yPos: size - 7, quietZoneShift, moduleSize, paths, color })

  // Main QR dots (rounded circles)
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (
        !isDark({
          row: r,
          col: c,
          size, data
        }) ||
        isFinderPattern({
          row: r,
          col: c,
          size
        }) ||
        isCenterCutout({
          row: r,
          col: c,
          size,
          name
        })
      ) continue

      const x = (c + quietZoneShift) * moduleSize
      const y = (r + quietZoneShift) * moduleSize
      const radius = moduleSize * 0.45 // slight spacing creates dot effect
      const cx = x + moduleSize / 2
      const cy = y + moduleSize / 2

      paths += `  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${color}" />\n`
    }
  }

  // Draw Center Brand Name
  if (name) {
    const spaceSize = 8 * moduleSize
    const cx = (size + 8) * moduleSize / 2
    const cy = (size + 8) * moduleSize / 2

    const fontSize = spaceSize * 0.35
    paths += `  <text x="${cx}" y="${cy}" font-family="sans-serif" font-weight="bold" font-size="${fontSize}px" fill="${color}" text-anchor="middle" dominant-baseline="central">${name.slice(0, 20)}</text>\n`
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${imageSize} ${imageSize}" width="${imageSize}" height="${imageSize}">\n${paths}</svg>`
}
