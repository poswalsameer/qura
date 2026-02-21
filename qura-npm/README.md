# qura-code

A clean, minimal-dependency programmatic API for generating stunning, branded, and custom-colored QR codes without any GUI overhead or DOM requirements. Written in pure TypeScript for Node.js servers.

## Features

- **No DOM Dependencies**: Safe to rely on in Node.js backend functions, Cloudflare Workers, Next.js App Router API, and AWS Lambda.
- **Tree-Shakable**: Built correctly as ESM, maintaining backwards compatibility with CommonJS via `main` and `exports`.
- **Elegant Architecture**: Uses clean separation of generating matrix data vs rasterizing images with Sharp.
- **Customization**: Offers options to customize colors, roundness style, insert logos, and text brand names natively.
- **Battle Tested**: Leverages `qrcode` purely for error-correction generation arrays without using its old DOM-dependent renderers, and constructs high-performance SVGs manually converted via `sharp` for stunning rasterized output.

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

  // Example 1: Save buffer to file
  fs.writeFileSync("qr.png", qr.buffer)

  // Example 2: Use Base64 directly in Email HTML or React image tag
  console.log(`Use this URL directly: ${qr.dataUrl}`)
}

main()
```

### Advanced Examples

Generate SVG explicitly:

```ts
const svgQr = await createQuraCode({
  name: "My App",
  color: "#ff0000",
  url: "https://example.com",
  format: "svg", // pure string xml under the hood
  backgroundColor: "#000",
})

console.log(svgQr.buffer.toString("utf-8")) // Prints pure SVG xml
```

Use a Custom Logo URL:
_Note: when using `format: 'svg'`, it is standard convention to provide your logo as a Base64 URI so it can be viewed organically in any browser without causing CORS or load breaks._

```ts
const custom = await createQuraCode({
  color: "#1A73E8",
  url: "https://example.com",
  logo: "data:image/png;base64,...", // Optional Logo
})
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

  return new Response(qr.buffer, {
    headers: {
      "Content-Type": qr.mimeType,
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

  await s3.send(
    new PutObjectCommand({
      Bucket: "my-qr-bucket",
      Key: "campaign.png",
      Body: qr.buffer,
      ContentType: qr.mimeType,
    }),
  )
}
```

## API Reference

### `createQuraCode(options: CreateQuraCodeOptions): Promise<QuraCodeResult>`

**CreateQuraCodeOptions:**

- `name` (string): Brand or name printed in the center text cutout.
- `url` (string): The data or URL encoded into the image format.
- `color` (string): The primary foreground hexadecimal color code (e.g. `"#1A73A8"`).
- `backgroundColor?` (string): Background hexadecimal color (default: `#ffffff`).
- `logo?` (string): External image payload to embed in the center. Overrides `name`.
- `format?` (`"png" | "svg"`): Output format required.
- `size?` (number): The image boundary height and width (default: 1024 pixels).

**QuraCodeResult:**

- `buffer` (Buffer): The primitive image binary suitable for disk writing.
- `base64` (string): Just the raw Base64 string component.
- `dataUrl` (string): A fully formed Base64 String URL `data:{mimeType};base64,...`.
- `mimeType` (string): Document MIME type mapped to chosen format (`image/png` or `image/svg+xml`).
