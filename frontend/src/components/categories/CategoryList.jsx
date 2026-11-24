import React from 'react';
import { Folder, MoreVertical, Trash2, Edit2, ListTodo } from 'lucide-react';

/**
 * CategoryList component.
 * Displays user categories with color indicators, task counts, and edit/delete actions.
 */
export default function CategoryList({
  categories = [],
  onDeleteCategory,
  onSelectCategory,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between"
        >
          <div
            className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
            onClick={() => onSelectCategory && onSelectCategory(cat.id)}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
              style={{ backgroundColor: cat.color || '#6366f1' }}
            >
              <Folder className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {cat.name}
              </h4>
              <p className="text-xs text-slate-500">
                {cat.taskCount || 0} tasks assigned
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 pl-2">
            <button
              type="button"
              onClick={() => onDeleteCategory && onDeleteCategory(cat.id)}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              title="Delete Category"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
