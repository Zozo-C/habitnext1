'use client';

import React from 'react';

const CompletionPieChart = ({ incompletedCount = 0, completedCount = 0 }) => {
    const total = incompletedCount + completedCount;
    const percentage = total === 0 ? 0 : (completedCount / total) * 100;

    // SVG circle pie chart - starts from top, goes clockwise
    // Full circle is 100%, green is completion percentage
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const greenArc = (percentage / 100) * circumference;
    const yellowArc = circumference - greenArc;

    return (
        <div className="flex flex-col items-center gap-2 py-3">
            <div className="relative w-16 h-16">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    className="transform -rotate-90"
                >
                    {/* Yellow background circle */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="#FCD34D"
                        strokeWidth="8"
                    />

                    {/* Green progress circle */}
                    <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="none"
                        stroke="#4ADE80"
                        strokeWidth="8"
                        strokeDasharray={greenArc}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dasharray 0.6s ease-in-out' }}
                    />
                </svg>

                {/* Center percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>

            {/* Status text */}
            <div className="text-center">
                <p className="text-xs text-gray-600">
                    {total === 0 ? '無任務' : `${completedCount}/${total} 完成`}
                </p>
            </div>
        </div>
    );
};

export default CompletionPieChart;
