'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

const ZeplinLogo = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="112" rx="52" ry="5" fill="#2A7A4B" opacity="0.1"/>
    <ellipse cx="110" cy="62" rx="64" ry="20" fill="#1F5E39"/>
    <ellipse cx="110" cy="55" rx="64" ry="20" fill="#2A7A4B"/>
    <ellipse cx="90" cy="47" rx="35" ry="10" fill="#fff" opacity="0.08"/>
    <path d="M46 55 L46 62 Q78 80 110 80 Q142 80 174 62 L174 55" fill="#1a5c38" opacity="0.35"/>
    <rect x="92" y="82" width="36" height="10" rx="5" fill="#2A7A4B"/>
    <ellipse cx="110" cy="82" rx="18" ry="4" fill="#3d9e65" opacity="0.3"/>
    <path d="M100 82 Q96 76 94 70" stroke="#1F5E39" strokeWidth="0.8" fill="none"/>
    <path d="M120 82 Q124 76 126 70" stroke="#1F5E39" strokeWidth="0.8" fill="none"/>
    <path d="M174 50 L194 40 L194 58 L174 58 Z" fill="#2A7A4B"/>
    <path d="M174 50 L194 40 L194 58 L174 58 Z" fill="#fff" opacity="0.06"/>
    <circle cx="194" cy="49" r="3" fill="#1F5E39"/>
    <line x1="194" y1="40" x2="194" y2="58" stroke="#2A7A4B" strokeWidth="2"/>
    <circle cx="30" cy="50" r="2.5" fill="#2A7A4B" opacity="0.5"/>
    <circle cx="22" cy="50" r="1.8" fill="#2A7A4B" opacity="0.35"/>
    <circle cx="15" cy="50" r="1.2" fill="#2A7A4B" opacity="0.2"/>
    <ellipse cx="110" cy="55" rx="64" ry="20" fill="none" stroke="#1F5E39" strokeWidth="0.5" opacity="0.5"/>
  </svg>
);

export default function GirisSayfasi() {
  const [mode, setMode] = useState<'giris' | 'kayit'>('giris');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGiris = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('E-posta veya sifre hatali.');
    } else {
      window.location.href = '/';
    }
  };

  const handleKayit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setLoading(false);
      if (error.message.includes('already registered')) {
        setError('Bu e-posta adresi zaten kayitli.');
      } else {
        setError('Kayit olurken bir hata olustu: ' + error.message);
      }
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
      });
      if (profileError) console.error(profileError);
    }

    setLoading(false);
    setSuccess('Kayit basarili! E-postani kontrol et ve hesabini onayla.');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#F4F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <style>{`
        @keyframes zpFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .zp-input { color: #141A14 !important; background: #fff !important; -webkit-text-fill-color: #141A14 !important; }
        .zp-input::placeholder { color: #9FAF9F !important; }
      `}</style>

      <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 24, padding: 40, border: '1px solid #DDE8DD', boxShadow: '0 4px 24px rgba(42,122,75,0.08)' }}>

        {/* Logo */}
        <a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', marginBottom: 28 }}>
          <div style={{ animation: 'zpFloat 3s ease-in-out infinite', marginBottom: 8 }}>
            <ZeplinLogo size={56} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#141A14' }}>Zep<span style={{ color: '#2A7A4B' }}>lin</span></div>
        </a>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#F4F7F4', padding: 5, borderRadius: 14 }}>
          <button
            onClick={() => { setMode('giris'); setError(''); setSuccess(''); }}
            style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', background: mode === 'giris' ? '#2A7A4B' : 'transparent', color: mode === 'giris' ? '#fff' : '#5A6E5A', transition: 'all 0.2s' }}>
            Giris Yap
          </button>
          <button
            onClick={() => { setMode('kayit'); setError(''); setSuccess(''); }}
            style={{ flex: 1, padding: '10px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', background: mode === 'kayit' ? '#2A7A4B' : 'transparent', color: mode === 'kayit' ? '#fff' : '#5A6E5A', transition: 'all 0.2s' }}>
            Uye Ol
          </button>
        </div>

        {success ? (
          <div style={{ background: '#E8F4EE', borderRadius: 14, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 14, color: '#1F6B3E', fontWeight: 600 }}>{success}</div>
          </div>
        ) : (
          <form onSubmit={mode === 'giris' ? handleGiris : handleKayit}>
            {mode === 'kayit' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#4A5E4A', marginBottom: 6, display: 'block' }}>Ad Soyad</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Adin Soyadin"
                  className="zp-input" style={{ width: '100%', border: '1.5px solid #C8D9C8', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
                />
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A5E4A', marginBottom: 6, display: 'block' }}>E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ornek@email.com"
                className="zp-input" style={{ width: '100%', border: '1.5px solid #C8D9C8', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#4A5E4A', marginBottom: 6, display: 'block' }}>Sifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="En az 6 karakter"
                className="zp-input" style={{ width: '100%', border: '1.5px solid #C8D9C8', borderRadius: 12, padding: '12px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }}
              />
            </div>

            {error && (
              <div style={{ background: '#FEE2E2', color: '#B91C1C', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#2A7A4B', color: '#fff', border: 'none', padding: '13px', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Yukleniyor...' : mode === 'giris' ? 'Giris Yap' : 'Uye Ol'}
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ fontSize: 13, color: '#8A9E8A', textDecoration: 'none' }}>← Ana sayfaya don</a>
        </div>
      </div>
    </div>
  );
}
