export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-r from-white via-teal-50 to-cyan-100 dark:from-black dark:via-cyan-950 dark:to-teal-900 border-t border-teal-200/50 dark:border-cyan-800/40 backdrop-blur-md shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
        
        {/* Left Section - Logo / Brand */}
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-400 dark:from-cyan-300 dark:via-teal-400 dark:to-cyan-300 select-none">
            TypeFlow
          </span>
          <span className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()}</span>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Contact</a>
        </div>

        {/* Right Section - Small Note */}
        <div className="hidden md:flex items-center space-x-1 text-gray-500 dark:text-gray-400">
          <span>Built with 💙</span>
        </div>
      </div>
    </footer>
  );
}