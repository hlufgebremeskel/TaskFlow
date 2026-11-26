/**
 * Realistic mock data for frontend UI development (Phase 2)
 * Designed to test all statuses, priorities, categories, and date edge-cases (overdue, due today, upcoming).
 */

const today = new Date();
const formatDate = (offsetDays) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const MOCK_USER = {
  id: 'usr-1',
  fullName: 'Alex Morgan',
  email: 'alex.morgan@taskflow.dev',
  avatarUrl: null,
  role: 'Software Engineer'
};

export const MOCK_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Work',
    color: '#4f46e5', // Indigo
    taskCount: 4,
    createdAt: '2026-11-01T08:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Study',
    color: '#06b6d4', // Cyan
    taskCount: 2,
    createdAt: '2026-11-02T09:30:00Z',
  },
  {
    id: 'cat-3',
    name: 'Personal',
    color: '#10b981', // Emerald
    taskCount: 3,
    createdAt: '2026-11-03T11:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Projects',
    color: '#f59e0b', // Amber
    taskCount: 3,
    createdAt: '2026-11-04T14:15:00Z',
  },
  {
    id: 'cat-5',
    name: 'Health',
    color: '#ec4899', // Pink
    taskCount: 1,
    createdAt: '2026-11-05T16:45:00Z',
  },
];

export const MOCK_TASKS = [
  {
    id: 'tsk-101',
    title: 'Implement JWT refresh-token rotation in NestJS',
    description: 'Configure short-lived access tokens (15m) and store hashed refresh tokens in the database with automatic revocation upon reuse.',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    dueDate: formatDate(-1), // Overdue
    completedAt: null,
    categoryId: 'cat-1',
    createdAt: '2026-11-20T10:00:00Z',
    updatedAt: '2026-11-22T14:00:00Z',
  },
  {
    id: 'tsk-102',
    title: 'Design PostgreSQL schema migrations with TypeORM',
    description: 'Define relational entities for Users, Tasks, and Categories with foreign keys, indexes, and on-delete constraints.',
    priority: 'HIGH',
    status: 'PENDING',
    dueDate: formatDate(0), // Due today
    completedAt: null,
    categoryId: 'cat-4',
    createdAt: '2026-11-21T09:00:00Z',
    updatedAt: '2026-11-21T09:00:00Z',
  },
  {
    id: 'tsk-103',
    title: 'Review React Context & custom auth hooks architecture',
    description: 'Prepare an authentication provider that handles silent token refresh via Axios interceptors and redirects unauthenticated users.',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: formatDate(1), // Upcoming tomorrow
    completedAt: null,
    categoryId: 'cat-2',
    createdAt: '2026-11-22T11:30:00Z',
    updatedAt: '2026-11-22T11:30:00Z',
  },
  {
    id: 'tsk-104',
    title: 'Set up Tailwind CSS design system tokens',
    description: 'Configure standard color palettes, typography scale, responsive breakpoints, and dark mode ready utility classes.',
    priority: 'LOW',
    status: 'COMPLETED',
    dueDate: formatDate(-3),
    completedAt: '2026-11-21T18:00:00Z',
    categoryId: 'cat-4',
    createdAt: '2026-11-19T08:00:00Z',
    updatedAt: '2026-11-21T18:00:00Z',
  },
  {
    id: 'tsk-105',
    title: 'Daily morning 5km run and hydration routine',
    description: 'Maintain cardiovascular health and track split times in health log.',
    priority: 'LOW',
    status: 'COMPLETED',
    dueDate: formatDate(0),
    completedAt: '2026-11-24T07:30:00Z',
    categoryId: 'cat-5',
    createdAt: '2026-11-24T06:00:00Z',
    updatedAt: '2026-11-24T07:30:00Z',
  },
  {
    id: 'tsk-106',
    title: 'Prepare presentation slides for sprint demo',
    description: 'Summarize architecture progress, ERD diagrams, and interactive React dashboard components for the engineering cohort.',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    dueDate: formatDate(3),
    completedAt: null,
    categoryId: 'cat-1',
    createdAt: '2026-11-23T13:00:00Z',
    updatedAt: '2026-11-24T10:00:00Z',
  },
  {
    id: 'tsk-107',
    title: 'Book annual dental checkup',
    description: 'Schedule routine cleaning and dental inspection.',
    priority: 'LOW',
    status: 'PENDING',
    dueDate: formatDate(7),
    completedAt: null,
    categoryId: 'cat-3',
    createdAt: '2026-11-20T16:00:00Z',
    updatedAt: '2026-11-20T16:00:00Z',
  },
  {
    id: 'tsk-108',
    title: 'Read chapter 4 of Designing Data-Intensive Applications',
    description: 'Focus on encoding formats, schema evolution, Protobuf, and JSON schema versioning.',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: formatDate(4),
    completedAt: null,
    categoryId: 'cat-2',
    createdAt: '2026-11-21T15:00:00Z',
    updatedAt: '2026-11-21T15:00:00Z',
  },
  {
    id: 'tsk-109',
    title: 'Audit repository dependencies and update security patches',
    description: 'Run npm audit, verify package compatibility, and ensure all transitive dependencies are clean.',
    priority: 'HIGH',
    status: 'COMPLETED',
    dueDate: formatDate(-2),
    completedAt: '2026-11-23T17:00:00Z',
    categoryId: 'cat-1',
    createdAt: '2026-11-22T08:00:00Z',
    updatedAt: '2026-11-23T17:00:00Z',
  },
];

/**
 * Calculates dashboard statistics from task collection
 */
export function calculateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'COMPLETED').length;
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;
  const pending = tasks.filter((t) => t.status === 'PENDING').length;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const overdue = tasks.filter((t) => {
    if (t.status === 'COMPLETED' || !t.dueDate) return false;
    const due = new Date(t.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < now;
  }).length;

  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    pending,
    overdue,
    completionPercentage,
  };
}
