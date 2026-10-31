export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent-magenta rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight text-white">SPIDER<span className="text-accent-magenta">VERSE</span> EXPLORER</span>
          </div>

          <div className="flex gap-6 text-xs text-gray-500 font-geist">
            <a href="#" className="hover:text-accent-cyan transition-colors">GitHub</a>
            <a href="#" className="hover:text-accent-cyan transition-colors">About</a>
            <a href="#" className="hover:text-accent-cyan transition-colors">Contact</a>
          </div>

          <div className="text-xs text-gray-600 font-geist">
            Built with Next.js, Framer Motion & Three.js
          </div>
        </div>
      </div>
    </footer>
  );
}