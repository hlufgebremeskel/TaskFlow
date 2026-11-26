import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Tags, Plus, Folder, Sparkles } from 'lucide-react';
import CategoryList from '../components/categories/CategoryList';
import ConfirmDialog from '../components/common/ConfirmDialog';

/**
 * CategoriesPage component.
 * Organizes tasks by categories (Work, Study, Personal, etc.).
 */
export default function CategoriesPage() {
  const {
    categories,
    setCategories,
    tasks,
    setTasks,
    onOpenCreateCategory,
  } = useOutletContext();

  const navigate = useNavigate();
  const [deleteCatId, setDeleteCatId] = useState(null);

  // Compute live task counts for each category
  const categoriesWithCounts = categories.map((cat) => {
    const count = tasks.filter((t) => t.categoryId === cat.id).length;
    return { ...cat, taskCount: count };
  });

  const confirmDeleteCategory = () => {
    if (deleteCatId) {
      // Disassociate tasks from deleted category (per spec: set categoryId to null)
      setTasks((prev) =>
        prev.map((t) => (t.categoryId === deleteCatId ? { ...t, categoryId: null } : t))
      );
      setCategories((prev) => prev.filter((c) => c.id !== deleteCatId));
      setDeleteCatId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Categories
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Organize tasks into structured projects, personal goals, and workstreams.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateCategory}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Category</span>
        </button>
      </div>

      <CategoryList
        categories={categoriesWithCounts}
        onDeleteCategory={(id) => setDeleteCatId(id)}
        onSelectCategory={(id) => navigate(`/tasks?category=${id}`)}
      />

      {/* Safety Deletion Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteCatId)}
        title="Delete Category"
        message="Are you sure you want to delete this category? Associated tasks will NOT be deleted; they will be categorized under General."
        confirmLabel="Delete Category"
        onConfirm={confirmDeleteCategory}
        onCancel={() => setDeleteCatId(null)}
      />
    </div>
  );
}
