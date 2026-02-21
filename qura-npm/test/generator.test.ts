import { describe, it, expect } from 'vitest'
import { createQuraCode } from '../src/index'

describe('QuraCode Generator', () => {
  it('should generate a valid PNG buffer by default', async () => {
    const result = await createQuraCode({
      name: 'Test',
      url: 'https://example.com',
      color: '#1a73e8',
    })

    expect(result).toHaveProperty('buffer')
    expect(result.buffer).toBeInstanceOf(Buffer)
    expect(result).toHaveProperty('base64')
    expect(result).toHaveProperty('dataUrl')
    expect(result.mimeType).toBe('image/png')
    expect(result.dataUrl.startsWith('data:image/png;base64,')).toBe(true)
  })

  it('should generate SVG upon request', async () => {
    const result = await createQuraCode({
      name: 'Test SVG',
      url: 'https://example.com',
      color: '#000000',
      format: 'svg',
    })

    expect(result.buffer).toBeInstanceOf(Buffer)
    expect(result.mimeType).toBe('image/svg+xml')

    const svgString = result.buffer.toString('utf-8')
    expect(svgString.startsWith('<svg')).toBe(true)
    expect(svgString).toContain('<circle') // should use our rounded dots logic
  })

  it('should embed logo in SVG', async () => {
    const result = await createQuraCode({
      name: 'Logo Test',
      url: 'https://example.com',
      color: '#1a73e8',
      format: 'svg',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR4AWNgAAAAAgABc3NUCEAAAAAASUVORK5CYII='
    })

    const svgString = result.buffer.toString('utf-8')
    expect(svgString).toContain('<image href="data:image/png;base64')
  })

  it('should throw an error if no url is provided', async () => {
    await expect(createQuraCode({ url: '' } as any)).rejects.toThrow('URL must be provided')
  })
})
