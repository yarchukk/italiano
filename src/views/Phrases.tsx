import { useEffect, useState } from "react";
import { useAuth } from "../lib/authContext";
import { Loader2, PlayCircle, Heart } from "lucide-react";

interface Phrase {
  id: number;
  category: string;
  italian: string;
  ukrainian: string;
  pronunciation: string;
}

export default function Phrases() {
  const { getToken } = useAuth();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = await getToken();
      if (!token) return;
      try {
        const res = await fetch("/api/phrases", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setPhrases(data.items || []);
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

  // Group by category
  const grouped = phrases.reduce((acc, phrase) => {
    if (!acc[phrase.category]) acc[phrase.category] = [];
    acc[phrase.category].push(phrase);
    return acc;
  }, {} as Record<string, Phrase[]>);

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto space-y-8">
      <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Практичні фрази</h1>
        <p className="text-slate-500 font-bold text-sm">Найважливіші фрази для життя в Італії</p>
      </div>

      <div className="space-y-8">
        {(Object.entries(grouped) as [string, Phrase[]][]).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
              {category}
            </h2>
            <div className="space-y-4">
              {items.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-800 border-[3px] border-[#FFD700] rounded-3xl p-5 relative shadow-md flex justify-between items-start">
                  <div className="space-y-1 pr-4">
                    <p className="text-[15px] font-black text-slate-800 dark:text-white leading-tight">{p.italian}</p>
                    <p className="text-[11px] text-[#0057B7] dark:text-[#3b82f6] font-bold mb-1 mt-1">{p.ukrainian}</p>
                    <p className="text-[10px] text-slate-400 italic mt-2">[{p.pronunciation}]</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm transition-transform active:scale-95">
                      🔊
                    </button>
                    <button className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm transition-transform active:scale-95">
                      ⭐
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
