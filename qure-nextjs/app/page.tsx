import Header from "@/components/header"
import QRGenerator from "@/components/qr-generator"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#ebf2fa] dark:bg-zinc-950 text-foreground font-sans selection:bg-violet-200 dark:selection:bg-violet-900 selection:text-violet-900 dark:selection:text-violet-100 overflow-x-hidden">

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-start min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <Header />

        {/* Hero Section */}
        <section className="w-full text-center mb-12 space-y-4 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Create Beautiful <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600">QR Codes</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400">
            Generate custom QR codes for your brand in seconds.
            Customize colors, add your brand name, and download in high quality.
          </p>
        </section>

        {/* Generator Component */}
        <section className="w-full animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200 fill-mode-backwards">
          <QRGenerator />
        </section>

      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] opacity-70 animate-pulse delay-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-400/20 rounded-full blur-[120px] opacity-70 animate-pulse delay-1000"></div>
      </div>
    </main>
  )
}
