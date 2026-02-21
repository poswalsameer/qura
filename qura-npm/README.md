# qura-code

A clean, minimal-dependency programmatic API for generating stunning, branded, and custom-colored QR codes without any GUI overhead or DOM requirements. Written in pure TypeScript for Node.js servers.

## Features

- **No DOM Dependencies**: Safe to rely on in Node.js backend functions, Cloudflare Workers, Next.js App Router API, and AWS Lambda.
- **Tree-Shakable**: Built correctly as ESM, maintaining backwards compatibility with CommonJS via `main` and `exports`.
- **Elegant Architecture**: Uses clean separation of generating matrix data vs rasterizing images with Sharp.
- **Customization**: Strictly focused interface requiring only mandatory `name`, `url` and `color` fields for a streamlined experience.
- **Battle Tested**: Leverages `qrcode` purely for error-correction generation arrays without using its old DOM-dependent renderers, and constructs high-performance SVGs manually converted via `sharp` for stunning rasterized output in PNG format.

## Installation

```bash
npm install qura-code
```

## Quick Start

### Basic Usage API

```ts
import { createQuraCode } from "qura-code"
import * as fs from "fs"

async function main() {
  const qr = await createQuraCode({
    name: "Qura",
    color: "#1A73E8",
    url: "https://example.com",
  })

  // Ensure generation succeeded
  if (!qr.success) {
    console.error("Failed to generate QR Code")
    return
  }

  // Example 1: Save Base64 to physical PNG file
  const fileBuffer = Buffer.from(qr.base64, "base64")
  fs.writeFileSync("qr.png", fileBuffer)

  // Example 2: Use Base64 directly in Email HTML or React image tag
  console.log(`Use this URL directly: data:image/png;base64,${qr.base64}`)
}

main()
```

### AWS / HTTP Response Example

Sending directly via express/Next.js API route:

```ts
import { createQuraCode } from "qura-code"

export async function GET(req, res) {
  const qr = await createQuraCode({
    name: "Ticket-X",
    color: "#000",
    url: "https://myticket.com",
  })

  if (!qr.success) {
    return new Response("QR Generation Failed", { status: 500 })
  }

  const outputBuffer = Buffer.from(qr.base64, "base64")

  return new Response(outputBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": 'inline; filename="qr.png"',
    },
  })
}
```

Uploading to S3 explicitly:

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { createQuraCode } from "qura-code"

const s3 = new S3Client({ region: "us-east-1" })

async function uploadQrCode() {
  const qr = await createQuraCode({
    name: "Campaign",
    color: "#DDA15E",
    url: "https://example.com/promo",
  })

  if (!qr.success) return

  await s3.send(
    new PutObjectCommand({
      Bucket: "my-qr-bucket",
      Key: "campaign.png",
      Body: Buffer.from(qr.base64, "base64"),
      ContentType: "image/png",
    }),
  )
}
```

## API Reference

### `createQuraCode(options: CreateQuraCodeOptions): Promise<QuraCodeResult>`

**CreateQuraCodeOptions (All Fields are Mandatory):**

- `name` (string): Brand or name printed in the center text cutout.
- `url` (string): The data or URL encoded into the image format.
- `color` (string): The primary foreground hexadecimal color code (e.g. `"#1A73A8"`).

**QuraCodeResult:**

- `success` (boolean): Flags whether generation succeeded (`true`) or failed (`false` due to invalid parameters or renderer exceptions).
- `base64` (string): The resulting binary PNG image encoded strictly as a raw Base64 string payload.
