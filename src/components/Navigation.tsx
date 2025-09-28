'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/customers', label: 'Customers', icon: '👥' },
    { href: '/inventory', label: 'Inventory', icon: '📦' },
    { href: '/work-orders', label: 'Work Orders', icon: '⚙️' },
    { href: '/stations', label: 'Stations', icon: '🏭' },
  ]

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 shadow-2xl border-r border-slate-600/30">
      <div className="p-6">
        {/* Logo/Brand */}
        <Link href="/" className="block mb-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
            Contour ERP
          </div>
          <div className="text-xs text-slate-400 mt-1">Enterprise Solution</div>
        </Link>

        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-slate-600/50 to-slate-500/30 text-white shadow-lg border border-slate-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/30 hover:shadow-md'
                }`}
              >
                <span className="text-lg mr-3 transition-transform group-hover:scale-110">
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-600/20">
            <div className="text-xs text-slate-400 mb-1">System Status</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-slate-300">Online</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation