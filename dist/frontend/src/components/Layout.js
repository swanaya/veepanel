"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Layout;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const useAuth_1 = require("../hooks/useAuth");
const lucide_react_1 = require("lucide-react");
const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: lucide_react_1.LayoutDashboard },
    { name: 'Sites', href: '/sites', icon: lucide_react_1.Globe },
    { name: 'Databases', href: '/databases', icon: lucide_react_1.Database },
    { name: 'Email', href: '/email', icon: lucide_react_1.Mail },
    { name: 'SSL', href: '/ssl', icon: lucide_react_1.Shield },
    { name: 'Backup', href: '/backup', icon: lucide_react_1.HardDrive },
    { name: 'System', href: '/system', icon: lucide_react_1.Monitor },
    { name: 'DNS', href: '/dns', icon: lucide_react_1.Globe },
    { name: 'Users', href: '/users', icon: lucide_react_1.Users },
    { name: 'Settings', href: '/settings', icon: lucide_react_1.Settings },
];
function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    const location = (0, react_router_dom_1.useLocation)();
    const { user, logout } = (0, useAuth_1.useAuth)();
    return (<div className="min-h-screen bg-gray-50">
      
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}/>
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Vee Panel</h1>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
              <lucide_react_1.X size={24}/>
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (<react_router_dom_1.Link key={item.name} to={item.href} className={`sidebar-item ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
                  <item.icon size={20} className="mr-3"/>
                  {item.name}
                </react_router_dom_1.Link>);
        })}
          </nav>
        </div>
      </div>

      
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Vee Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (<react_router_dom_1.Link key={item.name} to={item.href} className={`sidebar-item ${isActive ? 'active' : ''}`}>
                  <item.icon size={20} className="mr-3"/>
                  {item.name}
                </react_router_dom_1.Link>);
        })}
          </nav>
          
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <lucide_react_1.User size={20} className="text-gray-400"/>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button onClick={logout} className="ml-2 text-gray-400 hover:text-gray-600" title="Logout">
                <lucide_react_1.LogOut size={16}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="lg:pl-64">
        
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <lucide_react_1.Menu size={24}/>
          </button>
          
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"/>
              <div className="flex items-center gap-x-4">
                <span className="text-sm text-gray-700">
                  {user?.username} ({user?.role})
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>);
}
//# sourceMappingURL=Layout.js.map