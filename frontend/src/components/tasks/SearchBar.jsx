import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar component with instant clear button and match badge.
 */
export default function SearchBar({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search tasks by title or description...',
  matchCount = null,
}) {
  return (
    <div className="relative flex items-center w-full">
      <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-20 py-2.5 text-sm bg-white border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
      />
      <div className="absolute right-3 flex items-center gap-2">
        {matchCount !== null && value && (
          <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
            {matchCount} found
          </span>
        )}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
