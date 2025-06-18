interface StatsSectionProps {
  stats: {
    totalTools: number;
    categories: number;
    weeklyUpdates: number;
    users: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-8 bg-gradient-to-r from-primary-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">发现最佳AI工具</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            精选优质人工智能工具，助力提升工作效率和创造力
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.totalTools}+</div>
            <div className="text-sm text-gray-600 mt-1">AI工具</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.categories}</div>
            <div className="text-sm text-gray-600 mt-1">分类</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.weeklyUpdates}+</div>
            <div className="text-sm text-gray-600 mt-1">每周更新</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{(stats.users / 1000).toFixed(0)}K+</div>
            <div className="text-sm text-gray-600 mt-1">用户</div>
          </div>
        </div>
      </div>
    </section>
  );
}
