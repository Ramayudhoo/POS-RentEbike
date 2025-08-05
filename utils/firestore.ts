// src/utils/firestore.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface Package {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const getPackages = async (): Promise<Package[]> => {
  const packagesCollection = collection(db, 'packages');
  const packageSnapshot = await getDocs(packagesCollection);
  const packageList = packageSnapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
    price: doc.data().price,
    imageUrl: doc.data().imageUrl
  }));
  return packageList;
};
