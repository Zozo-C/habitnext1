"use client";

import React, { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import { LIFE_MOMENTS_GROUPED, CUSTOM_ANCHOR_MAX_LENGTH } from '@/lib/anchors';

const ALL_ANCHORS = LIFE_MOMENTS_GROUPED.flatMap(g => g.items);

const COMMON_ANCHORS = [
    '起床後', '吃完早餐後', '午餐後', '晚餐後',
    '洗完澡後', '上床睡覺前', '回家進門後', '通勤路上',
];

function AnchorButton({ label, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected ? 'true' : 'false'}
            className={`px-3 py-2 rounded-xl text-sm font-medium text-center transition-all ${
                selected
                    ? 'bg-emerald-500 text-white border border-emerald-500 shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
            }`}
        >
            {label}
        </button>
    );
}

export default function AnchorPicker({ value, onChange }) {
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState(false);

    const select = (label) => {
        onChange(value === label ? '' : label);
        setQuery('');
    };

    const submitCustom = () => {
        const trimmed = query.trim();
        if (trimmed) { onChange(trimmed); setQuery(''); }
    };

    const handleKey = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); submitCustom(); }
        if (e.key === 'Escape') setQuery('');
    };

    const filtered = query.trim()
        ? ALL_ANCHORS.filter(m => m.label.includes(query.trim()))
        : null;

    const isExactMatch = filtered?.some(m => m.label === query.trim());
    const showCustomOption = query.trim() && !isExactMatch;

    return (
        <div className="space-y-3">
            {/* Selected pill */}
            {value && (
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-sm text-emerald-800">
                        目前錨點：<span className="font-bold">{value}</span>
                    </span>
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-full p-1 transition-colors"
                    >
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
                    onChange={e => setQuery(e.target.value.slice(0, CUSTOM_ANCHOR_MAX_LENGTH))}
                    onKeyDown={handleKey}
                    placeholder="搜尋或輸入自訂錨點…"
                    className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50"
                />
                {query && (
                    <button type="button" onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Filtered results */}
            {filtered !== null ? (
                <div className="space-y-2">
                    {filtered.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {filtered.map(m => (
                                <AnchorButton key={m.id} label={m.label} selected={value === m.label} onClick={() => select(m.label)} />
                            ))}
                        </div>
                    )}
                    {showCustomOption && (
                        <button
                            type="button"
                            onClick={submitCustom}
                            className="w-full px-3 py-2 rounded-xl text-sm font-medium bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors text-left"
                        >
                            使用「<span className="font-bold">{query.trim()}</span>」作為自訂錨點
                        </button>
                    )}
                    {filtered.length === 0 && !showCustomOption && (
                        <p className="text-xs text-gray-400 text-center py-2">沒有符合的錨點</p>
                    )}
                </div>
            ) : (
                /* Default: common anchors + expand */
                <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {COMMON_ANCHORS.map(label => (
                            <AnchorButton key={label} label={label} selected={value === label} onClick={() => select(label)} />
                        ))}
                    </div>

                    {expanded && (
                        <div className="space-y-3 pt-1">
                            {LIFE_MOMENTS_GROUPED.map(group => {
                                const extras = group.items.filter(m => !COMMON_ANCHORS.includes(m.label));
                                if (extras.length === 0) return null;
                                return (
                                    <div key={group.key}>
                                        <p className="text-[10px] font-semibold text-gray-500 mb-1.5">{group.title}</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {extras.map(m => (
                                                <AnchorButton key={m.id} label={m.label} selected={value === m.label} onClick={() => select(m.label)} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={() => setExpanded(e => !e)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {expanded ? <><ChevronUp size={13} />收合</> : <><ChevronDown size={13} />查看更多錨點</>}
                    </button>
                </div>
            )}
        </div>
    );
}
