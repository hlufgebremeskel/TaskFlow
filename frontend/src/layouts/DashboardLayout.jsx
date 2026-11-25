import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import TaskModal from '../components/tasks/TaskModal';
import CategoryModal from '../components/categories/CategoryModal';
import { MOCK_CATEGORIES, MOCK_TASKS, calculateStats } from '../utils/mockData';

/**
 * Main application layout shell.
 * Coordinates sidebar, top navigation, modals, and route outlets with mock state.
 */
export default function DashboardLayout({
  tasks,
  setTasks,
  categories,
  setCategories,
  searchQuery,
  setSearchQuery,
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Compute stats for sidebar badges
  const stats = calculateStats(tasks || MOCK_TASKS);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = (tasks || []).filter(
    (t) => t.dueDate === todayStr && t.status !== 'COMPLETED'
  ).length;

  const upcomingCount = (tasks || []).filter((t) => {
    if (!t.dueDate || t.status === 'COMPLETED') return false;
    return t.dueDate > todayStr;
  }).length;

  const taskCounts = {
    total: stats.total,
    today: todayCount,
    upcoming: upcomingCount,
    completed: stats.completed,
  };

  // Task creation or edit save handler
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      // Edit mode
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...taskData, updatedAt: new Date().toISOString() } : t))
      );
    } else {
      // Create mode
      const newTask = {
        ...taskData,
        id: `tsk-${Date.now()}`,
        status: taskData.status || 'PENDING',
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
    setEditingTask(null);
    setIsTaskModalOpen(false);
  };

  // Category save handler
  const handleSaveCategory = (catData) => {
    const newCategory = {
      ...catData,
      id: `cat-${Date.now()}`,
      taskCount: 0,
      createdAt: new Date().toISOString(),
    };
    setCategories((prev) => [...prev, newCategory]);
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar (visible on md+) */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          categories={categories}
          taskCounts={taskCounts}
          onOpenCreateTask={() => {
            setEditingTask(null);
            setIsTaskModalOpen(true);
          }}
          onOpenCreateCategory={() => setIsCategoryModalOpen(true)}
        />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 max-w-[80vw] h-full shadow-2xl">
            <Sidebar
              categories={categories}
              taskCounts={taskCounts}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
              onOpenCreateTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onOpenCreateCategory={() => setIsCategoryModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onOpenCreateTask={() => {
            setEditingTask(null);
            setIsTaskModalOpen(true);
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet
              context={{
                tasks,
                setTasks,
                categories,
                setCategories,
                searchQuery,
                setSearchQuery,
                onOpenCreateTask: () => {
                  setEditingTask(null);
                  setIsTaskModalOpen(true);
                },
                onEditTask: (task) => {
                  setEditingTask(task);
                  setIsTaskModalOpen(true);
                },
                onOpenCreateCategory: () => setIsCategoryModalOpen(true),
              }}
            />
          </div>
        </main>
      </div>

      {/* Shared Create / Edit Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        initialData={editingTask}
        categories={categories}
      />

      {/* Shared Create Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
}
