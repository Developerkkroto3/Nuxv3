type Page = 'register' | 'login';

type Props = {
  page: Page;
  onNavigate: (page: Page) => void;
};

export default function Header({ page, onNavigate }: Props) {
  return (
    <header className="w-full bg-[#050e0a]/95 backdrop-blur-md border-b border-[#1a3a2a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-[#4a6a5a] text-sm font-black tracking-tight">
              NUX<span className="text-[#00e87a]/80">-TRADE</span>
            </span>
            <span className="text-[#1a3a2a] hidden sm:block">|</span>
            <span className="text-[#4a6a5a] text-xs hidden sm:block uppercase tracking-widest font-medium">Copytrade Platform</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 bg-[#0d1f16] border border-[#1a3a2a] rounded-xl p-1">
              <button
                onClick={() => onNavigate('login')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${page === 'login' ? 'bg-gradient-to-r from-[#00e87a] to-[#00c4a0] text-[#050e0a]' : 'text-[#4a6a5a] hover:text-[#00e87a]'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${page === 'register' ? 'bg-gradient-to-r from-[#00e87a] to-[#00c4a0] text-[#050e0a]' : 'text-[#4a6a5a] hover:text-[#00e87a]'}`}
              >
                Register
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-md bg-[#0d1f16] border border-[#1a3a2a] hover:border-[#f0b90b]/40 transition-colors cursor-default">
                <img src="/binance.png" alt="Binance" className="w-4 h-4 sm:w-6 sm:h-6 object-contain" />
              </div>

              <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-md bg-[#0d1f16] border border-[#1a3a2a] hover:border-white/20 transition-colors cursor-default">
                <img src="/okx.png" alt="OKX" className="w-4 h-4 sm:w-6 sm:h-6 object-contain" />
              </div>

              <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-md bg-[#0d1f16] border border-[#1a3a2a] hover:border-[#ff6b35]/40 transition-colors cursor-default">
                <img src="/quotex.png" alt="Quotex" className="w-4 h-4 sm:w-6 sm:h-6 object-contain" />
              </div>

              <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-md bg-[#0d1f16] border border-[#1a3a2a] hover:border-[#ff8c00]/40 transition-colors cursor-default">
                <img src="/iqopt.png" alt="IQ Option" className="w-4 h-4 sm:w-6 sm:h-6 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
