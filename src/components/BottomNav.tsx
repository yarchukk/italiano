import { Link, useLocation } from "react-router-dom";
import { Home, Book, Layers, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { name: "Головна", path: "/", icon: Home },
    { name: "Фрази", path: "/phrases", icon: Layers },
    { name: "Слова", path: "/vocabulary", icon: Book },
    { name: "Профіль", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-start pt-4 h-20 max-w-md mx-auto px-2">
        {links.map((link) => {
          const active = currentPath === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1.5 transition-colors ${
                active ? "text-[#0057B7] dark:text-[#3b82f6] opacity-100" : "text-slate-400 dark:text-slate-500 opacity-50"
              }`}
            >
              <link.icon strokeWidth={active ? 3 : 2} className="w-6 h-6" />
              <span className={`text-[9px] font-black uppercase tracking-widest`}>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
