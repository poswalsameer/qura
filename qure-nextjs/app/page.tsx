import QRGenerator from "@/components/qr-generator"

//  #ebf2fa
//  #8d99ae
//  #2b2d42

export default function Home() {
  return (
    <div className="min-h-screen w-full py-10 bg-[#ebf2fa] selection:bg-[#8d99ae]/30 text-[#2b2d42]">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-y-6">
        <div className="w-full text-center mx-auto flex flex-col justify-center items-center gap-y-2">
          <div className="text-6xl font-sans font-semibold tracking-tighter text-[#2b2d42]">
            Qura
          </div>
          <div className="text-4xl font-sans font-semibold tracking-tighter text-[#2b2d42]">
            Create Premium QR Codes In No Time
          </div>
        </div>

        <QRGenerator />
      </div>
    </div>
  )
}
