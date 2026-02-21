import sharp from 'sharp'
import { CreateQuraCodeOptions, QuraCodeResult } from '../types'
import { generateSvgString } from './generator'

/**
 * Creates a QuraCode based on exactly defined parameters avoiding DOM constraints
 *
 * @param options CreateQuraCodeOptions
 * @returns Promise<QuraCodeResult> containing success boolean and base64 string
 */
export async function createQuraCode(options: CreateQuraCodeOptions): Promise<QuraCodeResult> {
  if (!options.url || !options.name || !options.color) {
    return {
      success: false,
      base64: ''
    }
  }

  const finalOptions: Required<CreateQuraCodeOptions> = {
    name: options.name,
    color: options.color,
    url: options.url,
  }

  try {
    const svgString = generateSvgString(finalOptions)
    const svgBuffer = Buffer.from(svgString)

    // Create PNG leveraging the highly performant Sharp library
    const pngBuffer = await sharp(svgBuffer)
      .png()
      .toBuffer()

    const base64 = pngBuffer.toString('base64')

    return {
      success: true,
      base64
    }
  } catch (error: any) {
    return {
      success: false,
      base64: ''
    }
  }
}
