import React, { useState } from 'react';
import { TEAMS } from './data';

// هيدر
export const Header = ({ dark, toggle }) => (
  <header style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: 'linear-gradient(135deg,#667eea,#764ba2)', color: 'white' }}>
    <div><span style={{ fontSize: '2rem' }}>🧠⚽</span><h1 style={{ display: 'inline' }}>ذكي</h1></div>
    <button onClick={toggle} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 40, cursor: 'pointer' }}>{dark ? '☀️' : '🌙'}</button>
  </header>
);

// اختيار الفرق
export const TeamSelector = ({ selected, onChange }) => (
  <select value={selected} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: 12, margin: '15px 0', borderRadius: 12, border: '2px solid #667eea' }}>
    {TEAMS.map(t => <option key={t.id} value={t.id}>{t.logo} {t.name}</option>)}
  </select>
);

// معلومات الفريق
export const TeamInfo = ({ team }) => (
  <div style={{ background: '#f0f2f5', borderRadius: 16, padding: 15, marginBottom: 15 }}>
    <h2>{team.logo} {team.name}</h2>
    <p>{team.stadium} | مدرب: {team.coach}</p>
    <div>⭐ {team.stars.join(' · ')}</div>
  </div>
);

// توقع ذكي
export const AIPrediction = ({ teamA, teamB, onPredict, result, loading }) => (
  <div style={{ background: '#f0f2f5', borderRadius: 16, padding: 15, marginBottom: 15 }}>
    <button onClick={() => onPredict(teamA, teamB)} disabled={loading} style={{ width: '100%', padding: 12, background: loading ? '#94a3b8' : '#667eea', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer' }}>
      {loading ? '🔄 جاري التحليل...' : '🧠 توقع بالذكاء الاصطناعي'}
    </button>
    {result && (
      <div style={{ marginTop: 15, padding: 12, background: 'white', borderRadius: 10 }}>
        <div>🎯 النتيجة المتوقعة: {result.score}</div>
        <div>🏆 الفائز: {result.winner}</div>
        <div>📈 الثقة: {result.confidence}%</div>
        <div style={{ fontSize: 12, marginTop: 8 }}>{result.analysis}</div>
      </div>
    )}
  </div>
);

// الأخبار
export const NewsSection = ({ news, dark }) => (
  <div style={{ background: dark ? '#0f3460' : 'white', borderRadius: 16, padding: 15, marginBottom: 15 }}>
    <h3>📰 آخر الأخبار</h3>
    {news.map((item, i) => (
      <div key={i} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
        <div style={{ fontSize: 12 }}>{item.summary}</div>
        <a href={item.link} style={{ color: '#667eea', fontSize: 11 }}>المصدر: {item.source}</a>
      </div>
    ))}
  </div>
);

// تحدي التوقعات
export const PredictionGame = ({ teamName, dark }) => {
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('predictions') || '[]'));
  
  const save = () => {
    if (!home || !away) return;
    const newPred = { id: Date.now(), score: `${home}-${away}`, points: 10, date: new Date() };
    const updated = [newPred, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem('predictions', JSON.stringify(updated));
    setHome(''); setAway('');
  };
  
  const total = history.reduce((s, p) => s + p.points, 0);
  
  return (
    <div style={{ background: dark ? '#0f3460' : 'white', borderRadius: 16, padding: 15, marginBottom: 15 }}>
      <h4>🎯 تحدي التوقع - {teamName}</h4>
      <div style={{ display: 'flex', gap: 10 }}>
        <input type="number" placeholder="هدف أ" value={home} onChange={e => setHome(e.target.value)} style={{ padding: 8, borderRadius: 8, width: 70 }} />
        <span>-</span>
        <input type="number" placeholder="هدف ب" value={away} onChange={e => setAway(e.target.value)} style={{ padding: 8, borderRadius: 8, width: 70 }} />
        <button onClick={save} style={{ padding: '8px 16px', background: '#667eea', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>حفظ</button>
      </div>
      <div style={{ marginTop: 10 }}>🏆 نقاطك: {total}</div>
      {history.length > 0 && <div style={{ fontSize: 12, marginTop: 5 }}>آخر توقع: {history[0].score}</div>}
    </div>
  );
};

// فوتر قانوني
export const Footer = ({ dark }) => (
  <footer style={{ textAlign: 'center', padding: 20, fontSize: 12, background: dark ? '#0f3460' : '#e0e7ff', marginTop: 20 }}>
    🧠 ذكي | أخبار كرة القدم - تطبيق قانوني مجاني
    <br />
    <span style={{ fontSize: 10 }}>مدعوم بـ DeepSeek AI • جميع الحقوق محفوظة</span>
  </footer>
);
