import Header from "@/components/header"
import QRGenerator from "@/components/qr-generator"

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#ebf2fa] text-black font-sans">
      <div className="h-full w-full max-w-4xl bg-[#ebf2fa] flex flex-col justify-center items-center">
        <Header />
        <QRGenerator />
      </div>
    </div>
  )
}
