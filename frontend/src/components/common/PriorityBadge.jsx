import React from 'react';
import { AlertCircle, AlertTriangle, ArrowDown } from 'lucide-react';

/**
 * Reusable PriorityBadge component.
 * Displays LOW, MEDIUM, or HIGH priority with consistent visual hierarchy.
 */
export default function PriorityBadge({ priority, size = 'md', showIcon = true }) {
  const normalized = (priority || 'MEDIUM').toUpperCase();

  const configs = {
    HIGH: {
      label: 'High Priority',
      badgeClass: 'bg-red-50 text-red-700 border-red-200 ring-red-500/20',
      dotClass: 'bg-red-500',
      icon: AlertCircle,
    },
    MEDIUM: {
      label: 'Medium Priority',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20',
      dotClass: 'bg-amber-500',
      icon: AlertTriangle,
    },
    LOW: {
      label: 'Low Priority',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20',
      dotClass: 'bg-emerald-500',
      icon: ArrowDown,
    },
  };

  const config = configs[normalized] || configs.MEDIUM;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-2xs transition-colors ${
        config.badgeClass
      } ${sizeClasses[size] || sizeClasses.md}`}
    >
      {showIcon ? (
        <IconComponent className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      )}
      <span>{config.label}</span>
    </span>
  );
}
