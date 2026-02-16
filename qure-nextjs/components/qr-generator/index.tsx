"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Link as LinkIcon, Palette, Type, QrCode } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  Options,
} from "qr-code-styling"

// Default QR options
const defaultOptions: Options = {
  width: 300,
  height: 300,
  type: "svg" as DrawType,
  data: "https://example.com",
  image: "",
  margin: 10,
  qrOptions: {
    typeNumber: 0 as TypeNumber,
    mode: "Byte" as Mode,
    errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 10,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    color: "#000000",
    type: "rounded" as DotType,
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions: {
    color: "#000000",
    type: "extra-rounded" as CornerSquareType,
  },
  cornersDotOptions: {
    color: "#000000",
    type: "dot" as CornerDotType,
  },
}

/**
 * Color system which we are going to use:
 * -----------------------------------------
 * #ebf2fa
 * #8d99ae
 * #2b2d42
 */

export default function QRGenerator() {
  const [url, setUrl] = React.useState("https://www.google.com")
  const [color, setColor] = React.useState("#000000")
  const [brandName, setBrandName] = React.useState("")
  const [isGenerated, setIsGenerated] = React.useState(false)

  const qrCodeRef = React.useRef<HTMLDivElement>(null)
  const qrCodeInstance = React.useRef<QRCodeStyling | null>(null)

  // Initialize QR Code styler
  React.useEffect(() => {
    // Only initialize on client side
    if (typeof window !== "undefined" && !qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling(defaultOptions)
    }
  }, [])

  // Helper to create an image from text for the logo center
  const createBrandLogo = (text: string, color: string) => {
    if (!text) return ""
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return ""

    // Set dimensions
    // We want a somewhat rectangular/square shape depending on text
    // Fixed size for consistency or dynamic? Let's use a fixed high-res canvas.
    const fontSize = 64
    ctx.font = `bold ${fontSize}px sans-serif`

    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const padding = 20

    // We make a square or rectangular canvas? QR code center images are best singular.
    // Let's make a canvas that fits the text plus padding
    canvas.width = textWidth + padding * 2
    canvas.height = fontSize + padding * 2

    // Clear and set background to white (so it stands out from QR dots) or transparent?
    // User asked "in between", usually implies floating. 
    // Transparent might mix with dots if hideBackgroundDots is false. 
    // But `imageOptions.hideBackgroundDots: true` handles safe zone.
    // However, if the text is transparent background, it looks cool.
    // But readability needs contrast. Let's add a white background or matching bg.
    // We'll use white background for the text box to ensure readability.
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw Text
    ctx.fillStyle = color
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL("image/png")
  }

  const handleGenerate = () => {
    if (!qrCodeInstance.current) return

    // Create Brand Image if name exists
    const brandImage = brandName ? createBrandLogo(brandName, color) : ""

    qrCodeInstance.current.update({
      data: url,
      image: brandImage,
      dotsOptions: {
        color: color,
      },
      cornersSquareOptions: {
        color: color,
      },
      cornersDotOptions: {
        color: color,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4, // Size of the center image relative to QR
        margin: 5,
      }
    })

    setIsGenerated(true)

    // Append to div if not already done, or re-append to ensure it renders
    // We need to wait for update to apply then append? 
    // Actually appending once is enough, update redraws it.
    // But if we conditionally render the Ref div, we must append after render.
    // So we'll handle append in a useEffect dependent on isGenerated or logic here if ref exists
    setTimeout(() => {
      if (qrCodeRef.current && qrCodeInstance.current) {
        qrCodeRef.current.innerHTML = ""
        qrCodeInstance.current.append(qrCodeRef.current)
      }
    }, 0)
  }

  const handleDownload = (extension: "png" | "jpeg" | "pdf" | "svg") => {
    if (!qrCodeInstance.current || !isGenerated) return

    qrCodeInstance.current.download({
      name: brandName ? `${brandName}-qr` : "qr-code",
      // @ts-expect-error -- Ignore type error for now
      extension: extension
    })
  }

  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls */}
        <Card className="lg:col-span-5 h-fit border-0 shadow-xl bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              QR Configuration
            </CardTitle>
            <CardDescription>
              Customize your QR code details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Brand Name Input */}
            <div className="space-y-3">
              <label htmlFor="brandName" className="text-sm font-medium flex items-center gap-2">
                <Type className="w-4 h-4 text-muted-foreground" />
                Brand Name
              </label>
              <Input
                id="brandName"
                placeholder="My Awesome Brand"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-transparent border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* URL Input */}
            <div className="space-y-3">
              <label htmlFor="url" className="text-sm font-medium flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-muted-foreground" />
                Destination URL
              </label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-transparent border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>

            {/* Color Input */}
            <div className="space-y-3">
              <label htmlFor="color" className="text-sm font-medium flex items-center gap-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                Brand Color
              </label>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm cursor-pointer hover:scale-105 transition-transform">
                  <input
                    type="color"
                    id="color"
                    value={color}
                    onChange={handleColorChange}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] p-0 cursor-pointer border-0"
                  />
                </div>
                <Input
                  value={color}
                  onChange={handleColorChange}
                  className="font-mono uppercase w-32"
                  maxLength={7}
                />
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              className="w-full bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              <QrCode className="mr-2 h-5 w-5" />
              Generate QR Code
            </Button>

          </CardContent>
        </Card>

        {/* Right Column: Preview & Download */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-8">
          {/* Preview Card */}
          <div className="relative group perspective-1000 w-full max-w-[400px]">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center min-h-[400px] w-full">

              {!isGenerated ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 rounded-xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center animate-pulse">
                    <QrCode className="w-10 h-10 text-gray-400 dark:text-gray-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
                    Your QR code will appear here
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-600 max-w-xs">
                    Enter your brand details and click generate to see the magic happen.
                  </p>
                </div>
              ) : (
                <div ref={qrCodeRef} className="qr-code-container transition-transform duration-500 hover:scale-105" />
              )}

            </div>
          </div>

          {/* Action Buttons */}
          <div className={`grid grid-cols-3 gap-4 w-full max-w-md transition-opacity duration-300 ${isGenerated ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <Button
              onClick={() => handleDownload("png")}
              disabled={!isGenerated}
              className="group bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
              PNG
            </Button>
            <Button
              onClick={() => handleDownload("jpeg")}
              disabled={!isGenerated}
              className="group bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
              JPG
            </Button>
            <Button
              onClick={() => handleDownload("svg")}
              disabled={!isGenerated}
              className="group bg-linear-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
              PDF (SVG)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}