'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Loader, Lightbulb, FileText, Tag } from 'lucide-react';
import EvidenceBadge from './EvidenceBadge';
import EvidenceScorePanel from './EvidenceScorePanel';
import InsightDetailModal from './InsightDetailModal';

// HabitInsightSection — Slice N user-facing surface for "為什麼這個習慣重要".
//
// First-layer UX (2026-05-27 redesign): each insight is a single-line
// collapsed card showing only the punchy `takeaway` quote (or the title
// as fallback when no takeaway exists). Detail / summary / sources are
// deferred to the expanded state so the habit accordion's add-flow stays
// visually quiet. This trades the previous "always show summary +
// takeaway + sources at first layer" approach for a one-tap progressive
// disclosure that respects the takeaway's role as the behavioural hook.
//
// react-markdown is dynamic-imported so the renderer chunk only loads
// when an insight is expanded — keeps the daily / dashboard First Load JS
// flat for users who never tap into the science layer.

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

// Single insight card. Layered disclosure:
//   - Layer 1 (closed): takeaway-as-headline only (or title fallback)
//   - Layer 2 (click headline): title + summary + sources + tags
//   - Layer 3 (click "研究細節"): markdown detail
//
// Sources are part of layer 2 because their primary value is trust signal
// — once the user has chosen to "expand" they want to see where this
// claim comes from. Putting sources behind layer 3 would feel buried.
function InsightCard({ insight }) {
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [scoreOpen, setScoreOpen] = useState(false);

    // Headline is whatever's punchiest: takeaway if author wrote one,
    // otherwise fall back to title. We mark takeaway with quote marks
    // so the user reads it as a hook line, not a category label.
    const hasTakeaway = Boolean(insight.takeaway && insight.takeaway.trim());
    const headline = hasTakeaway ? insight.takeaway : insight.title;

    return (
        <article
            onClick={() => setDetailModalOpen(true)}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group"
        >
            {/* Card content - clickable to open modal */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        {insight.evidence && (
                            <div className="mb-1.5">
                                <EvidenceBadge
                                    evidence={insight.evidence}
                                    active={scoreOpen}
                                    onClick={(e) => { e.stopPropagation(); setScoreOpen(v => !v); }}
                                />
                            </div>
                        )}
                        <p
                            className={`text-sm leading-snug ${
                                hasTakeaway ? 'text-emerald-900 font-medium' : 'text-gray-800 font-bold'
                            } group-hover:text-emerald-700 transition-colors`}
                        >
                            {hasTakeaway ? `「${headline}」` : headline}
                        </p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-emerald-600 transition-colors" />
                </div>

                {/* 證據力評分面板 — 由 badge 切換 */}
                {scoreOpen && insight.evidence && (
                    <div className="mt-2">
                        <EvidenceScorePanel evidence={insight.evidence} />
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {detailModalOpen && (
                <InsightDetailModal
                    insight={insight}
                    onClose={() => setDetailModalOpen(false)}
                />
            )}
        </article>
    );
}

export default function HabitInsightSection({ habitId, className = '' }) {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!habitId) {
            setInsights([]);
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        setError(null);
        // Default status filter is 'published' on the server — drafts /
        // archived rows never reach the user-facing surface.
        fetch(`/api/habits/${encodeURIComponent(habitId)}/insights`, { cache: 'no-store' })
            .then(r => (r.ok ? r.json() : Promise.reject(new Error(`status ${r.status}`))))
            .then(data => {
                if (cancelled) return;
                setInsights(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.warn('[HabitInsightSection] fetch failed:', err);
                if (!cancelled) {
                    setError(err.message || 'fetch failed');
                    setInsights([]);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [habitId]);

    // Silent absence: no insights → no section. Same goes for fetch errors
    // — we'd rather hide than show "couldn't load" noise to end-users.
    if (loading) {
        return (
            <div className={`py-3 flex items-center gap-2 text-xs text-gray-400 ${className}`}>
                <Loader size={12} className="animate-spin" />
                載入科學佐證…
            </div>
        );
    }
    if (error || insights.length === 0) return null;

    return (
        <section
            className={`space-y-2 ${className}`}
            aria-label="科學佐證"
            data-testid="habit-insight-section"
        >
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={12} className="text-emerald-500" />
                為什麼這個習慣重要
                {insights.length > 1 && (
                    <span className="text-gray-400 normal-case font-medium">· {insights.length}</span>
                )}
            </h4>
            <div className="space-y-2">
                {insights.map(ins => (
                    <InsightCard key={ins.id} insight={ins} />
                ))}
            </div>
        </section>
    );
}
