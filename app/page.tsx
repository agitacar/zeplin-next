/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';

const ZeplinLogo = ({ size = 28, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" className={className}>
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
    <rect x="128" y="32" width="52" height="18" rx="9" fill="#2A7A4B"/>
    <text x="154" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">EN UCUZU</text>
    <ellipse cx="110" cy="55" rx="64" ry="20" fill="none" stroke="#1F5E39" strokeWidth="0.5" opacity="0.5"/>
  </svg>
);

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [logoAnim, setLogoAnim] = useState('enter');
  const [searching, setSearching] = useState(false);

  const slides = [
    { bg: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', tag: 'Teknoloji', title: 'En iyi fiyat,\nbir tik uzaginda.', sub: 'Telefon, laptop, kulaklik - yuzlerce magazayi aninda karsilastir.', btn: 'Telefon ara' },
    { bg: 'linear-gradient(135deg, #1a6b3c, #2d9e6b, #1a6b3c)', tag: 'Seyahat', title: 'Ucusunu karsilastir,\nen ucuzunu bul.', sub: 'Ucak bileti, otel, arac kiralama - tum seyahat platformlarini tek yerde gor.', btn: 'Seyahate bak' },
    { bg: 'linear-gradient(135deg, #7b2d00, #c0392b, #922b21)', tag: 'Gunun Firsati', title: 'Fiyat dustu,\nalarm caldi!', sub: 'Istedigin urunun fiyati dusunce seni haberdar edelim.', btn: 'Alarm kur' },
    { bg: 'linear-gradient(135deg, #2c3e50, #4a6fa5, #2c3e50)', tag: 'Ev & Yasam', title: 'Evin icin\nen iyi secim.', sub: 'Beyaz esyadan mobilyaya, tum ev urunlerini karsilastir.', btn: 'Kesfet' },
  ];

  const slideCount = slides.length;

  useEffect(() => {
    setLogoAnim('enter');
    const t = setTimeout(() => setLogoAnim('float'), 900);
    return () => clearTimeout(t);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slideCount), 5000);
    return () => clearInterval(timer);
  }, [slideCount]);

  const goTo = (n: number) => setCurrent((n + slideCount) % slideCount);

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    setSearching(true);
    setLogoAnim('fly');
    setTimeout(() => {
      setLogoAnim('enter');
      setTimeout(() => setLogoAnim('float'), 800);
      setSearching(false);
    }, 1200);
  };

  const logoStyle: React.CSSProperties = {
    transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s',
    transform: logoAnim === 'fly' ? 'translateX(-120px) translateY(-10px) scaleX(0.5)' : logoAnim === 'enter' ? 'translateY(0px)' : 'translateY(0px)',
    opacity: logoAnim === 'fly' ? 0 : 1,
    animation: logoAnim === 'float' ? 'zpFloat 3s ease-in-out infinite' : 'none',
  };

  const categories = [
    { name: 'Teknoloji', icon: '📱' }, { name: 'Ev & Yasam', icon: '🏠' },
    { name: 'Moda', icon: '👗' }, { name: 'Kozmetik', icon: '💄' },
    { name: 'Oyun & Hobi', icon: '🎮' }, { name: 'Kitap & Egitim', icon: '📚' },
    { name: 'Anne & Bebek', icon: '🍼' }, { name: 'Otomotiv', icon: '🚗' },
    { name: 'Seyahat', icon: '✈️' },
  ];

  const trendProducts = [
    { name: 'iPhone 15 Pro 128GB Siyah Titanyum', price: '₺44.999', badge: 'Fiyat dustu', badgeType: 'drop', change: '↓ %8 dustu', changeType: 'down' },
    { name: 'Samsung Galaxy S24 Ultra 256GB', price: '₺52.499', badge: 'Cok aranan', badgeType: 'hot', change: '↑ %3 artti', changeType: 'up' },
    { name: 'Sony WH-1000XM5 Gurultu Engelleme', price: '₺8.299', badge: 'Yeni geldi', badgeType: 'new', change: '↓ %5 dustu', changeType: 'down' },
    { name: 'MacBook Air M2 8GB 256GB Uzay Grisi', price: '₺38.990', badge: 'Fiyat dustu', badgeType: 'drop', change: '↓ %12 dustu', changeType: 'down' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#F4F7F4', minHeight: '100vh', color: '#141A14' }}>
      <style>{`
        @keyframes zpFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', background: '#fff', borderBottom: '1px solid #DDE8DD', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 800 }}>
          <div style={logoStyle}>
            <ZeplinLogo size={36} />
          </div>
          <span>Zep</span><span style={{ color: '#2A7A4B' }}>lin</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Kesfet', 'Fiyat Alarmi', 'Trend', 'Finans', 'Hakkinda'].map((item) => (
            <a key={item} href="#" style={{ fontSize: 14, color: '#5A6E5A', textDecoration: 'none', fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 24, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Uye Ol</button>
      </nav>

      {/* SLIDER */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 0.7s ease', background: slide.bg, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '0 60px' }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{slide.tag}</span>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 10, whiteSpace: 'pre-line' }}>{slide.title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', marginBottom: 24, maxWidth: 400 }}>{slide.sub}</div>
              <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{slide.btn}</button>
            </div>
          </div>
        ))}
        <button onClick={() => goTo(current - 1)} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 20, zIndex: 10 }}>&#8249;</button>
        <button onClick={() => goTo(current + 1)} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 20, zIndex: 10 }}>&#8250;</button>
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transform: i === current ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* ARAMA */}
      <div style={{ background: '#fff', padding: '28px 40px', borderBottom: '1px solid #DDE8DD', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ width: '100%', maxWidth: 620, position: 'relative' }}>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="iPhone 15 Pro, Samsung 65 QLED..."
            style={{ width: '100%', background: '#fff', border: '1.5px solid #C8D9C8', borderRadius: 16, padding: '15px 56px 15px 20px', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxShadow: '0 2px 8px rgba(42,122,75,0.06)' }}
          />
          <button onClick={handleSearch} disabled={searching} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: '#2A7A4B', border: 'none', borderRadius: 10, width: 40, height: 40, color: '#fff', cursor: 'pointer', fontSize: 18 }}>🔍</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#9FAF9F' }}>Populer:</span>
          {['iPhone 15', 'Samsung S24', 'AirPods Pro', 'Dyson V15', 'PS5'].map((tag) => (
            <button key={tag} onClick={() => setSearchVal(tag)} style={{ background: '#fff', border: '1px solid #C8D9C8', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', color: '#5A6E5A', fontSize: 12, fontFamily: 'inherit', fontWeight: 500 }}>{tag}</button>
          ))}
        </div>
      </div>

      {/* ISTATISTIKLER */}
      <div style={{ padding: '20px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '20px 40px', background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16 }}>
          {[{ num: '2.4M+', label: 'Urun takip ediliyor' }, { num: '150+', label: 'Magaza karsilastiriliyor' }, { num: '142M TL', label: 'Kullanici tasarrufu' }, { num: '98%', label: 'Yorum dogrulugu' }].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              {i > 0 && <div style={{ width: 1, height: 30, background: '#DDE8DD' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#2A7A4B' }}>{stat.num}</div>
                <div style={{ fontSize: 11, color: '#8A9E8A', marginTop: 2 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KATEGORILER */}
      <div style={{ padding: '32px 40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Kategoriler</span>
          <button style={{ fontSize: 13, color: '#2A7A4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Tumunu gor</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10 }}>
          {categories.map((cat) => (
            <div key={cat.name} style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 14, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#4A5E4A' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TREND URUNLER */}
      <div style={{ padding: '8px 40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Trend urunler 🔥</span>
          <button style={{ fontSize: 13, color: '#2A7A4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Hepsini gor</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {trendProducts.map((product) => (
            <div key={product.name} style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: 16, cursor: 'pointer' }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: product.badgeType === 'drop' ? '#E8F4EE' : product.badgeType === 'hot' ? '#FEF3E2' : '#EEF0FE', color: product.badgeType === 'drop' ? '#1F6B3E' : product.badgeType === 'hot' ? '#B45309' : '#4338CA' }}>{product.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2A1A', marginBottom: 8, lineHeight: 1.35 }}>{product.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2A7A4B' }}>{product.price}</div>
              <div style={{ fontSize: 10, color: '#8A9E8A', marginTop: 1 }}>en dusuk fiyat</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, marginTop: 8, padding: '3px 8px', borderRadius: 6, background: product.changeType === 'down' ? '#E8F4EE' : '#FEE2E2', color: product.changeType === 'down' ? '#1F6B3E' : '#B91C1C' }}>{product.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OZELLIK SERIDI */}
      <div style={{ margin: '0 40px 40px', background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[{ icon: '🔔', text: 'Fiyat alarmi kur' }, { icon: '📈', text: 'Fiyat gecmisini gor' }, { icon: '💬', text: 'AI yorum analizi' }, { icon: '🛡️', text: 'Sahte yorum tespiti' }].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#4A6A4A', fontWeight: 500 }}><span>{item.icon}</span>{item.text}</div>
          ))}
        </div>
        <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>🔔 Alarm kur</button>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #DDE8DD', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 800, color: '#9FAF9F' }}>
          <ZeplinLogo size={22} />
          Zep<span style={{ color: '#2A7A4B' }}>lin</span>
        </div>
        <div style={{ fontSize: 12, color: '#B0C0B0' }}>2026 Zeplin - Turkiye fiyat kiyaslama platformu</div>
      </footer>
    </div>
  );
}
