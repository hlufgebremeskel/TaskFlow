import React from 'react';
import { CheckCircle2, Clock, PlayCircle } from 'lucide-react';

/**
 * Reusable StatusBadge component.
 * Displays PENDING, IN_PROGRESS, or COMPLETED status.
 */
export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || 'PENDING').toUpperCase();

  const configs = {
    PENDING: {
      label: 'Pending',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      dotClass: 'bg-slate-400',
      icon: Clock,
    },
    IN_PROGRESS: {
      label: 'In Progress',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      dotClass: 'bg-sky-500 animate-pulse',
      icon: PlayCircle,
    },
    COMPLETED: {
      label: 'Completed',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      dotClass: 'bg-emerald-500',
      icon: CheckCircle2,
    },
  };

  const config = configs[normalized] || configs.PENDING;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs ${
        config.badgeClass
      } ${sizeClasses[size] || sizeClasses.md}`}
    >
      <IconComponent className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}
