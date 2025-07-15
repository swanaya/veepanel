"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const useAuth_1 = require("../hooks/useAuth");
const lucide_react_1 = require("lucide-react");
const react_hot_toast_1 = require("react-hot-toast");
const loginSchema = zod_2.z.object({
    email: zod_2.z.string().email('Invalid email address'),
    password: zod_2.z.string().min(6, 'Password must be at least 6 characters'),
});
function Login() {
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const { login } = (0, useAuth_1.useAuth)();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(loginSchema),
    });
    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            react_hot_toast_1.default.success('Login successful!');
        }
        catch (error) {
            react_hot_toast_1.default.error(error.response?.data?.message || 'Login failed');
        }
    };
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <lucide_react_1.Lock className="h-6 w-6 text-primary-600"/>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Vee Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Web Hosting Control Panel
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide_react_1.Mail className="h-5 w-5 text-gray-400"/>
                </div>
                <input {...register('email')} type="email" className="input pl-10" placeholder="Enter your email"/>
              </div>
              {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>)}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide_react_1.Lock className="h-5 w-5 text-gray-400"/>
                </div>
                <input {...register('password')} type={showPassword ? 'text' : 'password'} className="input pl-10 pr-10" placeholder="Enter your password"/>
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<lucide_react_1.EyeOff className="h-5 w-5 text-gray-400"/>) : (<lucide_react_1.Eye className="h-5 w-5 text-gray-400"/>)}
                </button>
              </div>
              {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password.message}</p>)}
            </div>
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Default credentials: admin@example.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>);
}
//# sourceMappingURL=Login.js.map