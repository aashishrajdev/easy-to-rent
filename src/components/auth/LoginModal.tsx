// src/components/auth/LoginModal.tsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'login' 
}) => {
  const { login: authLogin, register: authRegister } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    if (error) setError(null);
  };

  // Handle register form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
    if (registerErrors[e.target.name]) {
      setRegisterErrors({
        ...registerErrors,
        [e.target.name]: ''
      });
    }
    if (error) setError(null);
  };

  // Validate register form
  const validateRegister = (): boolean => {
    const errors: Record<string, string> = {};

    if (!registerData.name.trim()) {
      errors.name = 'Name is required';
    } else if (registerData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!registerData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (registerData.phone && !/^\d{10}$/.test(registerData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number must be 10 digits';
    }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // CORRECTED LOGIN FUNCTION - Using the exact endpoint from your backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login with:', loginData.email);
      
      // Your backend is running on Render
      const API_URL = 'https://eassy-to-rent-backend.onrender.com';
      
      // Based on your backend code, the correct endpoint is /api/auth/login
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      // Check if login was successful based on your backend response structure
      if (response.ok && data.success) {
        // Extract user data from the response
        // Based on your database, the user data should be in data.data or data.user
        const userData = data.data || data.user;
        
        if (userData && data.token) {
          // Store token and user data
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone
          }));
          
          // Call auth context login
          if (authLogin) {
            await authLogin(data.token, userData);
          }
          
          toast.success('Login successful!', {
            description: `Welcome back, ${userData.name || 'User'}!`,
          });
          
          onClose();
          setLoginData({ email: '', password: '' });
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        // Handle error response
        throw new Error(data.message || data.error || 'Login failed');
      }
      
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
      toast.error('Login failed', {
        description: error.message || 'Please check your email and password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // REGISTER FUNCTION
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegister()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const API_URL = 'https://eassy-to-rent-backend.onrender.com';
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone || undefined
        }),
      });

      const data = await response.json();
      console.log('Register response:', data);

      if (response.ok && data.success) {
        const userData = data.data || data.user;
        
        if (userData && data.token) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: userData._id || userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            phone: userData.phone
          }));
          
          if (authRegister) {
            await authRegister(data.token, userData);
          }
          
          toast.success('Registration successful!', {
            description: 'Your account has been created successfully.',
          });
          
          onClose();
          setRegisterData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: ''
          });
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        throw new Error(data.message || data.error || 'Registration failed');
      }

    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
      toast.error('Registration failed', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fill with existing user from your database
  const fillDemoCredentials = () => {
    setLoginData({
      email: 'rsinghranjeet7428@gmail.com',
      password: 'password123' // You'll need to know the actual password
    });
  };

  // Fill with test credentials
  const fillTestCredentials = () => {
    setLoginData({
      email: 'ranjeet@gmail.com',
      password: 'password123' // You'll need to know the actual password
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Welcome to Easy2Rent
          </DialogTitle>
        </DialogHeader>

        {/* Demo Users Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mb-4">
          <div className="flex items-center gap-2 text-blue-700 mb-2">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Test Accounts</span>
          </div>
          <p className="text-xs text-blue-600 mb-3">
            Use these existing accounts from database:
          </p>
          <div className="space-y-2">
            <Button 
              type="button"
              size="sm"
              variant="outline"
              onClick={fillDemoCredentials}
              className="w-full text-xs border-blue-200 text-blue-700 hover:bg-blue-100 justify-start"
            >
              <User className="h-3 w-3 mr-2" />
              rsinghranjeet7428@gmail.com
            </Button>
            <Button 
              type="button"
              size="sm"
              variant="outline"
              onClick={fillTestCredentials}
              className="w-full text-xs border-blue-200 text-blue-700 hover:bg-blue-100 justify-start"
            >
              <User className="h-3 w-3 mr-2" />
              ranjeet@gmail.com
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: You need the correct password for these accounts
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && activeTab === 'login' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-primary hover:underline"
                >
                  Don't have an account? Register
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-name"
                    name="name"
                    placeholder="Enter your full name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
                {registerErrors.name && (
                  <p className="text-xs text-red-500">{registerErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-xs text-red-500">{registerErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-phone">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                {registerErrors.phone && (
                  <p className="text-xs text-red-500">{registerErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password (min. 6 characters)"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {registerErrors.password && (
                  <p className="text-xs text-red-500">{registerErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="register-confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="text-xs text-red-500">{registerErrors.confirmPassword}</p>
                )}
              </div>

              {error && activeTab === 'register' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Register'
                )}
              </Button>

              <div className="text-center text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-primary hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-center text-gray-400 mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;