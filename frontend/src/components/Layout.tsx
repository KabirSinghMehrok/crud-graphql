import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, Settings, Home, Users, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSubMenu = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-[70px]">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="btn btn-icon btn-ghost">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Empower
            </h1>
          </div>

          {/* Horizontal Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-4">
              <a href="#" className="px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors">Dashboard</a>
              <a href="#" className="px-3 py-2 rounded-lg font-medium text-primary bg-primary/5">Employees</a>
              <a href="#" className="px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors">Reports</a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-icon btn-ghost">
              <Settings size={20} />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
              <User size={20} />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar / Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 z-[51] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-surface z-[52] border-r border-border transition-transform duration-300 ease-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleSidebar} className="btn btn-icon btn-ghost">
            <X size={24} />
          </button>
        </div>
        <div className="py-4">
          <div className="mb-1">
            <div
              className="flex items-center gap-3 px-6 py-3 cursor-pointer text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => toggleSubMenu('dashboard')}
            >
              <Home size={20} />
              <span className="font-medium">Dashboard</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform duration-200 ${expandedMenu === 'dashboard' ? 'rotate-180' : ''}`}
              />
            </div>
            {expandedMenu === 'dashboard' && (
              <div className="bg-slate-50/50 pl-14 pr-6 py-2 space-y-2">
                <a href="#" className="block text-sm text-slate-500 hover:text-primary">Overview</a>
                <a href="#" className="block text-sm text-slate-500 hover:text-primary">Analytics</a>
              </div>
            )}
          </div>

          <div className="mb-1">
            <div className="flex items-center gap-3 px-6 py-3 cursor-pointer text-primary bg-primary/5 border-r-2 border-primary">
              <Users size={20} />
              <span className="font-medium">Employees</span>
            </div>
          </div>

          <div className="mb-1">
            <div
              className="flex items-center gap-3 px-6 py-3 cursor-pointer text-slate-500 hover:text-primary hover:bg-primary/5 transition-colors"
              onClick={() => toggleSubMenu('reports')}
            >
              <BarChart size={20} />
              <span className="font-medium">Reports</span>
              <ChevronDown
                size={16}
                className={`ml-auto transition-transform duration-200 ${expandedMenu === 'reports' ? 'rotate-180' : ''}`}
              />
            </div>
            {expandedMenu === 'reports' && (
              <div className="bg-slate-50/50 pl-14 pr-6 py-2 space-y-2">
                <a href="#" className="block text-sm text-slate-500 hover:text-primary">Monthly</a>
                <a href="#" className="block text-sm text-slate-500 hover:text-primary">Annual</a>
                <a href="#" className="block text-sm text-slate-500 hover:text-primary">Custom</a>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 pt-[100px] pb-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
