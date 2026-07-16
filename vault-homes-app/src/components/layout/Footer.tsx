import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex justify-center pb-8 bg-transparent relative z-20 mt-[-40px]">
      <div className="bg-[#E5ED64] w-[95%] max-w-[1400px] rounded-[40px] pt-16 pb-8 px-12 md:px-20 shadow-2xl flex flex-col">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Column 1: Logo, Text, Socials */}
          <div className="col-span-1 md:col-span-4 flex flex-col items-start">
            <Image
              src="/Assets/LogoDesktopFooter.png"
              alt="Vault Homes"
              width={160}
              height={45}
              className="w-[160px] h-auto object-contain mb-8"
            />
            <p className="text-[16px] text-[#363631] font-medium leading-relaxed max-w-[280px]">
              Join Vault Homes as a seller or investor and start with a private review.
            </p>
            {/* Social Icons */}
            <div className="flex gap-5 mt-8">
              {/* Facebook */}
              <Link href="#" className="text-[#363631] hover:opacity-70 transition-opacity">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.53 11.19 6.44 12.97 6.44C13.82 6.44 14.73 6.59 14.73 6.59V8.5H13.73C12.76 8.5 12.46 9.11 12.46 9.75V12H14.73L14.36 15H12.46V21.8C17.06 20.87 20.5 16.84 20.5 12H22Z" />
                 </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="text-[#363631] hover:opacity-70 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              {/* X (Twitter) */}
              <Link href="#" className="text-[#363631] hover:opacity-70 transition-opacity">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="col-span-1 md:col-span-4 flex flex-col lg:pl-16">
            <h3 className="text-[28px] font-bold text-[#363631] mb-6 tracking-tight">Explore</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-[16px] text-[#363631] font-medium hover:opacity-70">Home.</Link>
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">Sell Privately.</Link>
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">Find Deals.</Link>
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">About.</Link>
              </div>
              <div className="flex flex-col gap-4">
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">Insights.</Link>
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">FAQ.</Link>
                <Link href="#" className="text-[16px] text-[#363631] font-medium hover:opacity-70">Contact.</Link>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div className="col-span-1 md:col-span-4 flex flex-col lg:pl-8">
            <h3 className="text-[28px] font-bold text-[#363631] mb-6 tracking-tight">Contact Us</h3>
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@vaulthomes.com" className="text-[16px] text-[#363631] font-medium hover:opacity-70">hello@vaulthomes.com</a>
              <a href="tel:+2348117682654" className="text-[16px] text-[#363631] font-medium hover:opacity-70">+234 8117682654</a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#363631]/20 my-12" />

        {/* Copyright & Links */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 pb-4">
          <p className="text-[14px] text-[#363631] font-medium tracking-tight">
            © 2026 Vault Homes | All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="#" className="text-[14px] text-[#363631] font-medium hover:opacity-70">Privacy Policy</Link>
            <Link href="#" className="text-[14px] text-[#363631] font-medium hover:opacity-70">Terms of Service</Link>
            <Link href="#" className="text-[14px] text-[#363631] font-medium hover:opacity-70">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
