/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect, useRef } from 'react';

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

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  icon: string;
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [logoAnim, setLogoAnim] = useState('enter');
  const [loading, setLoading] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides = [
    { bg: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', tag: 'Teknoloji', title: 'En iyi fiyat,\nbir tik uzaginda.', sub: 'Telefon, laptop, kulaklik - yuzlerce magazayi aninda karsilastir.', btn: 'Telefon ara' },
    { bg: 'linear-gradient(135deg, #1a6b3c, #2d9e6b, #1a6b3c)', tag: 'Seyahat', title: 'Ucusunu karsilastir,\nen ucuzunu bul.', sub: 'Ucak bileti, otel, arac kiralama - tum platformlari tek yerde gor.', btn: 'Seyahate bak' },
    { bg: 'linear-gradient(135deg, #7b2d00, #c0392b, #922b21)', tag: 'Gunun Firsati', title: 'Fiyat dustu,\nalarm caldi!', sub: 'Urunun fiyati dusunce seni haberdar edelim.', btn: 'Alarm kur' },
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

  const searchWithAI = async (query: string) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Sen bir Turk e-ticaret urun arama asistanisin. Kullanici "${query}" aramasini yapti. Bana bu aramayla ilgili 6 adet gercekci urun oner. Sadece JSON array don, baska hicbir sey yazma. Format:
[{"id":1,"name":"Tam urun adi","brand":"Marka","category":"Kategori","price":12345,"icon":"emoji"}]
Kategoriler: Telefon, Laptop, Tablet, Kulaklik, Televizyon, Oyun, Kamera, Ev & Yasam, Moda, Kozmetik
Fiyatlar gercekci Turk Lirasi cinsinden olsun. Icon olarak ilgili emoji kullan.`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.[0]?.text || '[]';
      const clean = text.replace(/```json|```/g, '').trim();
      const products = JSON.parse(clean);
      setSuggestions(products);
      setShowSuggestions(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchVal(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (val.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setLoading(true);
    searchTimeout.current = setTimeout(() => searchWithAI(val), 500);
  };

  const handleSelectProduct = (product: Product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    setLogoAnim('fly');
    setTimeout(() => { window.location.href = '/urun'; }, 800);
  };

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    setLogoAnim('fly');
    setTimeout(() => { window.location.href = '/urun'; }, 800);
  };

  const logoStyle: React.CSSProperties = {
    transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s',
    transform: logoAnim === 'fly' ? 'translateX(-120px) translateY(-10px) scaleX(0.5)' : 'translateY(0px)',
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
        @keyframes zpFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .suggestion-item:hover { background: #E8F4EE !important; }
        .cat-card:hover { background: #E8F4EE !important; border-color: #9FCDB3 !important; transform: translateY(-2px); }
        .trend-card:hover { border-color: #9FCDB3 !important; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(42,122,75,0.1); }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', background: '#fff', borderBottom: '1px solid #DDE8DD', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 800 }}>
          <div style={logoStyle}><ZeplinLogo size={36} /></div>
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
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Samsung S26, iPhone 15, MacBook Air..."
            style={{ width: '100%', background: '#fff', border: '1.5px solid #C8D9C8', borderRadius: 16, padding: '15px 56px 15px 20px', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxShadow: '0 2px 8px rgba(42,122,75,0.06)' }}
          />
          <button onClick={handleSearch} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: '#2A7A4B', border: 'none', borderRadius: 10, width: 40, height: 40, color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? <div style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : '🔍'}
          </button>

          {/* Autocomplete */}
          {showSuggestions && suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 200, overflow: 'hidden' }}>
              <div style={{ padding: '8px 16px 4px', fontSize: 11, color: '#8A9E8A', fontWeight: 600 }}>AI ONERI — {suggestions.length} SONUC</div>
              {suggestions.map((s, i) => (
                <div key={i} className="suggestion-item" onClick={() => handleSelectProduct(s)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderTop: '0.5px solid #DDE8DD', background: '#fff', transition: 'background 0.15s' }}>
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#141A14' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#8A9E8A', marginTop: 2 }}>{s.category} · {s.brand}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: '#2A7A4B' }}>₺{s.price.toLocaleString()}</div>
                  <span style={{ fontSize: 12, color: '#2A7A4B' }}>→</span>
                </div>
              ))}
              <div style={{ padding: '10px 16px', borderTop: '1px solid #DDE8DD', background: '#F4F7F4', cursor: 'pointer' }} onClick={handleSearch}>
                <span style={{ fontSize: 13, color: '#2A7A4B', fontWeight: 600 }}>"{searchVal}" icin tum sonuclari gor →</span>
              </div>
            </div>
          )}

          {/* Yukleniyor */}
          {loading && !showSuggestions && (
            <div style={{ position: 'absolute', top: '110%', left: 0, right: 0, background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: '16px', textAlign: 'center', zIndex: 200 }}>
              <div style={{ fontSize: 13, color: '#8A9E8A' }}>🔍 Urunler aranıyor...</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#9FAF9F' }}>Populer:</span>
          {['iPhone 15', 'Samsung S24', 'MacBook Air', 'PS5', 'AirPods Pro'].map((tag) => (
            <button key={tag} onClick={() => handleSearchChange(tag)} style={{ background: '#fff', border: '1px solid #C8D9C8', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', color: '#5A6E5A', fontSize: 12, fontFamily: 'inherit', fontWeight: 500 }}>{tag}</button>
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
            <div key={cat.name} className="cat-card" style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 14, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s' }}>
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
            <a key={product.name} href="/urun" className="trend-card" style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: 16, cursor: 'pointer', textDecoration: 'none', color: '#141A14', display: 'block', transition: 'all 0.18s' }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: product.badgeType === 'drop' ? '#E8F4EE' : product.badgeType === 'hot' ? '#FEF3E2' : '#EEF0FE', color: product.badgeType === 'drop' ? '#1F6B3E' : product.badgeType === 'hot' ? '#B45309' : '#4338CA' }}>{product.badge}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, lineHeight: 1.35 }}>{product.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2A7A4B' }}>{product.price}</div>
              <div style={{ fontSize: 10, color: '#8A9E8A', marginTop: 1 }}>en dusuk fiyat</div>
              <div style={{ display: 'inline-flex', fontSize: 11, fontWeight: 600, marginTop: 8, padding: '3px 8px', borderRadius: 6, background: product.changeType === 'down' ? '#E8F4EE' : '#FEE2E2', color: product.changeType === 'down' ? '#1F6B3E' : '#B91C1C' }}>{product.change}</div>
            </a>
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