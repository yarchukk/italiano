import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/authContext";
import { BottomNav } from "./components/BottomNav";
import Home from "./views/Home";
import Phrases from "./views/Phrases";
import Vocabulary from "./views/Vocabulary";
import Profile from "./views/Profile";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { firebaseUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!firebaseUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function Login() {
  const { signIn, firebaseUser } = useAuth();
  
  if (firebaseUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-sm text-center space-y-8">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto rounded-[32px] bg-[#0057B7] flex items-center justify-center shadow-xl shadow-blue-200 dark:shadow-none">
            <span className="text-4xl text-white">🇮🇹</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Italiano per Ucraini
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold">
            Вивчайте італійську для реального життя в Італії
          </p>
        </div>
        
        <button
          onClick={signIn}
          className="w-full bg-[#0057B7] text-[#FFD700] font-black py-4 rounded-[24px] text-base flex items-center justify-center gap-3 shadow-lg shadow-blue-100 dark:shadow-none active:scale-95 transition-transform"
        >
          Увійти через Google
        </button>
      </div>
    </div>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <main className="flex-1 w-full max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen shadow-xl pb-20 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout><Home /></Layout></PrivateRoute>} />
          <Route path="/phrases" element={<PrivateRoute><Layout><Phrases /></Layout></PrivateRoute>} />
          <Route path="/vocabulary" element={<PrivateRoute><Layout><Vocabulary /></Layout></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
