import { useState, useCallback } from 'react';
import { Toast } from '@/types';

let toastCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((text: string, isError = false) => {
    const id = Date.now() + (++toastCounter);
    setToasts((prev) => [...prev, { id, text, isError }]);
    
    // Automatically remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
}
