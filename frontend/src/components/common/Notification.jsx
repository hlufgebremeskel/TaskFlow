import React from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Toast Notification banner component.
 */
export default function Notification({
  type = 'success',
  message,
  onClose,
  className = '',
}) {
  if (!message) return null;

  const configs = {
    success: {
      icon: CheckCircle,
      wrapperClass: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      iconClass: 'text-emerald-500',
    },
    error: {
      icon: AlertCircle,
      wrapperClass: 'bg-red-50 border-red-200 text-red-800',
      iconClass: 'text-red-500',
    },
    info: {
      icon: Info,
      wrapperClass: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      iconClass: 'text-indigo-500',
    },
  };

  const config = configs[type] || configs.info;
  const IconComponent = config.icon;

  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-3 px-4 py-3 border rounded-xl shadow-sm text-sm ${config.wrapperClass} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <IconComponent className={`w-4 h-4 shrink-0 ${config.iconClass}`} />
        <span className="font-medium">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
