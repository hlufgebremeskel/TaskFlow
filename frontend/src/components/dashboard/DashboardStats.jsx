import React from 'react';
import {
  CheckCircle2,
  Clock,
  PlayCircle,
  AlertOctagon,
  ListTodo,
  TrendingUp,
} from 'lucide-react';

/**
 * Dashboard statistics metrics cards.
 * Visualizes user's productivity and task distribution.
 */
export default function DashboardStats({ stats }) {
  const {
    total = 0,
    completed = 0,
    inProgress = 0,
    pending = 0,
    overdue = 0,
    completionPercentage = 0,
  } = stats || {};

  const statItems = [
    {
      label: 'Total Tasks',
      value: total,
      subtext: 'All active & completed',
      icon: ListTodo,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      accentColor: 'border-l-indigo-500',
    },
    {
      label: 'In Progress',
      value: inProgress,
      subtext: 'Actively being worked on',
      icon: PlayCircle,
      iconBg: 'bg-sky-50 text-sky-600 border-sky-100',
      accentColor: 'border-l-sky-500',
    },
    {
      label: 'Pending',
      value: pending,
      subtext: 'Waiting to start',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      accentColor: 'border-l-amber-500',
    },
    {
      label: 'Completed',
      value: completed,
      subtext: `${completionPercentage}% overall completion`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      accentColor: 'border-l-emerald-500',
    },
    {
      label: 'Overdue',
      value: overdue,
      subtext: overdue > 0 ? 'Action required immediately' : 'All deadlines on track',
      icon: AlertOctagon,
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      accentColor: 'border-l-rose-500',
      isAlert: overdue > 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 5-Column Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow relative overflow-hidden border-l-4 ${item.accentColor}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="mt-2 text-2xl font-bold text-slate-900 tracking-tight">
                    {item.value}
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${item.iconBg}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div
                className={`mt-3 text-xs flex items-center gap-1 font-medium ${
                  item.isAlert ? 'text-rose-600' : 'text-slate-500'
                }`}
              >
                <span>{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Rate Progress Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Productivity & Completion Rate
              </h3>
              <p className="text-xs text-slate-500">
                {completed} of {total} total tasks resolved successfully
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-indigo-600">
              {completionPercentage}%
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200/50">
          <div
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, completionPercentage))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
