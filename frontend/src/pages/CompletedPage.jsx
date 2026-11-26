import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { CheckCircle2, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import ConfirmDialog from '../components/common/ConfirmDialog';

/**
 * CompletedPage view.
 * Dedicated archive for completed tasks with reopen option.
 */
export default function CompletedPage() {
  const {
    tasks,
    setTasks,
    categories,
    onEditTask,
  } = useOutletContext();

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const completedTasks = tasks.filter((t) => t.status === 'COMPLETED');

  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: 'PENDING',
            completedAt: null,
          };
        }
        return t;
      })
    );
  };

  const confirmDelete = () => {
    if (deleteTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Celebration Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 rounded-2xl p-6 border border-emerald-200/60 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Completed Tasks Archive
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                You have accomplished {completedTasks.length} tasks so far. Keep up the high momentum!
              </p>
            </div>
          </div>
          <Link
            to="/tasks"
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors self-start sm:self-auto"
          >
            Back to Active Tasks
          </Link>
        </div>
      </div>

      {/* Task List */}
      <TaskList
        tasks={completedTasks}
        categories={categories}
        onToggleComplete={handleToggleComplete}
        onEdit={onEditTask}
        onDelete={(id) => setDeleteTaskId(id)}
        emptyTitle="No completed tasks yet"
        emptyDescription="Complete your first task from the dashboard or task list to celebrate your wins here."
      />

      <ConfirmDialog
        isOpen={Boolean(deleteTaskId)}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task record?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
}
