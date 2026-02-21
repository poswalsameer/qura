import sharp from 'sharp'
import { CreateQuraCodeOptions, QuraCodeResult } from '../types'
import { generateSvgString } from '../core/generator'
import { QuraCodeError } from '../errors'

/**
 * Creates a QuraCode based on exactly defined parameters avoiding DOM constraints
 *
 * @param options CreateQuraCodeOptions
 * @returns Promise<QuraCodeResult> including buffer, base64 and dataUrls
 */
export async function createQuraCode(options: CreateQuraCodeOptions): Promise<QuraCodeResult> {
  if (!options.url) {
    throw new QuraCodeError('URL must be provided to generate a QuraCode.', 'QURA_ERR_VALIDATION')
  }

  const finalOptions: Required<CreateQuraCodeOptions> = {
    name: options.name || '',
    color: options.color || '#000000',
    url: options.url,
    logo: options.logo || '',
    size: options.size || 1024,
    format: options.format || 'png',
    backgroundColor: options.backgroundColor || '#ffffff',
  }

  try {
    const svgString = generateSvgString(finalOptions)
    const svgBuffer = Buffer.from(svgString)

    if (finalOptions.format === 'svg') {
      const base64 = svgBuffer.toString('base64')
      const mimeType = 'image/svg+xml'

      return {
        buffer: svgBuffer,
        base64,
        dataUrl: `data:${mimeType};base64,${base64}`,
        mimeType
      }
    } else {
      // Create PNG leveraging the highly performant Sharp library
      const pngBuffer = await sharp(svgBuffer)
        .png()
        .toBuffer()

      const base64 = pngBuffer.toString('base64')
      const mimeType = 'image/png'

      return {
        buffer: pngBuffer,
        base64,
        dataUrl: `data:${mimeType};base64,${base64}`,
        mimeType
      }
    }
  } catch (error: any) {
    if (error instanceof QuraCodeError) {
      throw error
    }
    throw new QuraCodeError(`Failed to process QR Code rendering: ${error.message}`, 'QURA_ERR_RENDER')
  }
}
