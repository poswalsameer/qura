import * as React from "react"
import { QrCode } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#ebf2fa]/80 backdrop-blur-md border-b border-[#8d99ae]/20 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
        <div className="p-2.5 bg-[#2b2d42] rounded-xl shadow-lg ring-1 ring-[#8d99ae]/20 group-hover:rotate-12 transition-transform duration-300">
          <QrCode className="w-5 h-5 text-[#ebf2fa]" />
        </div>
        <span className="text-xl font-bold tracking-tight text-[#2b2d42]">
          Qura
        </span>
      </div>
    </header>
  )
}