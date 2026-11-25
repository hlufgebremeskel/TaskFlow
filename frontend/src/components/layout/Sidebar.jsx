import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Clock,
  CheckCircle2,
  Tags,
  Plus,
  ListTodo,
  LogOut,
  User,
  ChevronRight,
} from 'lucide-react';

/**
 * Sidebar component for primary application navigation.
 * Supports desktop sticky layout and mobile collapsible drawer.
 */
export default function Sidebar({
  categories = [],
  taskCounts = {},
  onOpenCreateTask,
  onOpenCreateCategory,
  onCloseMobile,
  user = { fullName: 'Alex Morgan', email: 'alex@taskflow.dev' },
}) {
  const mainNav = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
      count: null,
    },
    {
      name: 'All Tasks',
      to: '/tasks',
      icon: CheckSquare,
      count: taskCounts.total,
    },
    {
      name: 'Today',
      to: '/tasks/today',
      icon: Calendar,
      count: taskCounts.today,
      highlight: true,
    },
    {
      name: 'Upcoming',
      to: '/tasks/upcoming',
      icon: Clock,
      count: taskCounts.upcoming,
    },
    {
      name: 'Completed',
      to: '/tasks/completed',
      icon: CheckCircle2,
      count: taskCounts.completed,
    },
    {
      name: 'Categories',
      to: '/categories',
      icon: Tags,
      count: categories.length,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full select-none">
      {/* Brand Logo Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
        <Link
          to="/dashboard"
          onClick={onCloseMobile}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              TaskFlow
            </span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
              PRO
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Action Button */}
      <div className="p-4 pb-2">
        <button
          type="button"
          onClick={() => {
            if (onOpenCreateTask) onOpenCreateTask();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium rounded-xl shadow-sm shadow-indigo-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Overview
          </div>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.to}
                  end={item.to === '/tasks'}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-2xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-indigo-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {typeof item.count === 'number' && (
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                            isActive
                              ? 'bg-indigo-100/70 text-indigo-800'
                              : item.highlight && item.count > 0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Categories Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </span>
            <button
              type="button"
              onClick={() => {
                if (onOpenCreateCategory) onOpenCreateCategory();
                if (onCloseMobile) onCloseMobile();
              }}
              className="p-1 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-slate-100 transition-colors"
              title="Add Category"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {categories.map((cat) => (
              <NavLink
                key={cat.id}
                to={`/tasks?category=${cat.id}`}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-medium'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white shadow-2xs"
                    style={{ backgroundColor: cat.color || '#6366f1' }}
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                {cat.taskCount !== undefined && (
                  <span className="text-xs text-slate-400 group-hover:text-slate-600">
                    {cat.taskCount}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/categories"
              onClick={onCloseMobile}
              className="flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <span>Manage all categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* User Profile Card Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
              {user.fullName ? user.fullName.slice(0, 2) : <User className="w-4 h-4" />}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-800 truncate">
                {user.fullName || 'User'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {user.email || 'user@taskflow.dev'}
              </div>
            </div>
          </div>
          <button
            type="button"
            title="Sign out (Mock in Phase 2)"
            onClick={() => alert('Sign-out will be connected to backend auth in Phase 4 & 5!')}
            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
