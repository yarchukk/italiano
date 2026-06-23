import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Додаємо типізацію для об'єкта Telegram (щоб TypeScript не сварився)
declare global {
  interface Window {
    Telegram?: any;
  }
}

interface AuthContextType {
  user: any | null;
  loading: boolean;
  initData: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  initData: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [initData, setInitData] = useState<string | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    if (tg) {
      tg.ready(); // Повідомляємо Telegram, що апка готова
      
      const tgUser = tg.initDataUnsafe?.user;
      const rawInitData = tg.initData;
      
      if (tgUser && rawInitData) {
        setUser(tgUser);
        setInitData(rawInitData);
        
        // Синхронізуємо користувача з твоїм бекендом
        fetch('/api/auth/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${rawInitData}` // Передаємо initData на бекенд
          }
        }).catch(err => console.error("Помилка синхронізації:", err));
      }
    }
    
    setLoading(false);
  }, []);
    const getToken = () => {
  return initData; // Повертаємо raw initData як токен
};
  return (
    <AuthContext.Provider value={{ user, loading, initData, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);