import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  ListTodo,
  Plus,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import DashboardStats from '../components/dashboard/DashboardStats';
import TaskCard from '../components/tasks/TaskCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { calculateStats } from '../utils/mockData';

/**
 * DashboardPage overview.
 * Highlights productivity stats, overdue alerts, today's schedule, and priority tasks.
 */
export default function DashboardPage() {
  const {
    tasks,
    setTasks,
    categories,
    onOpenCreateTask,
    onEditTask,
  } = useOutletContext();

  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const stats = calculateStats(tasks);

  // Category lookup map
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayStr = now.toISOString().split('T')[0];

  // Urgent tasks (Overdue or Due Today, incomplete)
  const urgentTasks = tasks
    .filter((t) => {
      if (t.status === 'COMPLETED' || !t.dueDate) return false;
      const due = new Date(t.dueDate);
      due.setHours(0, 0, 0, 0);
      return due <= now;
    })
    .slice(0, 4);

  // High priority pending/in-progress tasks
  const highPriorityTasks = tasks
    .filter((t) => t.priority === 'HIGH' && t.status !== 'COMPLETED')
    .slice(0, 4);

  // Toggle completion
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

  // Delete task
  const confirmDelete = () => {
    if (deleteTaskId) {
      setTasks((prev) => prev.filter((t) => t.id !== deleteTaskId));
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, Alex! 👋
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is what needs your attention today across your active projects and priorities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/tasks"
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            View All Tasks
          </Link>
          <button
            type="button"
            onClick={onOpenCreateTask}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/20 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Main Stats Cards Grid */}
      <DashboardStats stats={stats} />

      {/* Two-Column Section: Urgent Alerts & High Priority Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent & Due Today */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Urgent & Overdue
                </h3>
                <p className="text-xs text-slate-400">
                  Deadlines requiring immediate action
                </p>
              </div>
            </div>
            <Link
              to="/tasks/today"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {urgentTasks.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <span>Great job! No overdue tasks at this time.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {urgentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={categoryMap[task.categoryId]}
                  onToggleComplete={handleToggleComplete}
                  onEdit={onEditTask}
                  onDelete={(id) => setDeleteTaskId(id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* High Priority Focus */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  High Priority Focus
                </h3>
                <p className="text-xs text-slate-400">
                  Critical objectives to tackle next
                </p>
              </div>
            </div>
            <Link
              to="/tasks?priority=HIGH"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {highPriorityTasks.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
              <span>No outstanding high-priority tasks.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {highPriorityTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={categoryMap[task.categoryId]}
                  onToggleComplete={handleToggleComplete}
                  onEdit={onEditTask}
                  onDelete={(id) => setDeleteTaskId(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Task Deletion */}
      <ConfirmDialog
        isOpen={Boolean(deleteTaskId)}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task? This action cannot be reversed."
        confirmLabel="Delete Task"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTaskId(null)}
      />
    </div>
  );
}
