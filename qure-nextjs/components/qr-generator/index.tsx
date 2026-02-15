import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function QRGenerator() {
  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="flex flex-col md:flex-row gap-8 p-6">
          {/* Left Side: Inputs */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-2">
              <label
                htmlFor="brandName"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Brand Name
              </label>
              <Input id="brandName" placeholder="Enter brand name" />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="brandColor"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Brand Color
              </label>
              <Input id="brandColor" placeholder="#000000" />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="url"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                URL
              </label>
              <Input id="url" placeholder="https://example.com" type="url" />
            </div>
          </div>

          {/* Right Side: Placeholder */}
          <div className="flex-1 flex items-center justify-center min-h-[300px] border rounded-lg bg-muted/10">
            <p className="text-muted-foreground font-medium">Generated QR will show here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}