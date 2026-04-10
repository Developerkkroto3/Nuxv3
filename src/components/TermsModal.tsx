import { X, Shield, AlertTriangle, TrendingUp, Lock } from 'lucide-react';

type Props = {
  onClose: () => void;
  onAccept: () => void;
};

export default function TermsModal({ onClose, onAccept }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#0a1a12] border border-[#1e4030] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0d2a1c] to-[#091a10] px-5 py-4 border-b border-[#1e4030] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e87a]/20 to-[#00c4a0]/20 border border-[#00e87a]/30 flex items-center justify-center">
              <Shield size={14} className="text-[#00e87a]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm">Terms & Conditions</h2>
              <p className="text-[#4a8a6a] text-[10px]">NUX-TRADE Copytrade Platform</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#4a6a5a] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 scrollbar-thin">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0d2a1c]/60 border border-[#1e4030]">
            <TrendingUp size={15} className="text-[#00c4a0] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-[#00c4a0] font-semibold text-xs mb-1">Copytrade Service</h3>
              <p className="text-[#6a9a7a] text-[11px] leading-relaxed">
                NUX-TRADE is a copytrade platform. You acknowledge that copying trades involves financial risk and past performance does not guarantee future results.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0d2a1c]/60 border border-[#1e4030]">
            <AlertTriangle size={15} className="text-[#ff6b35] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-[#ff6b35] font-semibold text-xs mb-1">Risk Disclaimer</h3>
              <p className="text-[#6a9a7a] text-[11px] leading-relaxed">
                Trading and copying trades carries substantial risk of loss. You may lose all or part of your invested capital. Only invest what you can afford to lose.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0d2a1c]/60 border border-[#1e4030]">
            <Lock size={15} className="text-[#00e87a] mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-[#00e87a] font-semibold text-xs mb-1">User Responsibilities</h3>
              <p className="text-[#6a9a7a] text-[11px] leading-relaxed">
                You are solely responsible for all activity under your account. Keep your credentials and security PIN confidential. NUX-TRADE is not liable for unauthorized access due to negligence.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#0d2a1c]/60 border border-[#1e4030]">
            <h3 className="text-white font-semibold text-xs mb-2">General Agreements</h3>
            <ul className="space-y-1.5">
              {[
                'You must be 18 years or older to use this platform.',
                'Your account requires a valid sponsor (referral) code for registration.',
                'Withdrawals are secured by your personal security PIN.',
                'NUX-TRADE reserves the right to suspend accounts violating these terms.',
                'By registering, you consent to receive platform notifications.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#6a9a7a] text-[11px]">
                  <span className="text-[#00c4a0] mt-0.5 flex-shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#1e4030] flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#1e4030] text-[#6a9a7a] text-sm font-medium hover:bg-white/5 hover:text-white transition-all"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00e87a] to-[#00c4a0] text-[#050e0a] text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-[#00e87a]/20"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}
