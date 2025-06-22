import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white text-center p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-2">الصفحة غير موجودة</h2>
      <p className="mb-6">يبدو أنك ضللت الطريق! الصفحة التي تبحث عنها غير متوفرة.<br/>This page could not be found.</p>
      <Link href="/" className="px-6 py-3 bg-yellow-400 text-primary font-bold rounded-lg hover:bg-yellow-300 transition">العودة للرئيسية | Back to Home</Link>
    </div>
  );
} 