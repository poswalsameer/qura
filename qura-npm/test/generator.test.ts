import { describe, it, expect } from 'vitest'
import { createQuraCode } from '../src/index'

describe('QuraCode Generator', () => {
  it('should generate a valid PNG base64 string and return success: true', async () => {
    const result = await createQuraCode({
      name: 'Test',
      url: 'https://example.com',
      color: '#1a73e8',
    })

    expect(result).toHaveProperty('success')
    expect(result).toHaveProperty('base64')
    expect(result.success).toBe(true)
    expect(typeof result.base64).toBe('string')
    expect(result.base64.length).toBeGreaterThan(0)
  })

  it('should return success: false if no url is provided', async () => {
    const result = await createQuraCode({ name: 'Test', color: '#000', url: '' } as any)
    expect(result.success).toBe(false)
    expect(result.base64).toBe('')
  })

  it('should return success: false if no name is provided', async () => {
    const result = await createQuraCode({ color: '#000', url: 'test' } as any)
    expect(result.success).toBe(false)
    expect(result.base64).toBe('')
  })

  it('should return success: false if no color is provided', async () => {
    const result = await createQuraCode({ name: 'Test', url: 'test' } as any)
    expect(result.success).toBe(false)
    expect(result.base64).toBe('')
  })
})
