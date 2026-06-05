'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { X, Lightbulb, FileText, Tag } from 'lucide-react';
import EvidenceBadge from './EvidenceBadge';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
    ssr: false,
    loading: () => <span className="text-xs text-gray-400">載入中…</span>,
});

function sourceTypeLabel(type) {
    if (type === 'pubmed') return 'PubMed';
    if (type === 'journal') return '期刊';
    if (type === 'book') return '書籍';
    return '來源';
}

export default function InsightDetailModal({ insight, onClose }) {
    if (!insight) return null;

    const sources = Array.isArray(insight.sources) ? insight.sources : [];
    const tags = Array.isArray(insight.tags) ? insight.tags : [];

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                            {insight.evidence && (
                                <EvidenceBadge evidence={insight.evidence} />
                            )}
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                            {insight.title}
                        </h2>
                        {insight.takeaway && (
                            <p className="text-sm text-emerald-700 font-medium mt-2 italic">
                                「{insight.takeaway}」
                            </p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex-shrink-0 p-2 rounded-lg transition-colors"
                        aria-label="關閉"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4">
                    {/* Summary */}
                    {insight.summary && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                {insight.summary}
                            </p>
                        </div>
                    )}

                    {/* Detail */}
                    {insight.detail && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <Lightbulb size={16} className="text-emerald-600" />
                                研究細節
                            </h3>
                            <div className="prose prose-sm max-w-none text-gray-700 prose-headings:text-gray-800 prose-headings:text-sm prose-strong:text-gray-900 prose-strong:font-bold prose-li:my-0.5 prose-p:my-2 prose-ul:my-2 leading-relaxed">
                                <ReactMarkdown>{insight.detail}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                    {/* Sources */}
                    {sources.length > 0 && (
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText size={16} className="text-blue-600 flex-shrink-0" />
                                <h3 className="text-sm font-bold text-gray-900">參考資料</h3>
                            </div>
                            <div className="space-y-2">
                                {sources.map((s, i) => (
                                    <div key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-400 flex-shrink-0 mt-0.5">•</span>
                                        <span className="min-w-0 flex-1">
                                            {s.url ? (
                                                <a
                                                    href={s.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-700 hover:underline font-medium inline-flex items-center gap-1 break-all"
                                                >
                                                    {s.label || sourceTypeLabel(s.type)}
                                                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <span className="font-medium">{s.label || sourceTypeLabel(s.type)}</span>
                                            )}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag size={16} className="text-amber-600 flex-shrink-0" />
                                <h3 className="text-sm font-bold text-gray-900">相關主題</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(t => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-700 font-medium"
                                    >
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
