import { ReactNode, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthProvider, useAuth } from "./lib/authContext";
import { BottomNav } from "./components/BottomNav";

// Lazy load route components
const Home = lazy(() => import("./views/Home"));
const Vocabulary = lazy(() => import("./views/Vocabulary"));
const Phrases = lazy(() => import("./views/Phrases"));
const Profile = lazy(() => import("./views/Profile"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
  </div>
);

// Компонент для захищених маршрутів
function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Вітаємо в Italiano! 🇮🇹</h1>
          <p className="text-slate-600">
            Будь ласка, відкрийте цей застосунок через Telegram бота, щоб почати навчання.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 pb-20">
          <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-slate-900 shadow-lg">
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  </Suspense>
                }
              />
              <Route
                path="/vocabulary"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <PrivateRoute>
                      <Vocabulary />
                    </PrivateRoute>
                  </Suspense>
                }
              />
              <Route
                path="/phrases"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <PrivateRoute>
                      <Phrases />
                    </PrivateRoute>
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  </Suspense>
                }
              />
              {/* Перенаправлення на головну, якщо маршрут не знайдено */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          
          {/* Нижня навігація завжди доступна для авторизованих */}
          <BottomNav />
        </div>
      </Router>
    </AuthProvider>
  );
}