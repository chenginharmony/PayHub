export default function AnalyticsLoading() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-pulse animate-fade-in">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="mt-2 h-4 w-64 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-4">
          <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
          <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Chart Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-[300px] bg-gray-100 rounded-lg"></div>
        </div>
        
        {/* Projects Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
          <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-[300px] bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded"></div>
            <div className="mt-2 h-4 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
