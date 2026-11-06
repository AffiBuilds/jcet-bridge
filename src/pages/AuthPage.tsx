import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialMode = (location.state as any)?.mode === 'register' ? 'register' : 'login';

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  // Student Login state
  const [usn, setUsn] = useState('2JC22CS045');
  const [password, setPassword] = useState('jcet2026');

  // Student Register states
  const [regName, setRegName] = useState('');
  const [regUsn, setRegUsn] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDept, setRegDept] = useState('Computer Science & Engineering');
  const [regSem, setRegSem] = useState('6');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Forgot password modal
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotUsn, setForgotUsn] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Status feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Quick fill demo student accounts
  const handleStudentSelect = (selectedUsn: string, pass: string) => {
    setUsn(selectedUsn);
    setPassword(pass);
    setErrorMsg('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!usn.trim()) {
      setErrorMsg('Please enter your Student University Seat Number (USN).');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim() || !regUsn.trim() || !regEmail.trim()) {
      setErrorMsg('Please fill in all mandatory institutional fields.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegSuccess(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FB] text-[#252532] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#E8DDF5] selection:text-[#252532] relative overflow-hidden">
      
      {/* Subtle Pastel Ambient Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#E8DDF5]/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C8B4E8]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Bar with Back Link */}
      <header className="max-w-[1100px] w-full mx-auto flex items-center justify-between py-2 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-[#7C51B0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="text-xs text-neutral-500 font-medium hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Student-to-Student Academic Portal • VTU 2022 Scheme</span>
        </div>
      </header>

      {/* Main Split-Screen Modal Container (Light Pastel Lavender & White Theme) */}
      <main className="flex-1 flex items-center justify-center my-4 relative z-10">
        <div className="w-full max-w-[1080px] bg-white rounded-[32px] overflow-hidden shadow-xl border border-[#E8DDF5] grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* LEFT COLUMN: Login Form (Clean White & Soft Lavender) */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
            
            {/* Top Branding Header */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/jcet-official-logo.png"
                  alt="JCET Logo"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-[#252532] font-['Playfair_Display',Georgia,serif]">
                      JCET<span className="text-[#7C51B0]">-Bridge</span>
                    </span>
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#E8DDF5] text-[#5D3A8E] font-bold border border-[#C8B4E8]">
                      Student Portal
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    Jain College of Engineering and Technology
                  </p>
                </div>
              </div>

              {/* Title & Subtitle matching Dribbble reference */}
              <div className="mb-7">
                <h1 className="text-3xl font-extrabold text-[#252532] tracking-tight">
                  {mode === 'login' ? 'Login' : 'Student Activation'}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-normal">
                  {mode === 'login'
                    ? 'Enter your student account details'
                    : 'Activate your student profile to connect with peers'}
                </p>
              </div>

              {/* Error banner if any */}
              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. LOGIN MODE FORM */}
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  
                  {/* Student USN Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-700">
                      Student USN (University Seat Number)
                    </label>
                    <input
                      type="text"
                      required
                      value={usn}
                      onChange={(e) => setUsn(e.target.value.toUpperCase())}
                      placeholder="e.g. 2JC22CS045"
                      className="w-full px-0 py-2 bg-transparent border-b-2 border-[#E8DDF5] text-sm text-[#252532] font-mono placeholder:font-sans placeholder:text-neutral-400 focus:outline-none focus:border-[#7C51B0] transition-colors"
                    />
                  </div>

                  {/* Password Field with Eye Toggle */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-neutral-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-0 pr-10 py-2 bg-transparent border-b-2 border-[#E8DDF5] text-sm text-[#252532] placeholder:text-neutral-400 focus:outline-none focus:border-[#7C51B0] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#252532] p-1"
                        aria-label="Toggle password view"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password link */}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotUsn(usn);
                        setForgotModalOpen(true);
                      }}
                      className="text-xs font-semibold text-[#7C51B0] hover:underline transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Pastel Lavender Login Button matching Dribbble shot */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] text-sm font-bold transition-all shadow-xs active:scale-98 flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-[#252532] border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </button>

                  {/* One-Click Sample Student Credentials */}
                  <div className="pt-2">
                    <div className="text-[10px] text-neutral-500 mb-1.5 font-medium">
                      1-Click Student Demo Accounts:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleStudentSelect('2JC22CS045', 'jcet2026')}
                        className={`text-[11px] py-1.5 px-3 rounded-lg text-left truncate border transition-colors ${
                          usn === '2JC22CS045'
                            ? 'bg-[#E8DDF5] border-[#C8B4E8] text-[#4A2E73] font-bold'
                            : 'bg-[#F8F7FB] border-[#E8DDF5] text-neutral-600 hover:text-[#252532] hover:bg-[#E8DDF5]/40'
                        }`}
                      >
                        ⚡ Rohan (2JC22CS045)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleStudentSelect('2JC22CS012', 'jcet2026')}
                        className={`text-[11px] py-1.5 px-3 rounded-lg text-left truncate border transition-colors ${
                          usn === '2JC22CS012'
                            ? 'bg-[#E8DDF5] border-[#C8B4E8] text-[#4A2E73] font-bold'
                            : 'bg-[#F8F7FB] border-[#E8DDF5] text-neutral-600 hover:text-[#252532] hover:bg-[#E8DDF5]/40'
                        }`}
                      >
                        ⚡ Ananya (2JC22CS012)
                      </button>
                    </div>
                  </div>

                </form>
              ) : (
                /* 2. REGISTRATION / ACTIVATION FORM */
                <div>
                  {regSuccess ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#E8DDF5] text-[#7C51B0] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="font-bold text-[#252532] text-base">Student Account Activated!</h4>
                      <p className="text-xs text-neutral-500">
                        Institutional details matched with JCET VTU records.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-5 py-2.5 rounded-xl bg-[#C8B4E8] text-[#252532] text-xs font-bold"
                      >
                        Enter Student Portal →
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. Rohan M. Verma"
                          className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs sm:text-sm text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            Student USN
                          </label>
                          <input
                            type="text"
                            required
                            value={regUsn}
                            onChange={(e) => setRegUsn(e.target.value.toUpperCase())}
                            placeholder="2JC22CS045"
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs sm:text-sm text-[#252532] font-mono focus:outline-none focus:border-[#7C51B0]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            College Email
                          </label>
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="rohan@jcet.ac.in"
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs sm:text-sm text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            Department
                          </label>
                          <select
                            value={regDept}
                            onChange={(e) => setRegDept(e.target.value)}
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                          >
                            <option value="Computer Science & Engineering">CSE</option>
                            <option value="Information Science & Engineering">ISE</option>
                            <option value="Electronics & Communication Engineering">ECE</option>
                            <option value="AI & Data Science">AI&DS</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            Semester
                          </label>
                          <select
                            value={regSem}
                            onChange={(e) => setRegSem(e.target.value)}
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                          >
                            <option value="1">1st Sem</option>
                            <option value="2">2nd Sem</option>
                            <option value="3">3rd Sem</option>
                            <option value="4">4th Sem</option>
                            <option value="5">5th Sem</option>
                            <option value="6">6th Sem</option>
                            <option value="7">7th Sem</option>
                            <option value="8">8th Sem</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            Password
                          </label>
                          <input
                            type="password"
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs sm:text-sm text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            required
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="••••••"
                            className="w-full px-0 py-1.5 bg-transparent border-b-2 border-[#E8DDF5] text-xs sm:text-sm text-[#252532] focus:outline-none focus:border-[#7C51B0]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 py-3 rounded-xl bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] text-xs sm:text-sm font-bold transition-all shadow-xs"
                      >
                        {isLoading ? 'Activating...' : 'Activate My Student Account'}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Row: Don't have an account? Sign up (Exact Dribbble match in Light Pastel) */}
            <div className="pt-6 border-t border-[#E8DDF5] flex items-center justify-between text-xs text-neutral-500">
              <span>
                {mode === 'login' ? "Don't have an account?" : 'Already activated?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setErrorMsg('');
                }}
                className="px-4 py-1.5 rounded-xl bg-[#F8F7FB] hover:bg-[#E8DDF5] text-[#252532] text-xs font-semibold border border-[#E8DDF5] transition-all cursor-pointer"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: Soft Pastel Lavender Card with Illustration & Feature Highlights */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#C8B4E8] via-[#D5C2F0] to-[#E8DDF5] p-8 sm:p-12 lg:p-12 flex flex-col justify-between relative overflow-hidden text-[#252532] rounded-[28px] m-2.5 shadow-xs border border-white/60">
            
            {/* Subtle background circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-white/30 rounded-full blur-xl pointer-events-none" />

            {/* Top Text: Welcome to student portal (Exact typography from Dribbble shot in clean deep lavender) */}
            <div className="relative z-10 space-y-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.15] text-[#252532]">
                Welcome to<br />student portal
              </h2>
              <p className="text-xs sm:text-sm text-[#4A2E73] font-medium">
                Login to access your student workspace & peer network
              </p>

              {/* Three Feature Highlights requested by user */}
              <div className="pt-4 space-y-2 max-w-sm">
                <div className="flex items-center gap-2 text-xs font-semibold bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/60 text-[#252532] shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-[#7C51B0] stroke-[2.5]" />
                  <span>1. Verified Academic Repository</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/60 text-[#252532] shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-[#7C51B0] stroke-[2.5]" />
                  <span>2. JCET AI Academic Tutor</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/60 text-[#252532] shadow-2xs">
                  <Check className="w-3.5 h-3.5 text-[#7C51B0] stroke-[2.5]" />
                  <span>3. Official Academic Records</span>
                </div>
              </div>
            </div>

            {/* Student Illustration Graphic from Reference Screenshot */}
            <div className="relative z-10 mt-6 flex justify-end items-end">
              <img
                src="/login-illustration.png"
                alt="Student Portal Illustration"
                className="w-full max-w-[420px] object-contain drop-shadow-md"
              />
            </div>

            {/* Footer Tagline */}
            <div className="relative z-10 pt-4 border-t border-[#7C51B0]/20 flex flex-wrap items-center justify-between text-[11px] text-[#4A2E73] font-medium">
              <span>Jain College of Engineering and Technology</span>
              <span className="font-bold">One Portal. Endless Possibilities.</span>
            </div>

          </div>

        </div>
      </main>

      {/* Forgot Password Modal (Light Pastel Lavender & White) */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false);
          setForgotSubmitted(false);
        }}
        title="Reset Student Password"
        subtitle="Verification via registered student VTU institutional email"
      >
        {forgotSubmitted ? (
          <div className="text-center py-5 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E8DDF5] text-[#7C51B0] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-[#252532] text-base">OTP Instructions Sent!</h4>
            <p className="text-xs text-neutral-600">
              A temporary reset PIN has been dispatched to the institutional inbox for Student USN{' '}
              <strong className="font-mono text-[#252532]">{forgotUsn || '2JC22CS045'}</strong>.
            </p>
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setForgotSubmitted(false);
              }}
              className="mt-3 px-5 py-2 rounded-xl bg-[#C8B4E8] text-[#252532] text-xs font-bold"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-[#252532]">
            <p className="text-neutral-600 leading-relaxed">
              Enter your student USN to receive a secure institutional reset link.
            </p>
            <div>
              <label className="block font-bold uppercase text-neutral-700 mb-1">
                Student USN
              </label>
              <input
                type="text"
                value={forgotUsn}
                onChange={(e) => setForgotUsn(e.target.value.toUpperCase())}
                placeholder="e.g. 2JC22CS045"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F7FB] border border-[#E8DDF5] text-sm text-[#252532] font-mono focus:outline-none focus:ring-2 focus:ring-[#C8B4E8]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setForgotSubmitted(true)}
                className="px-5 py-2 rounded-xl bg-[#C8B4E8] hover:bg-[#B89FE0] text-[#252532] font-bold"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Footer Minimal */}
      <footer className="text-center text-[11px] text-neutral-500 py-2 relative z-10">
        JCET-Bridge • Jain College of Engineering & Technology, Hubballi
      </footer>
    </div>
  );
};
