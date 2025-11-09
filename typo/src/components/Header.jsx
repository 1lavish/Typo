export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-teal-50 to-cyan-100 dark:from-black dark:via-cyan-950 dark:to-teal-900 border-b border-teal-200/50 dark:border-cyan-800/40 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        {/* Logo / App Name */}
        <div className="flex items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white select-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-400 dark:from-cyan-300 dark:via-teal-400 dark:to-cyan-300">
              TypeFlow
            </span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700 dark:text-gray-200">
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Home</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Practice</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">Leaderboard</a>
          <a href="#" className="hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">About</a>
        </nav>

        {/* CTA Button */}
        <button className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 dark:from-cyan-600 dark:to-teal-600 rounded-full shadow hover:shadow-md hover:opacity-90 transition-all">
          Start Typing
        </button>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-800 dark:text-gray-200 hover:text-teal-600 dark:hover:text-cyan-400 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </header>
  );
}