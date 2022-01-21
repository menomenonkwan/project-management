import { useEffect, useReducer, useState } from "react"
import { db } from "../firebase/config";

// firebase imports
import { addDoc, collection, deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null }
    case 'ADD_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETE_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATE_DOCUMENT':
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
  
  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    const documentRef = doc(db, collectionName, id);
    
    try {
      await deleteDoc(documentRef);
      dispatchIfNotCancelled({ type: 'DELETE_DOCUMENT' });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }
  
  // const updateDocument = async (id, isComplete = false) => {
  //   dispatch({ type: 'IS_PENDING' });
  //   const documentRef = doc(db, collectionName, id);

  //   try {
  //     const updatedDocument = await updateDoc(documentRef, {
  //       complete: !isComplete
  //     });
  //     dispatchIfNotCancelled({ type: 'UPDATE_DOCUMENT', payload: updatedDocument });
  //     return updatedDocument;

  //   } catch (err) {
  //     dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
  //   }

  // }
  const updateDocument = async (id, update) => {
    dispatch({ type: 'IS_PENDING' });
    const documentRef = doc(db, collectionName, id);

    try {
      const updatedDocument = await updateDoc(documentRef, update);
      dispatchIfNotCancelled({ type: 'UPDATE_DOCUMENT', payload: updatedDocument });
      return updatedDocument;

    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }

  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response }
}