import React, { useState } from 'react';
import { X, LogIn, Lock, User as UserIcon, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AppStateData, UserAccount } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AppStateData;
  onLoginSuccess: (user: UserAccount) => void;
  onUpdateData?: (newData: AppStateData) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  data,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Harap masukkan username dan password.');
      return;
    }

    const trimmedUser = username.trim().toLowerCase();
    const matched = data.users.find(
      (u) => u.username.toLowerCase() === trimmedUser && (u.password === password || (!u.password && password === 'admin'))
    );

    if (matched) {
      setSuccessMsg(`Selamat datang, ${matched.name}!`);
      setTimeout(() => {
        onLoginSuccess(matched);
        onClose();
        setUsername('');
        setPassword('');
        setSuccessMsg('');
      }, 500);
    } else {
      setErrorMsg('Username atau Password yang Anda masukkan tidak sesuai!');
    }
  };

  return (
    <div 
      id="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        id="login-modal-card"
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-emerald-800/40 overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Logo */}
        <div className="bg-gradient-to-br from-[#0B2545] via-[#091D3E] to-[#065F46] p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10" />

          {/* Dynamic Madrasah Logo */}
          <div className="relative inline-block mx-auto mb-3">
            <div className="p-2.5 bg-white rounded-2xl shadow-xl border-2 border-emerald-400">
              <img
                src={data.settings.logoUrl}
                alt="Logo Madrasah"
                className="w-14 h-14 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 rounded-full text-white shadow">
              <Shield className="w-3 h-3" />
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            Portal Masuk Sistem
          </h3>
          <p className="text-xs text-emerald-200 mt-1 font-medium">
            {data.profile.nama}
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username / Akun
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  id="login-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs outline-hidden transition-all bg-slate-50/50"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-xs outline-hidden transition-all bg-slate-50/50"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B2545] hover:bg-[#064E3B] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <LogIn className="w-4 h-4 text-emerald-400" />
              <span>Masuk ke Sistem</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
