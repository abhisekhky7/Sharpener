import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import db from '../firebase/firebase';

const savetoDb = async (name, data) => {
    try {
      const docRef = await addDoc(collection(db, name), data); 
      console.log(`${name} added successfully!`, docRef);
      return { success: true, docRef }; 
    } catch (err) {
      console.error('Error adding document:', err);
      return { success: false, error: err }; 
    }
  };



const deleteFromDb = async (name,id)=>{
    try{
        const docRef = doc(db,name,id);
        await deleteDoc(docRef);
    }catch(err){
        console.log(err)
    }
}




export {savetoDb,deleteFromDb};