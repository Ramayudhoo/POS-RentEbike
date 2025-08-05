import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

interface RegisterUserProps {
  email: string;
  password: string;
  role: string;
}

interface LoginUserResponse {
  user: User;
  role: string;
}

export const registerUser = async ({ email, password, role }: RegisterUserProps): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Simpan peran pengguna di Firestore
    await setDoc(doc(db, "users", user.uid), {
      role: role
    });
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<LoginUserResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Ambil peran pengguna dari Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const role = docSnap.data().role;
      return { user, role };
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
