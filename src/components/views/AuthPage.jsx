import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../ui/GlassCard';
import { Shield, Lock, Mail, User, Key, CheckCircle2, ArrowRight } from 'lucide-react';

export function AuthPage() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { setActiveTab } = useApp();
  
  const [email, setEmail] = useState('alex.vance@reviewshield.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('ADMIN');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    setActiveTab('admin-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      
      {isAuthenticated && user ? (
        <GlassCard glowColor="purple" className="p-8 max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-neon-blue to-neon-purple shadow-neon-blue">
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">{user.name}</h2>
            <p className="text-xs text-slate-400 font-mono mt-1">{user.email}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold uppercase tracking-wider">
              Role: {user.role}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-dark-900 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">User Token</span>
              <span className="font-mono text-slate-200">{user.token.slice(0, 14)}...</span>
            </div>
            <div>
              <span className="text-slate-400 block">Trust Reputation</span>
              <span className="font-mono text-emerald-400 font-bold">{user.trustReputation}%</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className="flex-1 py-3 rounded-xl bg-neon-glow font-bold text-white text-xs shadow-neon-blue hover:opacity-90 transition"
            >
              Go to Dashboard
            </button>
            <button
              onClick={logout}
              className="py-3 px-6 rounded-xl bg-dark-700 hover:bg-rose-500/20 hover:text-rose-400 text-xs font-bold text-slate-300 transition"
            >
              Sign Out
            </button>
          </div>
        </GlassCard>
      ) : (
        <GlassCard glowColor="blue" className="max-w-md mx-auto p-8 space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-neon-blue/10 border border-neon-blue/30 text-neon-blue flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-white">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="text-xs text-slate-400 mt-1">ReviewShield AI JWT Authentication Standard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-neon-blue"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-neon-blue"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Account Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-dark-900 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-neon-blue"
              >
                <option value="CUSTOMER">Customer / Reviewer</option>
                <option value="SELLER">E-Commerce Merchant / Seller</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple font-bold text-white text-xs shadow-neon-blue hover:opacity-95 transition"
            >
              {isSignUp ? 'Register Security Account' : 'Authenticate Session (JWT)'}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-800">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-neon-blue font-semibold hover:underline"
            >
              {isSignUp ? 'Already registered? Sign In' : 'Need an enterprise account? Sign Up'}
            </button>
          </div>
        </GlassCard>
      )}

    </div>
  );
}
