import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, LogIn, Eye, EyeOff, Loader2, Sparkles, Brain, Zap, Shield } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-6xl flex bg-white/80 backdrop-blur-xl rounded-4xl shadow-strong overflow-hidden border border-white/20 relative">
        {/* Left Side - Enhanced Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 items-center justify-center p-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>
          
          <div className="text-center relative z-10">
            <div className="w-40 h-40 bg-white/20 rounded-4xl flex items-center justify-center mb-12 mx-auto backdrop-blur-sm border border-white/30 shadow-2xl animate-float">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl">
                <Brain className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Unlock Your
              <span className="block bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                Potential
              </span>
            </h2>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Experience the future of education with our AI-powered learning platform
            </p>
            <div className="flex items-center justify-center gap-8 text-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="font-medium">Smart Learning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="font-medium">Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="w-full lg:w-1/2 p-12 lg:p-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="text-white font-bold w-6 h-6" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">VIGNIQ</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mb-3">
                {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
              </h1>
              <p className="text-slate-600 text-lg">
                {showForgotPassword
                  ? 'Enter your details to reset your password.'
                  : 'Sign in to continue your AI learning journey.'
                }
              </p>
            </div>

            {!showForgotPassword ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    {error}
                  </div>
                )}

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    Username
                  </label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="input-modern pl-14"
                      title="Username must contain only letters and numbers"
                      minLength={3}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-modern">
                  <label className="form-label-modern">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="input-modern pl-14 pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all duration-200"
                  >
                    Forgot your password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-modern w-full flex items-center justify-center gap-3 text-lg"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LogIn className="w-5 h-5" />
                  )}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-8">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-6 py-4 rounded-2xl flex items-center gap-3">
                    <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                    {error}
                  </div>
                )}

                {forgotStep === 1 ? (
                  <div className="form-group-modern">
                    <label className="form-label-modern">
                      Username
                    </label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                      <input
                        type="text"
                        value={forgotUsername}
                        onChange={(e) => setForgotUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="input-modern pl-14"
                        title="Username must contain only letters and numbers"
                        minLength={3}
                        required
                      />
                    </div>
                  </div>
                ) : forgotStep === 2 ? (
                  <>
                    <div className="form-group-modern">
                      <label className="form-label-modern">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="text"
                          value={forgotUsername}
                          disabled
                          className="input-modern pl-14 bg-slate-50 text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="form-group-modern">
                      <label className="form-label-modern">
                        Verification Code
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <input
                          type="text"
                          value={validationCode}
                          onChange={(e) => setValidationCode(e.target.value)}
                          placeholder="Enter verification code"
                          className="input-modern pl-14"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group-modern">
                      <label className="form-label-modern">
                        New Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="input-modern pl-14 pr-14"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="form-group-modern">
                      <label className="form-label-modern">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-300" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                          className="input-modern pl-14 pr-14"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-300"
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
                    className="btn-modern flex-1 flex items-center justify-center gap-2"
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
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm">
                Powered by AI • Secured by Design • Built for Education
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;