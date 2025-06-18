import { FaPlus, FaGrip, FaList } from "react-icons/fa";
import ToolCard from "./tool-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Tool } from "@shared/schema";

interface ToolsGridProps {
  tools: Tool[];
  isLoading: boolean;
  activeCategory: string;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const getCategoryName = (category: string) => {
  const categories: Record<string, string> = {
    all: "全部工具",
    text: "文本生成工具",
    image: "图像处理工具",
    code: "代码助手工具",
    audio: "音频处理工具",
    video: "视频制作工具",
    business: "商业工具",
    research: "研究分析工具",
  };
  return categories[category] || "全部工具";
};

export default function ToolsGrid({ 
  tools, 
  isLoading, 
  activeCategory, 
  sortBy, 
  onSortChange,
  viewMode,
  onViewModeChange 
}: ToolsGridProps) {
  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <Skeleton className="w-12 h-12 rounded-lg mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {getCategoryName(activeCategory)}
          <span className="text-sm font-normal text-gray-500 ml-2">({tools.length}个工具)</span>
        </h3>
        
        <div className="flex items-center space-x-4">
          <select 
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="newest">最新添加</option>
            <option value="popular">最受欢迎</option>
            <option value="name">名称排序</option>
            <option value="rating">评分最高</option>
          </select>
          
          <div className="flex border border-gray-300 rounded-lg">
            <button 
              onClick={() => onViewModeChange("grid")}
              className={`px-3 py-2 rounded-l-lg border-r border-gray-300 transition-colors ${
                viewMode === "grid" 
                  ? "text-gray-700 bg-gray-100 hover:bg-gray-50" 
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
              title="网格视图"
            >
              <FaGrip />
            </button>
            <button 
              onClick={() => onViewModeChange("list")}
              className={`px-3 py-2 rounded-r-lg transition-colors ${
                viewMode === "list" 
                  ? "text-gray-700 bg-gray-100 hover:bg-gray-50" 
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
              title="列表视图"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {tools.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FaSearch className="mx-auto text-6xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">未找到匹配的工具</h3>
          <p className="text-gray-500">尝试调整搜索关键词或选择其他分类</p>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
          ))}
        </div>
      )}

      {tools.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors">
            <FaPlus className="mr-2 inline" />
            加载更多工具
          </button>
        </div>
      )}
    </main>
  );
}
