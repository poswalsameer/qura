import QRGenerator from "@/components/qr-generator"
import { Github, Linkedin, Twitter } from "lucide-react"

//  #ebf2fa
//  #8d99ae
//  #2b2d42

export default function Home() {
  return (
    <div className="min-h-screen w-full py-10 bg-[#fefae0]/30 selection:bg-[#8d99ae]/30 text-[#283618]">
      <div className="px-4 md:px-0 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto flex flex-col items-center gap-y-8">
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end">
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left gap-y-1 sm:gap-y-2">
            <div className="text-4xl sm:text-5xl font-medium tracking-tighter text-[#283618]">
              Qura
            </div>
            <div className="text-xl sm:text-2xl font-medium tracking-tighter text-[#606c38]">
              Create Premium QR Codes In No Time
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-y-4 mb-2">
            <div className="text-lg font-medium text-[#283618]">
              Made by <a href="https://www.sameerposwal.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 decoration-[#dda15e] hover:text-[#bc6c25] transition-colors">Sameer Poswal</a>
            </div>
            <div className="flex items-center gap-x-4">
              <a href="https://github.com/poswalsameer" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/sameerposwal" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/samposwal" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <QRGenerator />

        <div className="flex md:hidden flex-col items-center gap-y-4 mt-4">
          <div className="text-lg font-medium text-[#283618]">
            Made by <a href="https://www.sameerposwal.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-2 decoration-[#dda15e] hover:text-[#bc6c25] transition-colors">Sameer Poswal</a>
          </div>
          <div className="flex items-center gap-x-4">
            <a href="https://github.com/poswalsameer" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/sameerposwal" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/samposwal" target="_blank" rel="noopener noreferrer" className="text-[#283618] hover:text-[#bc6c25] transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
