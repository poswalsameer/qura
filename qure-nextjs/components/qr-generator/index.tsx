"use client"

import { Input } from "@/components/ui/input"
import { Download, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
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
    color: "#2b2d42",
    type: "rounded" as DotType,
  },
  backgroundOptions: {
    color: "transparent",
  },
  cornersSquareOptions: {
    color: "#2b2d42",
    type: "extra-rounded" as CornerSquareType,
  },
  cornersDotOptions: {
    color: "#2b2d42",
    type: "dot" as CornerDotType,
  },
}

export default function QRGenerator() {
  const [color, setColor] = useState<string>("#2b2d42")
  const [brandName, setBrandName] = useState<string>("")
  const [isGenerated, setIsGenerated] = useState<boolean>(false)
  const [url, setUrl] = useState<string>("https://www.sameerposwal.xyz")

  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstance = useRef<QRCodeStyling | null>(null)

  function createBrandLogo(text: string, color: string) {
    if (!text) return ""
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return ""

    const fontSize = 64
    ctx.font = `bold ${fontSize}px sans-serif`

    const textMetrics = ctx.measureText(text)
    const textWidth = textMetrics.width
    const padding = 20

    canvas.width = textWidth + padding * 2
    canvas.height = fontSize + padding * 2

    ctx.fillStyle = color
    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL("image/png")
  }

  function handleGenerate() {
    if (!qrCodeInstance.current) return

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
        imageSize: 0.4,
        margin: 5,
      }
    })

    setIsGenerated(true)

    setTimeout(() => {
      if (qrCodeRef.current && qrCodeInstance.current) {
        qrCodeRef.current.innerHTML = ""
        qrCodeInstance.current.append(qrCodeRef.current)
      }
    }, 0)
  }

  function handleDownload(extension: "png" | "jpeg" | "pdf" | "svg") {
    if (!qrCodeInstance.current || !isGenerated) return

    qrCodeInstance.current.download({
      name: brandName ? `${brandName}-qr` : "qr-code",
      // @ts-expect-error -- library types might be slightly off
      extension: extension
    })
  }

  function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor(e.target.value)
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !qrCodeInstance.current) {
      qrCodeInstance.current = new QRCodeStyling(defaultOptions)
    }
  }, [])


  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="flex flex-col gap-x-0 p-0 font-sans lg:flex-row shadow-none border-2 border-[#dda15e] rounded-2xl overflow-hidden">

        {/* Left Column: Controls */}
        <div className="w-full bg-[#fefae0]/30 lg:w-1/2 border-b lg:border-b-0 lg:border-r-2 border-[#dda15e] flex flex-col justify-between">

          {/* Scrollable Content Area */}
          <div className="p-4 flex flex-col gap-y-8 flex-1 overflow-y-auto justify-center">
            <div className="w-full flex flex-col justify-center items-center">
              <CardTitle className="text-2xl font-medium text-[#283618]">
                QR Configuration
              </CardTitle>
              <CardDescription className="text-lg font-medium text-[#606c38]">
                Customize your QR code details below
              </CardDescription>
            </div>

            <div className="flex flex-col gap-y-0">

              {/* Brand Name Group */}
              <div className="flex flex-row items-center w-full group">
                <div className="h-12 px-4 bg-transparent border-2 border-r-0 border-[#dda15e] rounded-tl-lg flex items-center justify-center min-w-[80px] text-sm font-semibold text-[#283618] whitespace-nowrap">
                  Name
                </div>
                <Input
                  id="brandName"
                  placeholder="My Awesome Brand"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="h-12 bg-transparent border-2 border-[#dda15e] rounded-tr-lg rounded-l-none rounded-br-none border-l-0 focus-visible:ring-0 focus-visible:border-[#dda15e] transition-all"
                />
              </div>

              {/* URL Group */}
              <div className="flex flex-row items-center w-full group">
                <div className="h-12 px-4 bg-transparent border-2 border-t-0 border-r-0 border-[#dda15e] flex items-center justify-center min-w-[80px] text-sm font-semibold text-[#283618] whitespace-nowrap">
                  URL
                </div>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 bg-transparent border-2 border-t-0 border-[#dda15e] rounded-none border-l-0 focus-visible:ring-0 focus-visible:border-[#dda15e] transition-all"
                />
              </div>

              {/* Color Group */}
              <div className="flex flex-row items-center w-full group">
                <div className="h-12 px-4 bg-transparent border-2 border-t-0 border-r-0 border-[#dda15e] rounded-bl-lg flex items-center justify-center min-w-[80px] text-sm font-semibold text-[#283618] whitespace-nowrap">
                  Color
                </div>
                <div className="relative flex-1 h-12 flex items-center">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-6 rounded border border-[#8d99ae]/30 overflow-hidden cursor-pointer shadow-sm hover:scale-105 transition-transform z-10">
                    <input
                      type="color"
                      id="color"
                      value={color}
                      onChange={handleColorChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full h-full" style={{ backgroundColor: color }} />
                  </div>
                  <Input
                    value={color}
                    onChange={handleColorChange}
                    className="h-12 pl-20 bg-transparent border-2 border-t-0 border-[#dda15e] rounded-br-lg rounded-tr-none rounded-l-none border-l-0 focus-visible:ring-0 focus-visible:border-[#dda15e] font-mono uppercase transition-all w-full"
                    maxLength={7}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Generate Button - Fixed at bottom */}
          <Button
            onClick={handleGenerate}
            className="w-full rounded-none lg:rounded-bl-2xl bg-[#fefae0] hover:bg-transparent cursor-pointer text-[#283618] font-semibold h-16 text-lg transition-all duration-300 shadow-none border-t-2 border-t-[#dda15e]"
          >
            <QrCode className="h-10 w-10" />
            GENERATE
          </Button>
        </div>

        {/* Right Column: Preview & Download */}
        <div className="w-full lg:w-1/2 flex flex-col bg-[#fefae0]/30">

          {/* Preview Area - Takes remaining space */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[300px]">
            <div className="relative group perspective-1000 w-full max-w-[350px]">
              <div className="flex flex-col items-center justify-center min-h-[350px] w-full">
                {!isGenerated ? (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center animate-pulse">
                      <QrCode className="w-20 h-20 text-[#283618]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-medium text-[#2b2d42]">
                        Preview Area
                      </p>
                      <p className="text-lg text-[#606c38] max-w-xs">
                        Enter details to generate
                      </p>
                    </div>
                  </div>
                ) : (
                  <div ref={qrCodeRef} className="qr-code-container" />
                )}
              </div>
            </div>
          </div>

          {/* Download Buttons - Fixed at bottom */}
          <div className={`grid grid-cols-3 w-full h-16 transition-all duration-500 `}>
            <Button
              onClick={() => handleDownload("png")}
              disabled={!isGenerated}
              className="w-full h-full rounded-none rounded-bl-2xl lg:rounded-bl-none border-t-2 border-r-2 border-[#dda15e] bg-[#fefae0] hover:bg-transparent cursor-pointer text-[#283618] font-medium shadow-none"
            >
              <Download className="mr-2 h-4 w-4" />
              PNG
            </Button>
            <Button
              onClick={() => handleDownload("jpeg")}
              disabled={!isGenerated}
              className="w-full h-full rounded-none border-t-2 border-r-2 border-[#dda15e] bg-[#fefae0] hover:bg-transparent cursor-pointer text-[#283618] font-medium shadow-none"
            >
              <Download className="mr-2 h-4 w-4" />
              JPG
            </Button>
            <Button
              onClick={() => handleDownload("svg")}
              disabled={!isGenerated}
              className="w-full h-full rounded-none rounded-br-2xl border-t-2 border-[#dda15e] border-l-0 bg-[#fefae0] hover:bg-transparent cursor-pointer text-[#283618] font-medium shadow-none"
            >
              <Download className="mr-2 h-4 w-4" />
              SVG
            </Button>
          </div>
        </div>

      </Card>
    </div>
  )
}