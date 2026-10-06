'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';

type Project = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: string;
  status: string;
  createdAt: string;
};

const defaultProjects: Project[] = [
  { id: '1', name: 'موقع مقاولات', slug: 'site-1', type: 'WEBSITE', status: 'PUBLISHED', createdAt: new Date().toISOString() },
  { id: '2', name: 'متجر إلكتروني', slug: 'store-1', type: 'STORE', status: 'DRAFT', createdAt: new Date().toISOString() },
  { id: '3', name: 'منصة حجز عيادة', slug: 'booking-1', type: 'BOOKING', status: 'GENERATING', createdAt: new Date().toISOString() },
];

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiFetch<Project[]>('/projects');
        setProjects(data && data.length ? data : defaultProjects);
      } catch (err: any) {
        setError(err.message || 'تعذر تحميل المشاريع');
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const stats = [
    { label: 'المشاريع', value: String(projects.length) },
    { label: 'الصفحات', value: '48' },
    { label: 'AI Credits', value: '85' },
    { label: 'الإيرادات', value: '6,250 ر.س' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div>
            <p className="text-sm text-slate-400">لوحة التحكم</p>
            <h1 className="mt-1 text-3xl font-bold">مرحبًا بك مرة أخرى</h1>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500">
            + مشروع جديد
          </button>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-3 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">آخر المشاريع</h2>
              <a href="/" className="text-sm text-blue-400 hover:text-blue-300">عرض الكل</a>
            </div>

            {loading ? (
              <p className="text-slate-400">جاري تحميل المشاريع...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <div>
                      <p className="font-semibold">{project.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{project.type}</p>
                    </div>

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-5 text-xl font-semibold">مبدئيًا</h2>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>• إنشاء مشروع جديد باستخدام الذكاء الاصطناعي</li>
              <li>• اختيار القالب المناسب</li>
              <li>• تخصيص الألوان والخطوط</li>
              <li>• تعديل الصفحات في المحرر المرئي</li>
              <li>• معاينة ونشر الموقع</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
