import { useAuth } from "../lib/authContext";
import { Link } from "react-router-dom";
import { Sparkles, Trophy, BookOpen, MessageCircle } from "lucide-react";

export default function Home() {
  const { dbUser, firebaseUser } = useAuth();
  const initial = dbUser?.firstName?.charAt(0) || firebaseUser?.displayName?.charAt(0) || "U";
  
  return (
    <div className="p-6 space-y-6 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#0057B7] flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100 dark:shadow-none">
            {initial}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Привіт!</p>
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              {dbUser?.firstName || firebaseUser?.displayName || "Друже"}
            </h1>
          </div>
        </div>
        <div className="bg-[#FFD700] px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-yellow-400 text-slate-900">
          <span className="text-sm">🔥</span>
          <span className="text-[13px] font-black">{dbUser?.streak || 0}</span>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-[#0057B7] rounded-[32px] p-6 text-white shadow-xl shadow-blue-200 dark:shadow-none relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
        <p className="text-[11px] opacity-70 mb-1 font-bold uppercase tracking-tight">Мій прогрес</p>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-4xl font-black">{dbUser?.xp || 0} <span className="text-lg text-blue-200">XP</span></h2>
          <span className="text-xs font-bold bg-blue-500/30 px-2 py-1 rounded-lg">Рівень {Math.floor((dbUser?.xp || 0) / 1000) + 1}</span>
        </div>
        <div className="w-full h-2.5 bg-blue-900/40 rounded-full mb-1 overflow-hidden">
          <div 
            className="h-full bg-[#FFD700] rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]" 
            style={{ width: `${Math.min(100, Math.max(5, ((dbUser?.xp || 0) % 1000) / 10))}%` }}
          ></div>
        </div>
        <p className="text-[10px] font-bold text-blue-100">До наступного рівня: {1000 - ((dbUser?.xp || 0) % 1000)} XP</p>
      </div>

      {/* Phrase of the Day */}
      <div className="bg-white dark:bg-slate-800 border-[3px] border-[#FFD700] rounded-3xl p-5 relative shadow-md">
        <div className="absolute -top-3 left-4 bg-[#FFD700] text-slate-900 text-[9px] px-3 py-1 rounded-full font-black uppercase shadow-sm">
          Фраза дня
        </div>
        <p className="text-[11px] text-slate-400 font-bold mb-1 mt-1">"Come si chiama?"</p>
        <p className="text-[15px] font-black text-slate-800 dark:text-white leading-tight">"Як вас звати?"</p>
        <div className="mt-3 flex gap-2">
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm">🔊</div>
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-sm">⭐</div>
        </div>
      </div>

      {/* Quick Access */}
      <div>
        <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-widest px-1">Вивчити зараз</h3>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/phrases" className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border-2 border-slate-50 dark:border-slate-700 flex flex-col justify-between items-start gap-4 h-28 transform active:scale-[0.98] transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-black text-slate-800 dark:text-white">Фрази</span>
          </Link>
          <Link to="/vocabulary" className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border-2 border-slate-50 dark:border-slate-700 flex flex-col justify-between items-start gap-4 h-28 transform active:scale-[0.98] transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-sm font-black text-slate-800 dark:text-white">Словник</span>
          </Link>
        </div>
      </div>
      
      {/* Continue Learning Button */}
      <div className="pt-2">
        <Link to="/phrases" className="w-full bg-[#0057B7] text-[#FFD700] font-black py-4 rounded-[24px] text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-100 dark:shadow-none active:scale-95 transition-transform">
          🚀 Продовжити вчитися
        </Link>
      </div>
    </div>
  );
}
