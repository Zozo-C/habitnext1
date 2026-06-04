'use client';

import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

const StartDateModal = ({ isOpen, planName, onClose, onConfirm }) => {
  const [startOption, setStartOption] = useState('today'); // 'today', 'tomorrow', 'custom'
  const [customDate, setCustomDate] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    let startDate;

    if (startOption === 'today') {
      startDate = new Date().toISOString().split('T')[0];
    } else if (startOption === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      startDate = tomorrow.toISOString().split('T')[0];
    } else {
      startDate = customDate;
    }

    onConfirm(startDate);
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-40 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-indigo-700 rounded-full transition-colors"
            aria-label="關閉"
          >
            <X size={20} className="text-white" />
          </button>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar size={24} className="text-white" />
            <h2 className="text-xl font-bold text-white">選擇開始日期</h2>
          </div>
          <p className="text-sm text-indigo-100">{planName}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Today Option */}
          <button
            onClick={() => setStartOption('today')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              startOption === 'today'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  startOption === 'today'
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                }`}
              >
                {startOption === 'today' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">今天開始</p>
                <p className="text-xs text-gray-500">{formatDate(today)}</p>
              </div>
            </div>
          </button>

          {/* Tomorrow Option */}
          <button
            onClick={() => setStartOption('tomorrow')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              startOption === 'tomorrow'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  startOption === 'tomorrow'
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                }`}
              >
                {startOption === 'tomorrow' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">明天開始</p>
                <p className="text-xs text-gray-500">{formatDate(tomorrowStr)}</p>
              </div>
            </div>
          </button>

          {/* Custom Date Option */}
          <button
            onClick={() => setStartOption('custom')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              startOption === 'custom'
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  startOption === 'custom'
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-gray-300'
                }`}
              >
                {startOption === 'custom' && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 mb-2">指定日期</p>
                {startOption === 'custom' && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    min={today}
                    className="w-full px-3 py-2 border border-indigo-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Buttons */}
        <div className="border-t border-gray-100 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={startOption === 'custom' && !customDate}
            className="flex-1 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            確認加入
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartDateModal;
