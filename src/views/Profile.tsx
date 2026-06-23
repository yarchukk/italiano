import { useAuth } from "../lib/authContext";
import { LogOut, Trophy, Star, Settings } from "lucide-react";

export default function Profile() {
  const { dbUser, firebaseUser, signOut } = useAuth();

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto space-y-8">
      <div className="flex flex-col items-center text-center space-y-4 pt-4 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="w-24 h-24 bg-[#0057B7] rounded-[32px] flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-200 dark:shadow-none">
          {dbUser?.firstName?.charAt(0) || firebaseUser?.displayName?.charAt(0) || "U"}
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {dbUser?.firstName || firebaseUser?.displayName || "Користувач"}
          </h1>
          <p className="text-slate-400 font-bold tracking-tight text-sm uppercase mt-1">{firebaseUser?.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-2 border-slate-50 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
          <Trophy className="w-8 h-8 text-amber-500" />
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{dbUser?.streak || 0}</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Днів підряд</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border-[3px] border-[#FFD700] flex flex-col items-center justify-center text-center space-y-2 shadow-sm">
          <Star className="w-8 h-8 text-[#0057B7]" fill="#0057B7" />
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{dbUser?.xp || 0}</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Очки XP</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-8">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Налаштування</h3>
        <div className="bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-50 dark:border-slate-700 overflow-hidden divide-y divide-slate-50 dark:divide-slate-700 shadow-sm">
          <button className="w-full flex items-center gap-3 p-5 text-left active:bg-slate-50 dark:active:bg-slate-700/50 transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-sm text-slate-800 dark:text-slate-200">Налаштування</span>
          </button>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-3 p-5 text-left active:bg-red-50 dark:active:bg-red-900/10 transition-colors text-red-600 dark:text-red-500"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold text-sm">Вийти з акаунта</span>
          </button>
        </div>
      </div>
    </div>
  );
}
