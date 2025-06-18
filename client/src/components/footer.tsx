import { FaRobot, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold text-primary-600">
                <FaRobot className="mr-2 inline" />
                AI导航
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              发现和探索最优秀的人工智能工具，提升工作效率和创造力。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">分类</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">文本生成</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">图像处理</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">代码助手</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">音频处理</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">使用指南</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">API文档</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">博客</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">帮助中心</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">关于</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">关于我们</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">联系我们</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">隐私政策</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">服务条款</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 AI导航. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
