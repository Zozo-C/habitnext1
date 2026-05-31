"use client";

const FocusMapBanner = ({ candidateCount, onDismiss, onOpenFocusMap }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1">
                <p className="text-xs font-medium text-[#169E6B] uppercase tracking-wider mb-1">FOCUS MAP</p>
                <p className="text-sm font-bold text-[#1A1A1A]">你有 {candidateCount} 個候選習慣</p>
                <p className="text-xs text-[#6B7280] mt-0.5">Fogg 建議篩 3 個實際開始</p>
            </div>
            <button type="button" onClick={onDismiss} className="text-[#9CA3AF] hover:text-[#6B7280] text-lg leading-none transition-colors duration-200" aria-label="暫時隱藏">×</button>
        </div>
        <button
            type="button"
            onClick={onOpenFocusMap}
            className="w-full py-2.5 rounded-full bg-[#169E6B] text-white text-sm font-medium hover:bg-[#128E5F] active:bg-[#0F7750] transition-colors duration-200"
        >開始評分 →</button>
    </div>
);

export default FocusMapBanner;
