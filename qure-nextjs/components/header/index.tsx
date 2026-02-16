import * as React from "react"
import { QrCode } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20 dark:bg-zinc-900/10 dark:border-zinc-800/20 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-2 group cursor-pointer hover:scale-105 transition-transform">
        <div className="p-2 bg-linear-to-tr from-blue-600 to-violet-600 rounded-lg shadow-lg group-hover:rotate-12 transition-transform duration-300">
          <QrCode className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-violet-600 dark:from-white dark:to-gray-200">
          Qura
        </span>
      </div>
      {/* Could add a simple link or button here if needed */}
    </header>
  )
}