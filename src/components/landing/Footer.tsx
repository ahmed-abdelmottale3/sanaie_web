"use client";


export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Sanaie Platform"
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-slate-900">Sanaie Platform</span>
            </div>
            <p className="text-sm text-slate-600">
              Connecting customers with trusted service providers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#stats" className="hover:text-slate-900 transition-colors">Statistics</a></li>
              <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-900">Support</a></li>
              <li><a href="#" className="hover:text-slate-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} Sanaie Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
