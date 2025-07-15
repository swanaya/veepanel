"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
const react_query_1 = require("@tanstack/react-query");
const react_hot_toast_1 = require("react-hot-toast");
const App_tsx_1 = require("./App.tsx");
require("./index.css");
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
client_1.default.createRoot(document.getElementById('root')).render(<react_1.default.StrictMode>
    <react_query_1.QueryClientProvider client={queryClient}>
      <react_router_dom_1.BrowserRouter>
        <App_tsx_1.default />
        <react_hot_toast_1.Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: {
            background: '#363636',
            color: '#fff',
        },
    }}/>
      </react_router_dom_1.BrowserRouter>
    </react_query_1.QueryClientProvider>
  </react_1.default.StrictMode>);
//# sourceMappingURL=main.js.map