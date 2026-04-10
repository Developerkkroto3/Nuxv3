export default function Footer() {
  return (
    <footer className="w-full bg-[#050e0a] border-t border-[#1a3a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="NUX-TRADE" className="h-6 w-6" />
            <span className="text-[#4a6a5a] text-sm font-medium">
              NUX<span className="text-[#00e87a]/70">-TRADE</span>
            </span>
          </div>

          <p className="text-[#4a6a5a] text-xs text-center">
            &copy; 2026 <span className="text-[#00c4a0]/70 font-medium">Nux-Trade</span>. All rights reserved. Copytrade Platform.
          </p>

          <div className="flex items-center gap-4 text-[#4a6a5a] text-xs">
            <span className="hover:text-[#00e87a]/70 cursor-pointer transition-colors">Privacy</span>
            <span className="text-[#1a3a2a]">|</span>
            <span className="hover:text-[#00e87a]/70 cursor-pointer transition-colors">Terms</span>
            <span className="text-[#1a3a2a]">|</span>
            <span className="hover:text-[#00e87a]/70 cursor-pointer transition-colors">Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
