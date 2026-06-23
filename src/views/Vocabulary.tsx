import { useEffect, useState } from "react";
import { useAuth } from "../lib/authContext";
import { Loader2, ArrowRight } from "lucide-react";

interface Vocab {
  id: number;
  category: string;
  italian: string;
  ukrainian: string;
  pronunciation: string;
}

export default function Vocabulary() {
  const { getToken } = useAuth();
  const [words, setWords] = useState<Vocab[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    async function load() {
      const token = await getToken();
      if (!token) return;
      try {
        const res = await fetch("/api/vocabulary", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setWords(data.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [getToken]);

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>;
  }

  if (words.length === 0) {
    return <div className="p-6 text-center text-slate-500">Немає слів</div>;
  }

  const currentWord = words[currentIndex];

  const nextWord = () => {
    setShowTranslation(false);
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  return (
    <div className="p-6 pb-24 h-full flex flex-col items-center justify-center space-y-8">
      
      <div className="w-full max-w-sm text-center mb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Словник</h1>
        <div className="inline-block bg-[#FFD700] px-4 py-1.5 rounded-full border border-yellow-400 text-slate-900">
          <span className="text-[13px] font-black">Картка {currentIndex + 1} з {words.length}</span>
        </div>
      </div>

      <div 
        onClick={() => setShowTranslation(!showTranslation)}
        className="w-full max-w-sm aspect-square bg-[#0057B7] rounded-[32px] shadow-xl shadow-blue-200 dark:shadow-none relative overflow-hidden flex items-center justify-center flex-col p-8 text-center cursor-pointer active:scale-95 transition-transform"
      >
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white opacity-5 rounded-full"></div>
        {!showTranslation ? (
          <>
            <p className="text-4xl font-black text-white mb-4 z-10 drop-shadow-md">{currentWord.italian}</p>
            <p className="text-[11px] font-bold uppercase tracking-tight text-blue-200 z-10">Натисніть щоб перекласти</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-black text-[#FFD700] mb-3 z-10 drop-shadow-sm">{currentWord.ukrainian}</p>
            <p className="text-sm font-bold text-blue-100 z-10">[{currentWord.pronunciation}]</p>
          </>
        )}
      </div>

      <button 
        onClick={nextWord}
        className="w-full max-w-xs bg-white border-[3px] border-[#FFD700] text-slate-900 font-black py-4 rounded-[24px] text-base flex items-center justify-center gap-3 shadow-md active:scale-95 transition-transform"
      >
        Наступне <ArrowRight className="w-5 h-5" />
      </button>

    </div>
  );
}
