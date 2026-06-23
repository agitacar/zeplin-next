'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [searchVal, setSearchVal] = useState('');

  const slides = [
    {
      bg: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      tag: 'Teknoloji',
      title: 'En iyi fiyat,\nbir tık uzağında.',
      sub: 'Telefon, laptop, kulaklık — yüzlerce mağazayı anında karşılaştır.',
      btn: 'Telefon ara',
    },
    {
      bg: 'linear-gradient(135deg, #1a6b3c, #2d9e6b, #1a6b3c)',
      tag: 'Seyahat',
      title: 'Uçuşunu karşılaştır,\nen ucuzunu bul.',
      sub: 'Uçak bileti, otel, araç kiralama — tüm seyahat platformlarını tek yerde gör.',
      btn: 'Seyahate bak',
    },
    {
      bg: 'linear-gradient(135deg, #7b2d00, #c0392b, #922b21)',
      tag: 'Günün Fırsatı',
      title: 'Fiyat düştü,\nalarm çaldı!',
      sub: 'İstediğin ürünün fiyatı düşünce seni haberdar edelim. Fırsatı kaçırma.',
      btn: 'Alarm kur',
    },
    {
      bg: 'linear-gradient(135deg, #2c3e50, #4a6fa5, #2c3e50)',
      tag: 'Ev & Yaşam',
      title: 'Evin için\nen iyi seçim.',
      sub: 'Beyaz eşyadan mobilyaya, tüm ev ürünlerini karşılaştır.',
      btn: 'Keşfet',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Teknoloji', icon: '📱' },
    { name: 'Ev & Yaşam', icon: '🏠' },
    { name: 'Moda', icon: '👗' },
    { name: 'Kozmetik', icon: '💄' },
    { name: 'Oyun & Hobi', icon: '🎮' },
    { name: 'Kitap & Eğitim', icon: '📚' },
    { name: 'Anne & Bebek', icon: '🍼' },
    { name: 'Otomotiv', icon: '🚗' },
    { name: 'Seyahat', icon: '✈️' },
  ];

  const trendProducts = [
    { name: 'iPhone 15 Pro 128GB Siyah Titanyum', price: '₺44.999', badge: 'Fiyat düştü', badgeType: 'drop', change: '↓ %8 düştü', changeType: 'down' },
    { name: 'Samsung Galaxy S24 Ultra 256GB', price: '₺52.499', badge: 'Çok aranan', badgeType: 'hot', change: '↑ %3 arttı', changeType: 'up' },
    { name: 'Sony WH-1000XM5 Gürültü Engelleme', price: '₺8.299', badge: 'Yeni geldi', badgeType: 'new', change: '↓ %5 düştü', changeType: 'down' },
    { name: 'MacBook Air M2 8GB 256GB Uzay Grisi', price: '₺38.990', badge: 'Fiyat düştü', badgeType: 'drop', change: '↓ %12 düştü', changeType: 'down' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#F4F7F4', minHeight: '100vh', color: '#141A14' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', background: '#fff', borderBottom: '1px solid #DDE8DD', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, fontWeight: 800 }}>
          <span>Zep</span><span style={{ color: '#2A7A4B' }}>lin</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Keşfet', 'Fiyat Alarmı', 'Trend', 'Finans', 'Hakkında'].map((item) => (
            <a key={item} href="#" style={{ fontSize: 14, color: '#5A6E5A', textDecoration: 'none', fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 24, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          Üye Ol
        </button>
      </nav>

      {/* SLIDER */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        {slides.map((slide, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 0.7s ease', background: slide.bg, display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '0 60px' }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {slide.tag}
              </span>
              <div style={{ fontSize: 40, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 10, whiteSpace: 'pre-line' }}>{slide.title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.82)', marginBottom: 24, maxWidth: 400 }}>{slide.sub}</div>
              <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                {slide.btn}
              </button>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 20, zIndex: 10 }}>‹</button>
        <button onClick={() => setCurrent((current + 1) % slides.length)} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 20, zIndex: 10 }}>›</button>

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 10 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transform: i === current ? 'scale(1.3)' : 'scale(1)', transition: 'all 0.3s' }} />
          ))}
        </div>
      </div>

      {/* ARAMA */}
      <div style={{ background: '#fff', padding: '28px 40px', borderBottom: '1px solid #DDE8DD', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ width: '100%', maxWidth: 620, position: 'relative' }}>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder='ör. "iPhone 15 Pro" veya "Samsung 65 QLED"'
            style={{ width: '100%', background: '#fff', border: '1.5px solid #C8D9C8', borderRadius: 16, padding: '15px 56px 15px 20px', fontSize: 15, fontFamily: 'inherit', outline: 'none', boxShadow: '0 2px 8px rgba(42,122,75,0.06)' }}
          />
          <button style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: '#2A7A4B', border: 'none', borderRadius: 10, width: 40, height: 40, color: '#fff', cursor: 'pointer', fontSize: 18 }}>🔍</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, color: '#9FAF9F' }}>Popüler:</span>
          {['iPhone 15', 'Samsung S24', 'AirPods Pro', 'Dyson V15', 'PS5'].map((tag) => (
            <button key={tag} onClick={() => setSearchVal(tag)} style={{ background: '#fff', border: '1px solid #C8D9C8', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', color: '#5A6E5A', fontSize: 12, fontFamily: 'inherit', fontWeight: 500 }}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* İSTATİSTİKLER */}
      <div style={{ padding: '20px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, padding: '20px 40px', background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16 }}>
          {[
            { num: '2.4M+', label: 'Ürün takip ediliyor' },
            { num: '150+', label: 'Mağaza karşılaştırılıyor' },
            { num: '₺142M', label: 'Kullanıcı tasarrufu' },
            { num: '98%', label: 'Yorum doğruluğu' },
          ].map((stat, i) => (
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

      {/* KATEGORİLER */}
      <div style={{ padding: '32px 40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Kategoriler</span>
          <button style={{ fontSize: 13, color: '#2A7A4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Tümünü gör →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 10 }}>
          {categories.map((cat) => (
            <div key={cat.name} style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 14, padding: '16px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#E8F4EE'; (e.currentTarget as HTMLDivElement).style.borderColor = '#9FCDB3'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#fff'; (e.currentTarget as HTMLDivElement).style.borderColor = '#DDE8DD'; }}>
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#4A5E4A' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TREND ÜRÜNLER */}
      <div style={{ padding: '8px 40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Trend ürünler 🔥</span>
          <button style={{ fontSize: 13, color: '#2A7A4B', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Hepsini gör →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {trendProducts.map((product) => (
            <div key={product.name} style={{ background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: 16, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                  background: product.badgeType === 'drop' ? '#E8F4EE' : product.badgeType === 'hot' ? '#FEF3E2' : '#EEF0FE',
                  color: product.badgeType === 'drop' ? '#1F6B3E' : product.badgeType === 'hot' ? '#B45309' : '#4338CA',
                }}>
                  {product.badge}
                </span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2A1A', marginBottom: 8, lineHeight: 1.35 }}>{product.name}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#2A7A4B' }}>{product.price}</div>
              <div style={{ fontSize: 10, color: '#8A9E8A', marginTop: 1 }}>en düşük fiyat</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 600, marginTop: 8, padding: '3px 8px', borderRadius: 6,
                background: product.changeType === 'down' ? '#E8F4EE' : '#FEE2E2',
                color: product.changeType === 'down' ? '#1F6B3E' : '#B91C1C',
              }}>
                {product.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ÖZELLİK ŞERİDİ */}
      <div style={{ margin: '0 40px 40px', background: '#fff', border: '1px solid #DDE8DD', borderRadius: 16, padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {[
            { icon: '🔔', text: 'Fiyat alarmı kur' },
            { icon: '📈', text: 'Fiyat geçmişini gör' },
            { icon: '💬', text: 'AI yorum analizi' },
            { icon: '🛡️', text: 'Sahte yorum tespiti' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#4A6A4A', fontWeight: 500 }}>
              <span>{item.icon}</span>{item.text}
            </div>
          ))}
        </div>
        <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          🔔 Alarm kur
        </button>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #DDE8DD', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#9FAF9F' }}>Zep<span style={{ color: '#2A7A4B' }}>lin</span></div>
        <div style={{ fontSize: 12, color: '#B0C0B0' }}>© 2026 Zeplin — Türkiye'nin fiyat avcısı</div>
      </footer>

    </div>
  );
}
