import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, BarChart3, Users, Settings, HelpCircle, FolderKanban, CreditCard, Menu, X } from 'lucide-react'
import clsx from 'clsx'
import './styles/tailwind.css'
import './styles/global.scss'
import './styles/broken-layout.css'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Team from './pages/Team.jsx'
import Reports from './pages/Reports.jsx'
import Billing from './pages/Billing.jsx'
import SettingsPage from './pages/Settings.jsx'
import Support from './pages/Support.jsx'

const routes = [
  { path: '/', label: 'Dashboard', icon: Home, component: Dashboard },
  { path: '/projects', label: 'Projects', icon: FolderKanban, component: Projects },
  { path: '/team', label: 'Team', icon: Users, component: Team },
  { path: '/reports', label: 'Reports', icon: BarChart3, component: Reports },
  { path: '/billing', label: 'Billing', icon: CreditCard, component: Billing },
  { path: '/settings', label: 'Settings', icon: Settings, component: SettingsPage },
  { path: '/support', label: 'Support', icon: HelpCircle, component: Support }
]

function readHashPath() {
  const raw = window.location.hash.replace(/^#/, '') || '/'
  const pathOnly = raw.split('?')[0].split('#')[0] || '/'
  return pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`
}

function App() {
  const [path, setPath] = useState(readHashPath())
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [globalSearch, setGlobalSearch] = useState('')

  useEffect(() => {
    const onHashChange = () => setPath(readHashPath())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const currentRoute = useMemo(() => {
    const normalized = path === '/' ? '/' : path.replace(/\/$/, '')
    return routes.find((route) => route.path === normalized) || routes[0]
  }, [path])

  const Page = currentRoute.component

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={clsx('sidebar', sidebarOpen && 'sidebar--open')}>
        <div className="brand-block">
          <div className="brand-logo">N</div>
          <div>
            <strong>Northstar</strong>
            <span>Ops Console</span>
          </div>
          <button type="button" className="icon-only close-mobile" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>
        <nav className="nav-list" aria-label="Main navigation">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <a
                key={route.path}
                className={clsx('nav-item', currentRoute.path === route.path && 'active')}
                href={`#${route.path}`}
                onClick={() => setSidebarOpen(false)}
                aria-current={currentRoute.path === route.path ? 'page' : undefined}
              >
                <Icon size={18} />
                <span>{route.label}</span>
              </a>
            )
          })}
        </nav>
        <div className="sidebar-footer">
          <p>Candidate task</p>
          <small>Find and fix UX, CSS, routing, state, and accessibility issues.</small>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button type="button" className="icon-only menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? 'Close menu' : 'Open menu'} aria-expanded={sidebarOpen}>
            <Menu size={20} />
          </button>
          <div className="search-box">
            <input
              type="search"
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Search projects, team, invoices…"
              aria-label="Search dashboard"
            />
          </div>
          <button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-pressed={theme === 'dark'}>
            {theme === 'dark' ? 'Light' : 'Dark'} mode
          </button>
        </header>
        <section className="page-frame">
          <Page search={globalSearch} />
        </section>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
