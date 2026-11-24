import React, { useState } from 'react';
import { X, Palette } from 'lucide-react';

/**
 * CategoryModal form for creating and updating categories.
 */
export default function CategoryModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#4f46e5');
  const [error, setError] = useState('');

  const PRESET_COLORS = [
    { label: 'Indigo', hex: '#4f46e5' },
    { label: 'Cyan', hex: '#06b6d4' },
    { label: 'Emerald', hex: '#10b981' },
    { label: 'Amber', hex: '#f59e0b' },
    { label: 'Pink', hex: '#ec4899' },
    { label: 'Violet', hex: '#8b5cf6' },
    { label: 'Rose', hex: '#f43f5e' },
    { label: 'Slate', hex: '#64748b' },
  ];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }
    onSave({ name: name.trim(), color });
    setName('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="category-modal-title"
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 id="category-modal-title" className="text-base font-bold text-slate-900">
            Create Category
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Work, Study, Health"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-900 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                error
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Color Theme
            </label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setColor(c.hex)}
                  className={`w-8 h-8 rounded-xl transition-transform ${
                    color === c.hex ? 'scale-110 ring-2 ring-offset-2 ring-indigo-600' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
