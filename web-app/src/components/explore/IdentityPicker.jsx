"use client";

import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import {
    USER_TYPE_PROFILES,
    GENERIC_IDENTITIES,
    IDENTITY_MAX_LENGTH,
    deriveDefaultIdentity,
} from '@/lib/typeKeys';

function IdentityButton({ label, selected, recommended, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected ? 'true' : 'false'}
            className={`relative w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                selected
                    ? 'bg-emerald-500 text-white border border-emerald-500 shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
            }`}
        >
            {recommended && !selected && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-100 text-amber-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <Sparkles size={10} /> 推薦
                </span>
            )}
            {label}
        </button>
    );
}

export default function IdentityPicker({ value, onChange, userTypeKey = null }) {
    const [query, setQuery] = useState('');

    const recommended = deriveDefaultIdentity(userTypeKey);
    const allPresets = [
        ...(recommended ? [recommended] : []),
        ...GENERIC_IDENTITIES.filter(s => s !== recommended),
    ];

    const select = (s) => { onChange(value === s ? '' : s); setQuery(''); };

    const submitCustom = () => {
        const trimmed = query.trim();
        if (trimmed) { onChange(trimmed); setQuery(''); }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submitCustom(); }
        if (e.key === 'Escape') setQuery('');
    };

    const filtered = query.trim()
        ? allPresets.filter(s => s.includes(query.trim()))
        : null;

    const isExactMatch = filtered?.some(s => s === query.trim());
    const showCustomOption = query.trim() && !isExactMatch;

    return (
        <div className="space-y-3">
            {/* Selected pill */}
            {value && (
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-sm text-emerald-800">
                        目前身分：<span className="font-bold">{value}</span>
                    </span>
                    <button type="button" onClick={() => onChange('')} className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-full p-1 transition-colors">
                        <X size={14} />
                    </button>
                </div>
            )}

            {/* Search box */}
            <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value.slice(0, IDENTITY_MAX_LENGTH))}
                    onKeyDown={handleKey}
                    placeholder="搜尋或輸入自訂身分…"
                    className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                />
                {query && (
                    <button type="button" onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Results */}
            {filtered !== null ? (
                <div className="space-y-2">
                    {filtered.map(s => (
                        <IdentityButton key={s} label={s} selected={value === s} recommended={s === recommended} onClick={() => select(s)} />
                    ))}
                    {showCustomOption && (
                        <button type="button" onClick={submitCustom} className="w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-left">
                            使用「<span className="font-bold">{query.trim()}</span>」作為自訂身分
                        </button>
                    )}
                    {filtered.length === 0 && !showCustomOption && (
                        <p className="text-xs text-gray-400 text-center py-2">沒有符合的身分</p>
                    )}
                </div>
            ) : (
                <div className="space-y-2">
                    {allPresets.map(s => (
                        <IdentityButton key={s} label={s} selected={value === s} recommended={s === recommended} onClick={() => select(s)} />
                    ))}
                </div>
            )}
        </div>
    );
}
