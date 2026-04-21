import { useState, useEffect, useCallback } from 'react';
import { TEAMS } from './data';
import { fetchNews, getAIPrediction, generateImage } from './ai';

export const useLiveNews = (teamId) => {
  const [news, setNews] = useState([]);
  const [breaking, setBreaking] = useState(null);
  
  useEffect(() => {
    const load = async () => {
      const team = TEAMS.find(t => t.id === teamId);
      if (team) {
        const articles = await fetchNews(team.name);
        setNews(articles);
        if (articles[0]?.title.includes('عاجل')) {
          setBreaking(articles[0].title);
          setTimeout(() => setBreaking(null), 5000);
        }
      }
    };
    load();
    const interval = setInterval(load, 60000);
    return () => clearInterval(interval);
  }, [teamId]);
  
  return { news, breaking };
};

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const predict = useCallback(async (teamA, teamB, dataA, dataB) => {
    setLoading(true);
    const prediction = await getAIPrediction(teamA, teamB, dataA, dataB);
    setResult(prediction);
    setLoading(false);
    return prediction;
  }, []);
  
  return { predict, loading, result };
};

export const useImageGen = () => {
  const [generating, setGenerating] = useState(false);
  const [image, setImage] = useState(null);
  
  const generate = useCallback(async (teamName, color) => {
    setGenerating(true);
    const img = await generateImage(teamName, color);
    setImage(img);
    setGenerating(false);
    return img;
  }, []);
  
  return { generate, generating, image };
};

export const useReminder = () => {
  const [permission, setPermission] = useState(Notification.permission);
  
  const remind = useCallback(async (match) => {
    if (permission !== 'granted') {
      const p = await Notification.requestPermission();
      setPermission(p);
    }
    if (permission === 'granted') {
      new Notification('🔔 تذكير المباراة', { body: `${match.home} 🆚 ${match.away}` });
    }
  }, [permission]);
  
  return { remind };
};
