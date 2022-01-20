import { useEffect, useState } from "react"
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const documentRef = doc(db, collectionName, id);

    const unsubscribe = onSnapshot(documentRef, (doc) => {
      if (doc.data()) {
        setDocument({ ...doc.data(), id });
        setError(null);
      } else {
        setError('Document does not exist');
      }
    });

    return () => unsubscribe();
  }, [collectionName, id]);

  return { document, error }
}