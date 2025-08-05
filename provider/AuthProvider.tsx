import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useRouter } from 'expo-router';

interface AuthContextProps {
  user: User | null;
  role: string | null;
  email: string | null;
  profileName: string | null;
  profileImageUrl: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
  email: null,
  profileName: null,
  profileImageUrl: null,
  loading: true,
  signOut: () => Promise.resolve(),
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      setUser(null);
      setRole(null);
      setEmail(null);
      setProfileName(null);
      setProfileImageUrl(null);
      console.log('User berhasil logout');
    } catch (error) {
      console.error('Gagal logout', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role);
          setEmail(user.email);
          setProfileName(userData.name);
          setProfileImageUrl(userData.profileImageUrl);
        } else {
          setRole(null);
          setEmail(null);
          setProfileName(null);
          setProfileImageUrl(null);
        }
      } else {
        setRole(null);
        setEmail(null);
        setProfileName(null);
        setProfileImageUrl(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User:", user);
    console.log("Role:", role);
    console.log("Loading:", loading);
    
    if (!loading) {
      if (user && role === 'admin') {
        router.push('/admin/tickets');
      } else if (user && role === 'user') {
        router.push('/(screens)/Home/HomeScreen');
      } else {
        router.push('/(auth)/Login');
      }
    }
  }, [user, role, loading]);

  return (
    <AuthContext.Provider value={{ user, role, email, profileName, profileImageUrl, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;