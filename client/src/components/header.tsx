import { FaRobot, FaSearch, FaBars } from "react-icons/fa";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                <FaRobot className="inline mr-2" />
                AI导航
              </h1>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="搜索AI工具..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">首页</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">分类</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">最新</a>
            <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">热门</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}
