
import { collection, addDoc, query, onSnapshot, deleteDoc, doc, where } from "firebase/firestore";
import { db } from "./server/server";

export const addItem = async (user, newItem) => {
    if (!user) {
      return
    }
    if (newItem.name !== '' && (newItem.quantity !== '' || newItem.quantity > 0)) {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        quantity: newItem.quantity,
        userId: user.uid, 
      });
    }
  }