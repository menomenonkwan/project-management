import { useEffect, useRef, useState } from "react";

// firebase imports
import { db } from '../firebase/config';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export const useCollection = (collectionName, _orderBy, _query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // const orderBy = useRef(_orderBy).current;
  // const query = useRef(_query).current;

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    // const orderedCollection = query(collectionRef, orderBy('dueDate'));

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      });
      
      setDocuments(results);
      setError(null);
    }, err => {
      setError(err.message);
    })

    return () => unsubscribe();
  }, [collectionName]);
  
  return { documents, error };
};
