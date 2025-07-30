import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, LogIn, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from '../components/ui/sonner';
import { sentVerficationCode, verifyUsernameWithCode, resetPassword as resetPasswordApi } from '../services/passwordHandler';
import { useSnackbar } from "../components/snackbar/SnackbarContext";

const Login: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotUsername, setForgotUsername] = useState('');
  const [validationCode, setValidationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();



  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sentCode = async (userName: string) => {
    const response = await sentVerficationCode(userName);
    return response;
  }

  const verifyCode = async (user: any) => {
    const response = await verifyUsernameWithCode(user);
    return response;
  }

  const resetPassword = async (user: any) => {
    const response = await resetPasswordApi(user);
    return response;
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setError('');

    try {
      if (forgotStep === 1) {

        // Verify username exists and get email
        let userExists = await sentCode(forgotUsername);

        if (userExists) {
          setForgotStep(2);
          setError('');
          showSnackbar({
            title: "Success",
            description: userExists.message ? `📬 ${userExists.message} ✅` : `📬 A verification code has been sent to respective Email. Please check. ✅`,
            status: "success"
          });
        } else {
          setError('Username not found in our system.');
          showSnackbar({
            title: "⛔ Error",
            description: "Username not found in our system.",
            status: "error"
          });
        }
      } else if (forgotStep === 2) {
        // Validate code
        const user = {
          user_name: forgotUsername,
          otp: validationCode
        }
        const response = await verifyCode(user);

        if (response && response.access_token) {
          showSnackbar({
            title: "Success",
            description: `📬 A verification Successful.Please fill the details to reset your Password ✅`,
            status: "success"
          });
          localStorage.setItem('access_token', response.access_token);
          setForgotStep(3);
          setError('');
        } else {
          setError('Invalid validation code. Please enter the correct code.');
          showSnackbar({
            title: "⛔ Error",
            description: "Invalid validation code. Please enter the correct code.",
            status: "error"
          });
        }
      } else {
        // Update password
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match.');
          setForgotLoading(false);
          return;
        }

        if (newPassword.length < 8) {
          setError('Password must be at least 8 characters long.');
          setForgotLoading(false);
          return;
        }

        const response = await resetPassword({ "new_password": newPassword });

        if (response && response.message) {
          setShowForgotPassword(false);
          setForgotStep(1);
          setForgotUsername('');
          setValidationCode('');
          setNewPassword('');
          setConfirmPassword('');
          setError('');
          showSnackbar({
            title: "Success",
            description: `✅ Password updated successfully! You can now log in with your new password.`,
            status: "success"
          });
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Left Side - Hero Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-5 w-12 h-12 bg-white rounded-full"></div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 mx-auto">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-blue-600 bg-clip-text text-transparent">V</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to VIGNIQ</h2>
            <p className="text-blue-100 text-lg leading-relaxed">Your comprehensive school management platform powered by modern technology</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-2xl font-bold text-slate-800">VIGNIQ</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">
                {showForgotPassword ? 'Reset Your Password' : 'Sign In'}
              </h1>
              <p className="text-slate-600">
                {showForgotPassword
                  ? 'Enter your details to reset your password securely.'
                  : 'Welcome back! Please sign in to your account.'
                }
              </p>
            </div>

            {!showForgotPassword ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs">!</span>
                    </div>
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                      title="Username must contain only letters and numbers"
                      minLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {forgotStep === 1 ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={forgotUsername}
                        onChange={(e) => setForgotUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        title="Username must contain only letters and numbers"
                        minLength={3}
                        required
                      />
                    </div>
                    {/* <p className="text-xs text-gray-500 mt-1">Minimum 3 characters, letters and numbers only</p> */}
                  </div>
                ) : forgotStep === 2 ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={forgotUsername}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validation Code
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={validationCode}
                          onChange={(e) => setValidationCode(e.target.value)}
                          placeholder="Enter validation code"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                      {/* <p className="text-xs text-gray-500 mt-1">Enter 123 to proceed</p> */}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {forgotLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {forgotLoading
                      ? 'Processing...'
                      : forgotStep === 1 ? 'Verify Username' : forgotStep === 2 ? 'Verify Code' : 'Reset Password'
                    }
                  </button>
                  <button
                    type="button"
                    disabled={forgotLoading}
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotStep(1);
                      setForgotUsername('');
                      setValidationCode('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setError('');
                      setForgotLoading(false);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Demo Credentials */}
            {/* {!showForgotPassword && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Super Admin:</strong> superadmin / superadmin</div>
                  <div><strong>Admin:</strong> admin1 / admin123</div>
                  <div><strong>Teacher:</strong> teacher1 / teacher123</div>
                  <div><strong>Student:</strong> student1 / student123</div>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
