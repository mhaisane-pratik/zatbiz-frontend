'use client';

import { Toast } from '@/types';

interface ToastContainerProps {
  toasts: Toast[];
  onRemoveToast?: (id: number) => void;
}

export default function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-xs min-w-[240px] border bg-white animate-slide-in ${
            toast.isError ? 'border-rose-200 text-rose-600' : 'border-indigo-150 text-indigo-655'
          }`}
        >
          <span>{toast.isError ? '✕' : '✓'}</span>
          <span className="font-semibold text-slate-800 flex-1">{toast.text}</span>
          {onRemoveToast && (
            <button
              onClick={() => onRemoveToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
