"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const react_1 = require("react");
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const axios_1 = require("axios");
const useAuthStore = (0, zustand_1.create)()((0, middleware_1.persist)((set, get) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (email, password) => {
        try {
            set({ isLoading: true });
            const response = await axios_1.default.post('http://localhost:4000/auth/login', {
                email,
                password,
            });
            const { user, token } = response.data;
            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            });
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
        });
        delete axios_1.default.defaults.headers.common['Authorization'];
    },
    setLoading: (loading) => set({ isLoading: loading }),
}), {
    name: 'auth-storage',
    partialize: (state) => ({ user: state.user, token: state.token }),
}));
const useAuth = () => {
    const auth = useAuthStore();
    (0, react_1.useEffect)(() => {
        if (auth.token) {
            axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
            auth.setLoading(false);
        }
        else {
            auth.setLoading(false);
        }
    }, []);
    return auth;
};
exports.useAuth = useAuth;
//# sourceMappingURL=useAuth.js.map