import { useEffect, useState } from "react"
import { auth, storage, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// firebase imports
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, profileImage) => {
    setError(null);
    setLoading(true);

    try {
      // signup new user
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (!response) { throw new Error('Could not complete signup, sorry buddy')};

      // add image to storage
      const storageImageRef = ref(storage, `profileImages/${response.user.uid}/${profileImage.name}`);
      const uploadTask = await uploadBytes(storageImageRef, profileImage);
      const imgURL = await getDownloadURL(uploadTask.ref);

      // add displayname and image to user profile
      await updateProfile(response.user, {
        displayName,
        photoURL: imgURL
      })

      // create user document
      const userRef = doc(db, 'users', response.user.uid);
      setDoc(userRef, {
        online: true,
        displayName,
        photoURL: imgURL
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user });


      // update state
      if (!isCancelled) {
        setError(null);
        setLoading(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, loading, error } 
}