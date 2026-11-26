import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import CompletedPage from './pages/CompletedPage';
import CategoriesPage from './pages/CategoriesPage';
import { MOCK_TASKS, MOCK_CATEGORIES } from './utils/mockData';

export default function App() {
  // Central mock state for interactive Phase 2 UI development
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout
              tasks={tasks}
              setTasks={setTasks}
              categories={categories}
              setCategories={setCategories}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route
            path="tasks/today"
            element={<TasksPage presetFilter={{ mode: 'TODAY' }} />}
          />
          <Route
            path="tasks/upcoming"
            element={<TasksPage presetFilter={{ mode: 'UPCOMING' }} />}
          />
          <Route path="tasks/completed" element={<CompletedPage />} />
          <Route path="categories" element={<CategoriesPage />} />
        </Route>
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
