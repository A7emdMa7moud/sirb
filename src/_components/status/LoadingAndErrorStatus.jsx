"use client";

import Loading from "../Loading"; // تأكد من المسار الصحيح لمكون التحميل

function LoadingAndErrorStatus({
  isLoading,
  errorMessage,
  sectionTitle,
  requestKey,
  children, // هذا سيحتوي على المحتوى الفعلي في حالة عدم وجود تحميل أو خطأ
}) {
  if (isLoading) {
    return (
      <section className="trending tv-section py-10 mb-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Loading title={sectionTitle} key={`loading-${requestKey}`} />
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="trending tv-section py-10 mb-20 px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 capitalize">{sectionTitle}</h2>
        <div className="flex justify-center items-center">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </section>
    );
  }

  // في حالة عدم وجود تحميل أو خطأ، اعرض المحتوى الأصلي (children)
  return <>{children}</>;
}

export default LoadingAndErrorStatus;
