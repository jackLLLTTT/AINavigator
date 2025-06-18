import { FaEdit, FaImage, FaCode, FaMusic, FaVideo, FaBriefcase, FaSearch } from "react-icons/fa";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", name: "全部", icon: null },
  { id: "text", name: "文本生成", icon: FaEdit },
  { id: "image", name: "图像处理", icon: FaImage },
  { id: "code", name: "代码助手", icon: FaCode },
  { id: "audio", name: "音频处理", icon: FaMusic },
  { id: "video", name: "视频制作", icon: FaVideo },
  { id: "business", name: "商业工具", icon: FaBriefcase },
  { id: "research", name: "研究分析", icon: FaSearch },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 py-4 overflow-x-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-white bg-primary-600 hover:bg-primary-700"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {Icon && <Icon className="mr-1" />}
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
