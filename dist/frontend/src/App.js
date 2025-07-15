"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const react_hot_toast_1 = require("react-hot-toast");
const useAuth_1 = require("./hooks/useAuth");
const Login_1 = require("./pages/Login");
const Dashboard_1 = require("./pages/Dashboard");
const Sites_1 = require("./pages/Sites");
const Databases_1 = require("./pages/Databases");
const Email_1 = require("./pages/Email");
const SSL_1 = require("./pages/SSL");
const Backup_1 = require("./pages/Backup");
const System_1 = require("./pages/System");
const Settings_1 = require("./pages/Settings");
const Users_1 = require("./pages/Users");
const Setup_1 = require("./pages/Setup");
const Layout_1 = require("./components/Layout");
require("./index.css");
const queryClient = new react_query_1.QueryClient();
function ProtectedRoute({ children }) {
    const { user, isLoading } = (0, useAuth_1.useAuth)();
    if (isLoading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>);
    }
    if (!user) {
        return <react_router_dom_1.Navigate to="/login" replace/>;
    }
    const extendedUser = user;
    if (extendedUser.forcePasswordChange || extendedUser.isTemporaryEmail) {
        return <react_router_dom_1.Navigate to="/setup" replace/>;
    }
    return <>{children}</>;
}
function AppRoutes() {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
      <react_router_dom_1.Route path="/setup" element={<ProtectedRoute>
          <Setup_1.default />
        </ProtectedRoute>}/>
      <react_router_dom_1.Route path="/" element={<ProtectedRoute>
          <Layout_1.default>
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route index element={<react_router_dom_1.Navigate to="/dashboard" replace/>}/>
              <react_router_dom_1.Route path="dashboard" element={<Dashboard_1.default />}/>
              <react_router_dom_1.Route path="sites" element={<Sites_1.default />}/>
              <react_router_dom_1.Route path="databases" element={<Databases_1.default />}/>
              <react_router_dom_1.Route path="email" element={<Email_1.default />}/>
              <react_router_dom_1.Route path="ssl" element={<SSL_1.default />}/>
              <react_router_dom_1.Route path="backup" element={<Backup_1.default />}/>
              <react_router_dom_1.Route path="system" element={<System_1.default />}/>
              <react_router_dom_1.Route path="settings" element={<Settings_1.default />}/>
              <react_router_dom_1.Route path="users" element={<Users_1.default />}/>
            </react_router_dom_1.Routes>
          </Layout_1.default>
        </ProtectedRoute>}/>
    </react_router_dom_1.Routes>);
}
function App() {
    return (<react_query_1.QueryClientProvider client={queryClient}>
      <react_router_dom_1.BrowserRouter>
        <AppRoutes />
        <react_hot_toast_1.Toaster position="top-right"/>
      </react_router_dom_1.BrowserRouter>
    </react_query_1.QueryClientProvider>);
}
exports.default = App;
//# sourceMappingURL=App.js.map