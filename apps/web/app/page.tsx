export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 inline-flex rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          Platform Builder AI
        </div>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight">
          حول فكرتك إلى موقع أو منصة خلال دقائق
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          اكتب فكرتك، وسيقوم الذكاء الاصطناعي بتوليد الصفحات، التصميم، قاعدة البيانات الأساسية، والواجهة المناسبة.
        </p>

        <div className="mt-10 flex gap-4">
          <a href="/register" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500">
            ابدأ مجانًا
          </a>
          <a href="/login" className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 font-medium text-slate-200">
            تسجيل الدخول
          </a>
        </div>
      </div>
    </main>
  );
}
