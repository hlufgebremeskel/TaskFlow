import React from 'react';
import { Menu, Search, Bell, Plus, Calendar } from 'lucide-react';

/**
 * Navbar top header component.
 */
export default function Navbar({
  onToggleMobileSidebar,
  onOpenCreateTask,
  searchQuery = '',
  onSearchChange,
  user = { fullName: 'Alex Morgan' },
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile hamburger & Today date */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 rounded-xl hover:bg-slate-100 md:hidden transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Middle: Global Quick Search Input */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tasks, descriptions, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right: Quick actions and avatar */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onOpenCreateTask}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">New Task</span>
        </button>

        <button
          type="button"
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="View notifications"
          onClick={() => alert('Notifications feature: 1 overdue task requires your attention!')}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white font-semibold text-xs flex items-center justify-center shadow-2xs">
            {user.fullName ? user.fullName.charAt(0) : 'U'}
          </div>
          <span className="text-xs font-semibold text-slate-700 hidden lg:inline">
            {user.fullName}
          </span>
        </div>
      </div>
    </header>
  );
}
