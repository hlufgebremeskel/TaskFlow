import React from 'react';
import { CheckCircle2, ListTodo, ShieldCheck, Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center items-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-5">
          <ListTodo className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          TaskFlow
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Phase 1 Initialized: React, Vite, Tailwind CSS, & NestJS Monorepo
        </p>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Vite + React (JavaScript) Running</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>Tailwind CSS v3 Configured</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700">
            <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
            <span>Ready for Phase 2 UI Dashboard</span>
          </div>
        </div>
      </div>
    </div>
  );
}
