import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import type { Tool } from "@shared/schema";

interface ToolCardProps {
  tool: Tool;
  viewMode: "grid" | "list";
}

const getLogoColors = (logo: string) => {
  const colors: Record<string, string> = {
    GP: "from-purple-500 to-pink-500",
    CL: "from-green-500 to-blue-500",
    MD: "from-pink-500 to-rose-500",
    SD: "from-blue-500 to-cyan-500",
    CP: "from-gray-800 to-gray-600",
    TB: "from-orange-500 to-red-500",
    EL: "from-indigo-500 to-purple-500",
    RW: "from-red-500 to-pink-500",
    JA: "from-emerald-500 to-teal-500",
    PE: "from-cyan-500 to-blue-500",
    NO: "from-yellow-500 to-orange-500",
  };
  return colors[logo] || "from-gray-500 to-gray-600";
};

const getPricingColor = (pricing: string) => {
  if (pricing === "免费") return "text-green-600";
  if (pricing === "付费") return "text-blue-600";
  return "text-yellow-600";
};

export default function ToolCard({ tool, viewMode }: ToolCardProps) {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex text-yellow-400">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={i} className="text-xs" />
        ))}
        {hasHalfStar && <FaStar className="text-xs opacity-50" />}
        {Array.from({ length: 5 - Math.ceil(rating) }).map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-xs text-gray-300" />
        ))}
      </div>
    );
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 group p-6">
        <div className="flex items-start space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${getLogoColors(tool.logo)} rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
            {tool.logo}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {tool.name}
              </h4>
              <div className="flex items-center space-x-1 ml-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">在线</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{tool.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-6 ml-4">
                <div className="flex items-center space-x-1">
                  {renderStars(tool.rating)}
                  <span className="text-sm text-gray-500 ml-1">{tool.rating}</span>
                </div>
                <span className={`text-sm font-medium ${getPricingColor(tool.pricing)}`}>
                  {tool.pricing}
                </span>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  访问工具
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${getLogoColors(tool.logo)} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
            {tool.logo}
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">在线</span>
          </div>
        </div>
        
        <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {tool.name}
        </h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tool.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(tool.rating)}
            <span className="text-xs text-gray-500 ml-1">{tool.rating}</span>
          </div>
          <span className={`text-xs font-medium ${getPricingColor(tool.pricing)}`}>
            {tool.pricing}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FaExternalLinkAlt className="mr-2" />
          访问工具
        </a>
      </div>
    </div>
  );
}
