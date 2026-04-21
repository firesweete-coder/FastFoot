import React, { useState } from 'react';
import { TEAMS } from './data';
import { useLiveNews, useAI, useReminder } from './hooks';
import { Header, TeamSelector, TeamInfo, AIPrediction, NewsSection, PredictionGame, Footer } from './ui';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('barcelona');
  const { news, breaking } = useLiveNews(selectedTeam);
  const { predict, result, loading } = useAI();
  const { remind } = useReminder();
  
  const team = TEAMS.find(t => t.id === selectedTeam);
  const otherTeam = TEAMS.find(t => t.id !== selectedTeam) || TEAMS[0];

  return (
    <div style={{ background: darkMode ? '#1a1a2e' : '#f5f5f5', minHeight: '100vh', color: darkMode ? 'white' : 'black' }}>
      <Header dark={darkMode} toggle={() => setDarkMode(!darkMode)} />
      
      <div style={{ padding: '0 15px', maxWidth: 800, margin: '0 auto' }}>
        <TeamSelector selected={selectedTeam} onChange={setSelectedTeam} />
        
        {breaking && <div style={{ background: '#dc2626', color: 'white', padding: 12, borderRadius: 10, marginBottom: 15, textAlign: 'center' }}>🚨 {breaking} 🚨</div>}
        
        {team && <TeamInfo team={team} />}
        
        <AIPrediction 
          teamA={team?.name} 
          teamB={otherTeam.name} 
          onPredict={() => predict(team?.name, otherTeam.name, team, otherTeam)} 
          result={result} 
          loading={loading} 
        />
        
        <NewsSection news={news} dark={darkMode} />
        
        <PredictionGame teamName={team?.name} dark={darkMode} />
        
        <button onClick={() => remind({ home: team?.name, away: otherTeam.name })} style={{ width: '100%', padding: 12, background: '#667eea', color: 'white', border: 'none', borderRadius: 12, cursor: 'pointer', marginBottom: 20 }}>
          🔔 تذكير بالمباراة
        </button>
        
        <Footer dark={darkMode} />
      </div>
    </div>
  );
}

export default App;
