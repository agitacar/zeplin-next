'use client';

import { useState } from 'react';

const product = {
  name: 'Apple iPhone 15 Pro 128GB Siyah Titanyum',
  brand: 'Apple',
  category: 'Telefon',
  rating: 4.6,
  reviewCount: 2847,
  lowestPrice: 44999,
  highestPrice: 52999,
  image: '📱',
  prices: [
    { site: 'Hepsiburada', price: 44999, shipping: 'Ucretsiz', days: '1-2 gun', stock: 'Var', color: '#FF6000', rating: 4.7 },
    { site: 'Trendyol', price: 45999, shipping: 'Ucretsiz', days: '1-3 gun', stock: 'Var', color: '#FF6900', rating: 4.6 },
    { site: 'Amazon TR', price: 46500, shipping: 'Ucretsiz', days: '2-3 gun', stock: 'Var', color: '#FF9900', rating: 4.8 },
    { site: 'n11', price: 47999, shipping: '29.90 TL', days: '3-5 gun', stock: 'Sinirli', color: '#6633CC', rating: 4.3 },
    { site: 'MediaMarkt', price: 49999, shipping: 'Ucretsiz', days: '2-4 gun', stock: 'Var', color: '#CC0000', rating: 4.5 },
    { site: 'Vatan', price: 50999, shipping: 'Ucretsiz', days: '1-2 gun', stock: 'Var', color: '#003DA5', rating: 4.6 },
  ],
  pros: [
    'Cok iyi kamera kalitesi',
    'Uzun pil omru',
    'Sik ve hafif tasarim',
    'Hizli islemci performansi',
    'USB-C gecisi pratik',
  ],
  cons: [
    'Yuksek fiyat',
    'Sarj adaptoru kutuda yok',
    'Depolama genisletilemiyor',
    'Isiniyor yuksek performansta',
  ],
  specs: [
    { label: 'Ekran', value: '6.1 inc Super Retina XDR' },
    { label: 'Islemci', value: 'Apple A17 Pro' },
    { label: 'RAM', value: '8 GB' },
    { label: 'Depolama', value: '128 GB' },
    { label: 'Kamera', value: '48 MP Ana + 12 MP Ultra Genis' },
    { label: 'Pil', value: '3274 mAh' },
    { label: 'Isletim Sistemi', value: 'iOS 17' },
    { label: 'Renk', value: 'Siyah Titanyum' },
  ],
  priceHistory: [42000, 45000, 48000, 51000, 49000, 46000, 44999],
  reviewSummary: 'Kullanicilar genel olarak kamera kalitesi ve performansindan cok memnun. USB-C gecisi olumlu karsilaniyor. Ana sikayet yuksek fiyat ve kutuda sarj adaptoru bulunmamasi.',
};

export default function UrunDetay() {
  const [activeTab, setActiveTab] = useState('fiyatlar');
  const [alarmPrice, setAlarmPrice] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);

  const tabs = [
    { id: 'fiyatlar', label: 'Fiyat Karsilastirma' },
    { id: 'yorumlar', label: 'Yorum Analizi' },
    { id: 'ozellikler', label: 'Teknik Ozellikler' },
    { id: 'grafik', label: 'Fiyat Gecmisi' },
  ];

  const maxPrice = Math.max(...product.priceHistory);
  const minPrice = Math.min(...product.priceHistory);
  const days = ['30g', '25g', '20g', '15g', '10g', '5g', 'Bugun'];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#F4F7F4', minHeight: '100vh', color: '#141A14' }}>

      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px', background: '#fff', borderBottom: '1px solid #DDE8DD', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 21, fontWeight: 800, textDecoration: 'none', color: '#141A14' }}>
          <span>Zep</span><span style={{ color: '#2A7A4B' }}>lin</span>
        </a>
        <div style={{ flex: 1, maxWidth: 400, margin: '0 32px', position: 'relative' }}>
          <input placeholder="Urun ara..." style={{ width: '100%', border: '1.5px solid #C8D9C8', borderRadius: 12, padding: '9px 16px', fontSize: 14, fontFamily: 'inherit', outline: 'none' }} />
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

        {/* URUN OZET KARTI */}
        <div style={{ background: '#fff', borderRadius: 20, padding: 28, marginBottom: 20, border: '1px solid #DDE8DD', display: 'flex', gap: 32, alignItems: 'flex-start' }}>

          {/* Urun Gorseli */}
          <div style={{ width: 200, height: 200, background: '#F4F7F4', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0 }}>
            {product.image}
          </div>

          {/* Urun Bilgisi */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#2A7A4B', fontWeight: 600, marginBottom: 6 }}>{product.brand}</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, lineHeight: 1.3, color: '#0D1A0D' }}>{product.name}</h1>

            {/* Puan */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ color: s <= Math.round(product.rating) ? '#F5C842' : '#DDE8DD', fontSize: 18 }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#141A14' }}>{product.rating}</span>
              <span style={{ fontSize: 13, color: '#8A9E8A' }}>{product.reviewCount.toLocaleString()} yorum</span>
            </div>

            {/* Fiyat Aralik */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: '#8A9E8A', marginBottom: 4 }}>Fiyat araligi</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#2A7A4B' }}>₺{product.lowestPrice.toLocaleString()}</span>
                <span style={{ fontSize: 16, color: '#8A9E8A', textDecoration: 'line-through' }}>₺{product.highestPrice.toLocaleString()}</span>
                <span style={{ background: '#E8F4EE', color: '#1F6B3E', fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                  %{Math.round((1 - product.lowestPrice / product.highestPrice) * 100)} tasarruf
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#8A9E8A', marginTop: 4 }}>{product.prices.length} magazada karsilastirildi</div>
            </div>

            {/* Butonlar */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button style={{ background: '#2A7A4B', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                En Ucuz: Hepsiburada →
              </button>
              <button style={{ background: '#fff', color: '#2A7A4B', border: '1.5px solid #2A7A4B', padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                🔔 Alarm Kur
              </button>
              <button style={{ background: '#fff', color: '#5A6E5A', border: '1px solid #DDE8DD', padding: '12px 20px', borderRadius: 12, fontSize: 14, cursor: 'pointer' }}>
                ♡ Favori
              </button>
            </div>
          </div>

          {/* Alarm Kutusu */}
          <div style={{ width: 220, background: '#F4F7F4', borderRadius: 16, padding: 20, border: '1px solid #DDE8DD', flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>🔔 Fiyat Alarmi</div>
            <div style={{ fontSize: 12, color: '#5A6E5A', marginBottom: 12 }}>Fiyat istedigin seviyeye dustugunde seni haberdar edelim</div>
            {!alarmSet ? (
              <>
                <input
                  value={alarmPrice}
                  onChange={(e) => setAlarmPrice(e.target.value)}
                  placeholder="Hedef fiyat (TL)"
                  style={{ width: '100%', border: '1px solid #C8D9C8', borderRadius: 10, padding: '9px 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', marginBottom: 8 }}
                />
                <button
                  onClick={() => alarmPrice && setAlarmSet(true)}
                  style={{ width: '100%', background: '#2A7A4B', color: '#fff', border: 'none', padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Alarm Kur
                </button>
              </>
            ) : (
              <div style={{ background: '#E8F4EE', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>✅</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1F6B3E', marginTop: 4 }}>Alarm Kuruldu!</div>
                <div style={{ fontSize: 12, color: '#5A6E5A' }}>₺{alarmPrice} olunca haber vericez</div>
              </div>
            )}
            <div style={{ marginTop: 12, fontSize: 11, color: '#8A9E8A', textAlign: 'center' }}>
              Tahmin: Bu hafta dusmesi bekleniyor 📉
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16, background: '#fff', padding: 6, borderRadius: 16, border: '1px solid #DDE8DD' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
                background: activeTab === tab.id ? '#2A7A4B' : 'transparent',
                color: activeTab === tab.id ? '#fff' : '#5A6E5A',
                transition: 'all 0.2s',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* FIYAT KARSILASTIRMA */}
        {activeTab === 'fiyatlar' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDE8DD', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #DDE8DD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Fiyat Karsilastirma</span>
              <span style={{ fontSize: 12, color: '#8A9E8A' }}>Son guncelleme: 5 dakika once</span>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F4F7F4' }}>
                  <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>MAGAZA</th>
                  <th style={{ padding: '12px 24px', textAlign: 'right', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>FIYAT</th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>KARGO</th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>TESLİMAT</th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>STOK</th>
                  <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: 12, color: '#8A9E8A', fontWeight: 600 }}>PUAN</th>
                  <th style={{ padding: '12px 24px' }}></th>
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
                    <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 13, color: '#5A6E5A' }}>⭐ {p.rating}</td>
                    <td style={{ padding: '16px 24px' }}>
                      <button style={{ background: i === 0 ? '#2A7A4B' : '#fff', color: i === 0 ? '#fff' : '#2A7A4B', border: '1.5px solid #2A7A4B', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        Siteye Git →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* YORUM ANALİZİ */}
        {activeTab === 'yorumlar' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>AI Yorum Ozeti</div>
              <div style={{ background: '#F4F7F4', borderRadius: 12, padding: 16, fontSize: 14, color: '#5A6E5A', lineHeight: 1.7, marginBottom: 20 }}>
                {product.reviewSummary}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 16 }}>
                {['😍', '😊', '😐', '😤', '😡'].map((emoji, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28 }}>{emoji}</div>
                    <div style={{ fontSize: 12, color: '#8A9E8A', marginTop: 4 }}>{[45, 30, 12, 8, 5][i]}%</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#F4F7F4', borderRadius: 10, height: 8, overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(to right, #2A7A4B, #F5C842, #E53E3E)', height: '100%', width: '75%', borderRadius: 10 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8A9E8A', marginTop: 4 }}>
                <span>Olumsuz</span><span>Notr</span><span>Olumlu</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#1F6B3E' }}>👍 Artilari</div>
                {product.pros.map((pro, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#E8F4EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 13, color: '#141A14' }}>{pro}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#B91C1C' }}>👎 Eksileri</div>
                {product.cons.map((con, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✕</div>
                    <span style={{ fontSize: 13, color: '#141A14' }}>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TEKNİK ÖZELLİKLER */}
        {activeTab === 'ozellikler' && (
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #DDE8DD', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #DDE8DD', fontWeight: 700, fontSize: 16 }}>Teknik Ozellikler</div>
            {product.specs.map((spec, i) => (
              <div key={i} style={{ display: 'flex', padding: '14px 24px', borderBottom: i < product.specs.length - 1 ? '1px solid #DDE8DD' : 'none', background: i % 2 === 0 ? '#fff' : '#F4F7F4' }}>
                <span style={{ width: 180, fontSize: 13, color: '#8A9E8A', fontWeight: 500 }}>{spec.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#141A14' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* FİYAT GEÇMİŞİ */}
        {activeTab === 'grafik' && (
          <div style={{ background: '#fff', borderRadius: 20, padding: 24, border: '1px solid #DDE8DD' }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20 }}>Son 30 Gun Fiyat Gecmisi</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200, padding: '0 8px' }}>
              {product.priceHistory.map((price, i) => {
                const height = ((price - minPrice) / (maxPrice - minPrice)) * 160 + 40;
                const isMin = price === minPrice;
                const isLast = i === product.priceHistory.length - 1;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 10, color: isMin ? '#1F6B3E' : isLast ? '#2A7A4B' : '#8A9E8A', fontWeight: isMin || isLast ? 700 : 400 }}>
                      ₺{(price/1000).toFixed(0)}K
                    </div>
                    <div style={{ width: '100%', height: height, background: isMin ? '#2A7A4B' : isLast ? '#4A9A6B' : '#DDE8DD', borderRadius: '6px 6px 0 0', transition: 'all 0.3s' }} />
                    <div style={{ fontSize: 10, color: '#8A9E8A' }}>{days[i]}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 16, padding: '12px 0', borderTop: '1px solid #DDE8DD' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#8A9E8A' }}>En Dusuk</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#2A7A4B' }}>₺{minPrice.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#8A9E8A' }}>En Yuksek</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#B91C1C' }}>₺{maxPrice.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#8A9E8A' }}>Ortalama</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#141A14' }}>₺{Math.round(product.priceHistory.reduce((a,b) => a+b) / product.priceHistory.length).toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

