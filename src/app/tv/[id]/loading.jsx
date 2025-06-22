export default function Loading() {
  return (
    <div className="min-h-screen bg-primary text-white p-4 lg:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Video Player Skeleton */}
        <div className="w-full lg:w-2/3 aspect-video bg-gray-800/50 rounded-lg mx-auto mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="h-10 bg-gray-800/50 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-800/50 rounded w-1/2 mb-6"></div>
            
            <div className="space-y-4">
              <div className="h-4 bg-gray-800/50 rounded w-full"></div>
              <div className="h-4 bg-gray-800/50 rounded w-full"></div>
              <div className="h-4 bg-gray-800/50 rounded w-5/6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 p-4 bg-gray-800/20 rounded-lg">
                <div className="h-12 bg-gray-800/50 rounded"></div>
                <div className="h-12 bg-gray-800/50 rounded"></div>
                <div className="h-12 bg-gray-800/50 rounded"></div>
                <div className="h-12 bg-gray-800/50 rounded"></div>
            </div>

            <div className="flex flex-wrap gap-2 my-6">
              <div className="h-8 w-24 bg-gray-800/50 rounded-full"></div>
              <div className="h-8 w-24 bg-gray-800/50 rounded-full"></div>
              <div className="h-8 w-24 bg-gray-800/50 rounded-full"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div>
            <div className="h-8 bg-gray-800/50 rounded w-1/3 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-32 h-20 bg-gray-800/50 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                    <div className="h-4 bg-gray-800/50 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 