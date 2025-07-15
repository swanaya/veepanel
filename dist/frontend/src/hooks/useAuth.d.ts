interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
    permissions: string[];
}
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    setLoading: (loading: boolean) => void;
}
export declare const useAuth: () => AuthState;
export {};
