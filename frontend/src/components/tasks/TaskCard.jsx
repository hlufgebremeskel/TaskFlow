import React from 'react';
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Edit3,
  Trash2,
  AlertTriangle,
  Folder,
} from 'lucide-react';
import PriorityBadge from '../common/PriorityBadge';
import StatusBadge from '../common/StatusBadge';

/**
 * TaskCard component.
 * Displays individual task details, category badge, priority, status, and interactive controls.
 */
export default function TaskCard({
  task,
  category,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const isCompleted = task.status === 'COMPLETED';

  // Check if task is overdue
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let isOverdue = false;
  let isDueToday = false;
  let formattedDueDate = null;

  if (task.dueDate) {
    const due = new Date(task.dueDate);
    const dueNormalized = new Date(due);
    dueNormalized.setHours(0, 0, 0, 0);

    isOverdue = !isCompleted && dueNormalized < now;
    isDueToday = !isCompleted && dueNormalized.getTime() === now.getTime();

    formattedDueDate = due.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: due.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  }

  return (
    <div
      className={`group relative bg-white rounded-2xl p-5 border transition-all duration-150 hover:shadow-sm ${
        isCompleted
          ? 'border-slate-200/60 bg-slate-50/40 text-slate-400'
          : isOverdue
          ? 'border-red-200/80 hover:border-red-300'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Completion Checkbox Button */}
        <button
          type="button"
          onClick={() => onToggleComplete && onToggleComplete(task.id)}
          className="mt-0.5 text-slate-300 hover:text-indigo-600 transition-colors shrink-0 focus:outline-none"
          title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-50" />
          ) : (
            <Circle className="w-5 h-5 hover:stroke-indigo-600" />
          )}
        </button>

        {/* Task Details Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {/* Category Pill */}
            {category ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: category.color || '#6366f1' }}
                />
                <span className="truncate max-w-[120px]">{category.name}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-500 border border-slate-200">
                <Folder className="w-3 h-3 text-slate-400" />
                <span>General</span>
              </span>
            )}

            {/* Priority Badge */}
            <PriorityBadge priority={task.priority} size="sm" />

            {/* Status Badge */}
            <StatusBadge status={task.status} size="sm" />
          </div>

          {/* Title */}
          <h4
            className={`text-sm font-semibold text-slate-900 leading-snug break-words ${
              isCompleted ? 'line-through text-slate-400' : ''
            }`}
          >
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p
              className={`mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed ${
                isCompleted ? 'text-slate-400' : ''
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Metadata Footer: Due Date and Timestamps */}
          <div className="mt-3.5 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3 flex-wrap">
              {formattedDueDate && (
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${
                    isOverdue
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : isDueToday
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'text-slate-500'
                  }`}
                >
                  {isOverdue ? (
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span>
                    {isOverdue
                      ? `Overdue (${formattedDueDate})`
                      : isDueToday
                      ? 'Due Today'
                      : `Due ${formattedDueDate}`}
                  </span>
                </div>
              )}

              {isCompleted && task.completedAt && (
                <span className="text-[11px] text-emerald-600 font-medium">
                  Completed
                </span>
              )}
            </div>

            {/* Hover Actions: Edit and Delete */}
            <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit && onEdit(task)}
                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Edit Task"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(task.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
