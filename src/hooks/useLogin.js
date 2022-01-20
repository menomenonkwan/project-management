import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

// firebase imports 
import { auth, db } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      // login user
      const response = await signInWithEmailAndPassword(auth, email, password);

      // update user online status
      const userRef = doc(db, 'users', response.user.uid);
      updateDoc(userRef, {
        online: true
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user });

      // update state
      if (!isCancelled) {
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      if(!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, loading, error };
}