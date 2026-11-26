import React, { useState, useMemo } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Plus, ListFilter, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/tasks/SearchBar';
import FilterPanel from '../components/tasks/FilterPanel';
import TaskList from '../components/tasks/TaskList';
import ConfirmDialog from '../components/common/ConfirmDialog';

/**
 * TasksPage component.
 * Provides full task management: searching, multi-criteria filtering, sorting, and editing.
 */
export default function TasksPage({ presetFilter = null }) {
  const {
    tasks,
    setTasks,
    categories,
    onOpenCreateTask,
    onEditTask,
  } = useOutletContext();

  const [searchParams, setSearchParams] = useSearchParams();

  // Local filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(
    presetFilter?.status || searchParams.get('status') || 'ALL'
  );
  const [priorityFilter, setPriorityFilter] = useState(
    presetFilter?.priority || searchParams.get('priority') || 'ALL'
  );
  const [categoryFilter, setCategoryFilter] = useState(
    presetFilter?.category || searchParams.get('category') || 'ALL'
  );
  const [sortBy, setSortBy] = useState('CREATED_DESC');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Deletion modal state
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayStr = now.toISOString().split('T')[0];

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query filter (title or description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = task.title.toLowerCase().includes(q);
          const descMatch = (task.description || '').toLowerCase().includes(q);
          if (!titleMatch && !descMatch) return false;
        }

        // Preset filter rules (e.g. today or upcoming)
        if (presetFilter?.mode === 'TODAY') {
          if (task.dueDate !== todayStr || task.status === 'COMPLETED') return false;
        } else if (presetFilter?.mode === 'UPCOMING') {
          if (!task.dueDate || task.dueDate <= todayStr || task.status === 'COMPLETED')
            return false;
        }

        // Status filter
        if (statusFilter !== 'ALL' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) {
          return false;
        }

        // Category filter
        if (categoryFilter !== 'ALL' && task.categoryId !== categoryFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'CREATED_DESC') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === 'CREATED_ASC') {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        if (sortBy === 'DUE_ASC') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'PRIORITY_DESC') {
          const weight = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        return 0;
      });
  }, [
    tasks,
    searchQuery,
    statusFilter,
    priorityFilter,
    categoryFilter,
    sortBy,
    presetFilter,
    todayStr,
  ]);

  // Handle task status toggle
  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const isDone = t.status === 'COMPLETED';
          return {
            ...t,
            status: isDone ? 'PENDING' : 'COMPLETED',
            completedAt: isDone ? null : new Date().toISOString(),
          };
        }
        return t;
      })
    );
  };

  // Confirm task deletion
  const confirmDelete = () => {
    if (deleteTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
      setDeleteTaskId(null);
    }
  };

  const pageTitle =
    presetFilter?.mode === 'TODAY'
      ? 'Tasks Due Today'
      : presetFilter?.mode === 'UPCOMING'
      ? 'Upcoming Tasks'
      : 'All Tasks';

  const pageDescription =
    presetFilter?.mode === 'TODAY'
      ? 'Focus on what needs to be delivered before the end of the day.'
      : presetFilter?.mode === 'UPCOMING'
      ? 'Plan ahead for upcoming deadlines scheduled in the near future.'
      : 'Organize, prioritize, and track all your tasks in one unified view.';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{pageDescription}</p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateTask}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              matchCount={filteredTasks.length}
            />
          </div>
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`p-2.5 rounded-2xl border transition-colors flex items-center gap-2 text-xs font-semibold ${
              isFilterOpen
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle Filter Options"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {isFilterOpen && (
          <FilterPanel
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categories={categories}
          />
        )}
      </div>

      {/* Task List Grid */}
      <TaskList
        tasks={filteredTasks}
        categories={categories}
        onToggleComplete={handleToggleComplete}
        onEdit={onEditTask}
        onDelete={(id) => setDeleteTaskId(id)}
        onOpenCreateTask={onOpenCreateTask}
      />

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteTaskId)}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be reversed."
        confirmLabel="Delete Task"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
}
