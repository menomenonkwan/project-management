import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';

// firebase imports
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { user, dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setLoading(true);

    // update user online status
    const userRef = doc(db, 'users', user.uid);
    updateDoc(userRef, {
      online: false
    });

    // logout user
    await signOut(auth).then(() => {
      dispatch({ type: 'LOGOUT' })

      if (!isCancelled) {
        setError(null);
        setLoading(false);
      }
    }).catch(err => {
      if(!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, loading, error }
}