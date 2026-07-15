import React, { useState } from 'react';
import { X, Mail, Lock, ShieldCheck, Loader2 } from 'lucide-react';
import './LoginModal.css';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication lag
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        name: 'Ezio Auditore',
        email: email || 'ezio@wanderlust.com',
        avatar: 'EA',
        tier: 'Elite Explorer'
      });
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal glass-panel fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close login">
          <X size={20} />
        </button>

        <div className="login-header text-center">
          <div className="login-logo">WANDERLUST</div>
          <h3>EXCLUSIVE PORTAL ACCESS</h3>
          <p>Login is required to reserve luxury travel itineraries.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="form-input-container">
              <Mail size={16} className="form-input-icon" />
              <input 
                type="email" 
                placeholder="ezio@wanderlust.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="form-input-container">
              <Lock size={16} className="form-input-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="login-options-row">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-pass-link" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
          </div>

          <button type="submit" className="btn-primary w-full login-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={16} className="spinner-icon" />
                <span>Authorizing Identity...</span>
              </>
            ) : (
              <span>Login to Account</span>
            )}
          </button>
        </form>

        {/* Alternative logins */}
        <div className="divider-or">
          <span className="divider-line" />
          <span className="or-text">OR CONTINUE WITH</span>
          <span className="divider-line" />
        </div>

        <div className="alt-logins-grid">
          <button className="alt-login-btn glass-panel" onClick={handleSubmit}>
            <span>Google</span>
          </button>
          <button className="alt-login-btn glass-panel" onClick={handleSubmit}>
            <span>Apple</span>
          </button>
        </div>

        <div className="security-notice">
          <ShieldCheck size={14} className="security-icon" />
          <span>Encrypted simulated session. Use any credentials to sign in.</span>
        </div>

      </div>
    </div>
  );
}
