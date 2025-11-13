import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/core/store/store.ts';
import { useLoginMutation } from '@/features/auth/services/authApi.ts';
import { setCredentials } from '@/features/auth/slices/authSlice.ts';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Oval } from 'react-loader-spinner'; // 🌀 import spinner
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: 'anhkhoadevtool21@gmail.com',
    password: '12341234',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let valid = true;
    if (!formData.email) {
      newErrors.email = 'Please enter email';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Please enter password';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const user = response.data;
      const accessToken = user.accessToken;
      const refreshToken = user.refreshToken;

      if (user.role === 'ADMIN') {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(user));
        storage.setItem('accessToken', accessToken);
        storage.setItem('refreshToken', refreshToken);

        dispatch(setCredentials({ user, accessToken, refreshToken }));

        toast.success(`Welcome back, ${user.username}!`);
        navigate('/dashboard');
      } else {
        toast.error('You do not have permission to access this resource.');
      }
    } catch (err: any) {
      const msg =
        err?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 h-12"
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-10 h-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <Label htmlFor="rememberMe" className="text-sm">
            Remember me
          </Label>
        </div>
        {/* <Link to="/forgot-password" className="text-sm text-blue-600">
          Forgot password?
        </Link> */}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Oval
              height={20}
              width={20}
              color="#ffffff"
              secondaryColor="#e0e0e0"
              strokeWidth={5}
              strokeWidthSecondary={5}
              visible={true}
              ariaLabel="loading"
            />
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign in'
        )}
      </Button>

      {/* Switch to register */}
      <div className="text-center pt-4">
        <span className="text-sm text-blue-700 mr-2">
          Don't have an account?
        </span>
        <Link
          to="/register"
          className="font-semibold text-black hover:text-blue-600"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
