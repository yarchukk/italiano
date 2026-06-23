import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";

interface AppUser {
  uid: string;
  email: string | null;
  firstName: string | null;
  username: string | null;
  xp: number;
  streak: number;
}

interface AuthContextType {
  firebaseUser: User | null;
  dbUser: AppUser | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDbUser = async (user: User) => {
    try {
      const token = await user.getIdToken();
      
      const res = await fetch("/api/auth/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setDbUser(data.user);
      }
    } catch (e) {
      console.error("Failed to sync user", e);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await fetchDbUser(user);
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const getToken = async () => {
    if (firebaseUser) {
      return await firebaseUser.getIdToken();
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ firebaseUser, dbUser, loading, signIn, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
