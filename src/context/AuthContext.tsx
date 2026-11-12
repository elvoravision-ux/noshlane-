import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<void>;
  registerInitialAdmin: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const OWNER_EMAIL = 'elvoravision@gmail.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check admin authority
        let hasAdminRights = currentUser.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
        if (!hasAdminRights) {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            if (adminDoc.exists()) {
              hasAdminRights = true;
            }
          } catch {
            // fallback
          }
        }
        setIsAdmin(hasAdminRights);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const isOwner = cred.user.email?.toLowerCase() === OWNER_EMAIL.toLowerCase();
      // Ensure admin document exists for owner
      if (isOwner) {
        try {
          await setDoc(doc(db, 'admins', cred.user.uid), {
            email: cred.user.email,
            role: 'owner',
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        } catch {
          // Rule may permit after auth
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      let msg = err.message || 'Failed to login';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please try again later.';
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const registerInitialAdmin = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      // Create admin document
      try {
        await setDoc(doc(db, 'admins', cred.user.uid), {
          email: cred.user.email,
          role: 'owner',
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('Admin record set error:', e);
      }
      setIsAdmin(true);
    } catch (err: any) {
      console.error('Registration error:', err);
      let msg = err.message || 'Failed to register admin';
      if (err.code === 'auth/email-already-in-use') {
        msg = 'Account already exists. Please log in with this email and password.';
      }
      setAuthError(msg);
      throw new Error(msg);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAdmin(false);
  };

  const clearError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        registerInitialAdmin,
        logout,
        authError,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
