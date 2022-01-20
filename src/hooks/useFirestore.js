import { useEffect, useReducer, useState } from "react"
import { db } from "../firebase/config";

// firebase imports
import { addDoc, collection, Timestamp } from "firebase/firestore";

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADD_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state;
  }
}
export const useFirestore = (collectionName) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, {
    isPending: false,
    document: null,
    success: false,
    error: null
  });

  // collection reference
  const collectionRef = collection(db, collectionName);
  // console.log(collectionName)
  // only call dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) { dispatch(action) }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(collectionRef, { ...doc, createdAt });
    
      dispatchIfNotCancelled({ type: 'ADD_DOCUMENT', payload: addedDocument });

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  const deleteDocument = async () => {

  }

  const updateDocument = async () => {

  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response }
}