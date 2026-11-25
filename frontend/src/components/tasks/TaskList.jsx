import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from '../common/EmptyState';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * TaskList container component.
 * Renders an array of TaskCards or a styled empty state.
 */
export default function TaskList({
  tasks = [],
  categories = [],
  isLoading = false,
  onToggleComplete,
  onEdit,
  onDelete,
  onOpenCreateTask,
  emptyTitle = 'No tasks found',
  emptyDescription = 'There are no tasks matching your selected filters or search query.',
}) {
  if (isLoading) {
    return <LoadingSpinner label="Loading your tasks..." className="py-20" />;
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onOpenCreateTask ? 'Create New Task' : undefined}
        onAction={onOpenCreateTask}
      />
    );
  }

  // Create lookup map for quick category lookups by ID
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          category={categoryMap[task.categoryId]}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
