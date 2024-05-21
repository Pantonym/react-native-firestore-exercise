// Add all Firestore functionality
import { addDoc, collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../firebase"

// TODO: Create new list item function
export const createNewBucketItem = async (items) => {

    try {

        // docRef - our reference to our newly created document (brand new with a self-generated ID)
        const docRef = await addDoc(collection(db, "items"), items);

        console.log("Document written with ID: ", docRef.id);

        return true //be a bit more specific on why it was successful/failed

    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }

}

// TODO: Get all list items function
export const getMyBucketList = async () => {

    var allItems = [] // array that we want to return

    // making a custom query to add an order by or limit to the data that is collected - check documentation
    // var q1 = query(collection(db, "items"), orderBy('priority', 'desc'), where("priority", "==", false))
    var q1 = query(collection(db, "items"), orderBy('priority', 'desc'))

    // getDocs - get all the docs in our collection (with an optional where that you can add)
    const querySnapshot = await getDocs(q1);

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data())

        // can't just use querySnapshot as the array of items - need to access the .data
        allItems.push({ ...doc.data(), id: doc.id }) //push each doc's data to the array i want to return
    });

    return allItems

}

{/* (use setDoc) Don't auto generate userID's because you want to link it to the User Authentication. You want to get the userUID and use that instead of the id */}