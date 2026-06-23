/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState, useEffect } from 'react';

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

interface ProductDetail {
  name: string;
  brand: string;
  category: string;
  icon: string;
  rating: number;
  reviewCount: number;
  lowestPrice: number;
  highestPrice: number;
  reviewSummary: string;
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
  prices: { site: string; price: number; shipping: string; days: string; stock: string; color: string; rating: number }[];
  priceHistory: number[];
}

export default function UrunDetay() {
  const [activeTab, setActiveTab] = useState('fiyatlar');
  const [alarmPrice, setAlarmPrice] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);
  const [logoAnim, setLogoAnim] = useState('enter');
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    setLogoAnim('enter');
    const t = setTimeout(() => setLogoAnim('float'), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      let selectedProduct = null;
      try {
        const stored = localStorage.getItem('selectedProduct');
        if (stored) selectedProduct = JSON.parse(stored);
      } catch (e) { console.error(e); }

      const productName = selectedProduct?.name || 'iPhone 15 Pro 128GB';
      const productPrice = selectedProduct?.price || 44999;

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-6',
            max_tokens: 1500,
            messages: [{
              role: 'user',
              content: `Sen bir Turk e-ticaret urun detay asistanisin. "${productName}" urunun detaylarini olustur. Tahmini fiyat: ${productPrice} TL. Sadece JSON don, baska hicbir sey yazma:
{
  "name": "tam urun adi",
  "brand": "marka",
  "category": "kategori",
  "icon": "emoji",
  "rating": 4.5,
  "reviewCount": 1234,
  "lowestPrice": ${productPrice},
  "highestPrice": ${Math.round(productPrice * 1.15)},
  "reviewSummary": "kullanici yorumlarinin ozeti",
  "pros": ["artı 1", "artı 2", "artı 3", "artı 4"],
  "cons": ["eksi 1", "eksi 2", "eksi 3"],
  "specs": [{"label": "Ekran", "value": "..."}, {"label": "Islemci", "value": "..."}, {"label": "RAM", "value": "..."}, {"label": "Depolama", "value": "..."}, {"label": "Kamera", "value": "..."}, {"label": "Pil", "value": "..."}],
  "prices": [
    {"site": "Hepsiburada", "price": ${productPrice}, "shipping": "Ucretsiz", "days": "1-2 gun", "stock": "Var", "color": "#FF6000", "rating": 4.7},
    {"site": "Trendyol", "price": ${Math.round(productPrice * 1.02)}, "shipping": "Ucretsiz", "days": "1-3 gun", "stock": "Var", "color": "#FF6900", "rating": 4.6},
    {"site": "Amazon TR", "price": ${Math.round(productPrice * 1.03)}, "shipping": "Ucretsiz", "days": "2-3 gun", "stock": "Var", "color": "#FF9900", "rating": 4.8},
    {"site": "n11", "price": ${Math.round(productPrice * 1.06)}, "shipping": "29.90 TL", "days": "3-5 gun", "stock": "Sinirli", "color": "#6633CC", "rating": 4.3},
    {"site": "MediaMarkt", "price": ${Math.round(productPrice * 1.1)}, "shipping": "Ucretsiz", "days": "2-4 gun", "stock": "Var", "color": "#CC0000", "rating": 4.5},
    {"site": "Vatan", "price": ${Math.round(productPrice * 1.13)}, "shipping": "Ucretsiz", "days": "1-2 gun", "stock": "Var", "color": "#003DA5", "rating": 4.6}
  ],
  "priceHistory": [${Math.round(productPrice*0.92)}, ${Math.round(productPrice*0.98)}, ${Math.round(productPrice*1.08)}, ${Math.round(productPrice*1.15)}, ${Math.round(productPrice*1.1)}, ${Math.round(productPrice*1.02)}, ${productPrice}]
}`
            }]
          })
        });
        const data = await response.json();
        const text = data.content?.[0]?.text || '{}';
        const clean = text.replace(/```json|```/g, '').trim();
        const detail = JSON.parse(clean);
        setProduct(detail);
      } catch (e) {
        console.error(e);
        setProduct({
          name: productName, brand: selectedProduct?.brand || 'Marka', category: selectedProduct?.category || 'Urun',
          icon: selectedProduct?.icon || '📦', rating: 4.5, reviewCount: 1250,
          lowestPrice: productPrice, highestPrice: Math.round(productPrice * 1.15),
          reviewSummary: 'Kullanici yorumlari yukleniyor...',
          pros: ['Kaliteli urun', 'Iyi performans', 'Degerinde fiyat'],
          cons: ['Bekleme suresi', 'Kargo ucreti'],
          specs: [{ label: 'Marka', value: selectedProduct?.brand || 'Marka' }],
          prices: [
            { site: 'Hepsiburada', price: productPrice, shipping: 'Ucretsiz', days: '1-2 gun', stock: 'Var', color: '#FF6000', rating: 4.7 },
            { site: 'Trendyol', price: Math.round(productPrice * 1.02), shipping: 'Ucretsiz', days: '1-3 gun', stock: 'Var', color: '#FF6900', rating: 4.6 },
          ],
          priceHistory: [productPrice * 0.9, productPrice * 0.95, productPrice * 1.05, productPrice * 1.1, productPrice * 1.05, productPrice * 1.0, productPrice],
        });
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, []);

  const logoStyle: React.CSSProperties = {
    transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s',
    animation: logoAnim === 'float' ? 'zpFloat 3s ease-in-out infinite' : 'none',
  };

  const tabs = [
    { id: 'fiyatlar', label: 'Fiyat Karsilastirma' },
    { id: 'yorumlar', label: 'Yorum Analizi' },
    { id: 'ozellikler', label: 'Teknik Ozellikler' },
    { id: 'grafik', label: 'Fiyat Gecmisi' },
  ];

  if (loading) return (
    <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F4F7F4', gap: 20 }}>
      <style>{`@keyframes zpFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ animation: 'zpFloat 2s ease-in-out infinite' }}><ZeplinLogo size={80} /></div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#2A7A4B' }}>Urun detaylari yukleniyor...</div>
      <div style={{ fontSize: 13, color: '#8A9E8A' }}>AI fiyatlari ve yorumlari analiz ediyor</div>
      <div style={{ width: 40, height: 40, border: '3px solid #E8F4EE', borderTopColor: '#2A7A4B', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  if (!product) return null;

  const maxPrice = Math.max(...product.priceHistory);
  const minPrice = Math.min(...product.priceHistory);
  const days = ['30g', '25g', '20g', '15g', '10g', '5g', 'Bugun'];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#F4F7F4', minHeight: '100vh', color: '#141A14' }}>
      <style>{`
        @keyframes zpFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .suggestion-item:hover { background: #E8F4EE !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 40px', background: '#fff', borderBottom: '1px solid #DDE8DD', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 800, textDecoration: 'none', color: '#141A14' }}>
          <div style={logoStyle}><ZeplinLogo size={36} /></div>
          <span>Zep</span><span style={{ color: '#2A7A4B' }}>lin</span>
        </a>
        <div style={{ flex: 1, maxWidth: 400, margin: '0 32px', position: 'relative' }}>
          <input value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Baska urun ara..." style={{ width: '100%', border: '1.5px solid #C8D9C8', borderRadius: 12, padding: '9px 40px 9px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 16, cursor: 'pointer' }} onClick={() => { if(searchVal) window.location.href = '/'; }}>🔍</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Kesfet', 'Fiyat Alarmi', 'Trend', 'Finans'].map((item) => (
            <a key={item} href="#" style={{ fontSize: 14, color: '#5A6E5A', textDecoration: 'none', fontWeight: 500 }}>{item}</a>
          ))}
        </div>
        <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '9px 20px', borderRadius: 24, fontSize: 13, fontWeight: 700, cursor: 'pointer', marginLeft: 20 }}>Uye Ol</button>
      </nav>

      {/* BREADCRUMB */}
      <div style={{ padding: '12px 40px', fontSize: 13, color: '#8A9E8A' }}>
        <a href="/" style={{ color: '#2A7A4B', textDecoration: 'none' }}>Ana Sayfa</a>
        <span style={{ margin: '0 8px' }}>›</span>
        <span>{product.category}</span>
        <span style={{ margin: '0 8px' }}>›</span>
        <span style={{ color: '#141A14' }}>{product.brand}</span>
      </div>

      <div style={{ padding: '0 40px 40px', maxWidth: 1200, margin: '0 auto' }}>

        {/* URUN OZET */}
        <div style={{ background: '#fff', borderRadius: 20, padding: 28, marginBottom: 20, border: '1px solid #DDE8DD', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ width: 200, height: 200, background: '#F4F7F4', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0 }}>{product.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#2A7A4B', fontWeight: 600, marginBottom: 6 }}>{product.brand}</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.3, color: '#0D1A0D' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map((s) => (<span key={s} style={{ color: s <= Math.round(product.rating) ? '#F5C842' : '#DDE8DD', fontSize: 18 }}>★</span>))}
              </div>
              <span style={{ fontSize: 18, fontWeight: 800 }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: '#8A9E8A' }}>{product.reviewCount.toLocaleString()} yorum</span>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#8A9E8A', marginBottom: 4 }}>Fiyat araligi</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#2A7A4B' }}>₺{product.lowestPrice.toLocaleString()}</span>
                <span style={{ fontSize: 16, color: '#8A9E8A', textDecoration: 'line-through' }}>₺{product.highestPrice.toLocaleString()}</span>
                <span style={{ background: '#E8F4EE', color: '#1F6B3E', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>%{Math.round((1 - product.lowestPrice / product.highestPrice) * 100)} tasarruf</span>
              </div>
              <div style={{ fontSize: 12, color: '#8A9E8A', marginTop: 4 }}>{product.prices.length} magazada karsilastirildi</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>En Ucuz: {product.prices[0]?.site} →</button>
              <button style={{ background: '#fff', color: '#2A7A4B', border: '1.5px solid #2A7A4B', padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>🔔 Alarm Kur</button>
              <button style={{ background: '#fff', color: '#5A6E5A', border: '1px solid #DDE8DD', padding: '12px 20px', borderRadius: 12, fontSize: 14, cursor: 'pointer' }}>♡ Favori</button>
            </div>
          </div>

          {/* Alarm */}
          <div style={{ width: 220, background: '#F4F7F4', borderRadius: 16, padding: 20, border: '1px solid #DDE8DD', flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🔔 Fiyat Alarmi</div>
            <div style={{ fontSize: 12, color: '#5A6E5A', marginBottom: 12 }}>Fiyat istedigin seviyeye dustugunde seni haberdar edelim</div>
            {!alarmSet ? (
              <>
                <input value={alarmPrice} onChange={(e) => setAlarmPrice(e.target.value)} placeholder="Hedef fiyat (TL)" style={{ width: '100%', border: '1px solid #C8D9C8', borderRadius: 10, padding: '9px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', marginBottom: 8 }} />
                <button onClick={() => alarmPrice && setAlarmSet(true)} style={{ width: '100%', background: '#2A7A4B', color: '#fff', border: 'none', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Alarm Kur</button>
              </>
            ) : (
              <div style={{ background: '#E8F4EE', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>✅</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F6B3E', marginTop: 4 }}>Alarm Kuruldu!</div>
                <div style={{ fontSize: 12, color: '#5A6E5A' }}>₺{alarmPrice} olunca haber vericez</div>
              </div>
            )}
            <div style={{ marginTop: 12, fontSize: 11, color: '#8A9E8A', textAlign: 'center' }}>📉 Bu hafta dusmesi bekleniyor</div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 6, borderRadius: 16, border: '1px solid #DDE8DD' }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', background: activeTab === tab.id ? '#2A7A4B' : 'transparent', color: activeTab === tab.id ? '#fff' : '#5A6E5A', transition: 'all 0.2s' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* FIYAT KARSILASTIRMA */}
        {activeTab === 'fiyatlar' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDE8DD', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #DDE8DD', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Fiyat Karsilastirma</span>
              <span style={{ fontSize: 12, color: '#8A9E8A' }}>Son guncelleme: 5 dakika once</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F4F7F4' }}>
                  {['MAGAZA', 'FIYAT', 'KARGO', 'TESLIMAT', 'STOK', 'PUAN', ''].map((h, i) => (
                    <th key={i} style={{ padding: '12px 24px', textAlign: i === 1 ? 'right' : i > 1 && i < 6 ? 'center' : 'left', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.prices.map((p, i) => (
                  <tr key={p.site} style={{ borderTop: '1px solid #DDE8DD', background: i === 0 ? '#F0FAF4' : '#fff' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.color }} />
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{p.site}</span>
                        {i === 0 && <span style={{ background: '#E8F4EE', color: '#1F6B3E', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 5 }}>EN UCUZ</span>}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: i === 0 ? '#2A7A4B' : '#141A14' }}>₺{p.price.toLocaleString()}</span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, color: p.shipping === 'Ucretsiz' ? '#1F6B3E' : '#5A6E5A' }}>{p.shipping}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, color: '#5A6E5A' }}>{p.days}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: p.stock === 'Var' ? '#1F6B3E' : '#B45309', background: p.stock === 'Var' ? '#E8F4EE' : '#FEF3E2', padding: '3px 8px', borderRadius: 6 }}>{p.stock}</span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13 }}>⭐ {p.rating}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <button style={{ background: i === 0 ? '#2A7A4B' : '#fff', color: i === 0 ? '#fff' : '#2A7A4B', border: '1.5px solid #2A7A4B', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Siteye Git →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* YORUMLAR */}
        {activeTab === 'yorumlar' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🤖 AI Yorum Ozeti</div>
              <div style={{ background: '#F4F7F4', borderRadius: 12, padding: 16, fontSize: 14, color: '#5A6E5A', lineHeight: 1.7, marginBottom: 20 }}>{product.reviewSummary}</div>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {['😍', '😊', '😐', '😤', '😡'].map((emoji, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28 }}>{emoji}</div>
                    <div style={{ fontSize: 12, color: '#8A9E8A', marginTop: 4 }}>{[45, 30, 12, 8, 5][i]}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#1F6B3E' }}>👍 Artilari</div>
                {product.pros.map((pro, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8F4EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 13 }}>{pro}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#B91C1C' }}>👎 Eksileri</div>
                {product.cons.map((con, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✕</div>
                    <span style={{ fontSize: 13 }}>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OZELLIKLER */}
        {activeTab === 'ozellikler' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDE8DD', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #DDE8DD', fontWeight: 700, fontSize: 16 }}>Teknik Ozellikler</div>
            {product.specs.map((spec, i) => (
              <div key={i} style={{ display: 'flex', padding: '14px 24px', borderBottom: i < product.specs.length - 1 ? '1px solid #DDE8DD' : 'none', background: i % 2 === 0 ? '#fff' : '#F4F7F4' }}>
                <span style={{ width: 180, fontSize: 13, color: '#8A9E8A', fontWeight: 500 }}>{spec.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* GRAFIK */}
        {activeTab === 'grafik' && (
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Son 30 Gun Fiyat Gecmisi</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
              {product.priceHistory.map((price, i) => {
                const height = ((price - minPrice) / (maxPrice - minPrice + 1)) * 160 + 40;
                const isMin = price === minPrice;
                const isLast = i === product.priceHistory.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 10, color: isMin ? '#1F6B3E' : isLast ? '#2A7A4B' : '#8A9E8A', fontWeight: isMin || isLast ? 700 : 400 }}>₺{(price/1000).toFixed(0)}K</div>
                    <div style={{ width: '100%', height, background: isMin ? '#2A7A4B' : isLast ? '#4A9A6B' : '#DDE8DD', borderRadius: '6px 6px 0 0' }} />
                    <div style={{ fontSize: 10, color: '#8A9E8A' }}>{days[i]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 32, marginTop: 16, padding: '12px 0', borderTop: '1px solid #DDE8DD' }}>
              <div><div style={{ fontSize: 11, color: '#8A9E8A' }}>En Dusuk</div><div style={{ fontSize: 16, fontWeight: 800, color: '#2A7A4B' }}>₺{minPrice.toLocaleString()}</div></div>
              <div><div style={{ fontSize: 11, color: '#8A9E8A' }}>En Yuksek</div><div style={{ fontSize: 16, fontWeight: 800, color: '#B91C1C' }}>₺{maxPrice.toLocaleString()}</div></div>
              <div><div style={{ fontSize: 11, color: '#8A9E8A' }}>Ortalama</div><div style={{ fontSize: 16, fontWeight: 800 }}>₺{Math.round(product.priceHistory.reduce((a,b) => a+b) / product.priceHistory.length).toLocaleString()}</div></div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #DDE8DD', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 800, color: '#9FAF9F' }}>
          <ZeplinLogo size={22} />Zep<span style={{ color: '#2A7A4B' }}>lin</span>
        </div>
        <div style={{ fontSize: 12, color: '#B0C0B0' }}>2026 Zeplin - Turkiye fiyat kiyaslama platformu</div>
      </footer>
    </div>
  );
}