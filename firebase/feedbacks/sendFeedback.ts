import { addDoc, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import usersCollectionRef from "../collectionRef/usersCollectionRef";
import { db } from "../firebase.config";

    const submitFeedback = async (userUid: string, feedback:string, rating:number) => {
    try {
      // Get the user's full name
      let fullName;

      // A query to find the user document with the matching uid field (i.e the current user)
      const q = query(usersCollectionRef, where("uid", "==", userUid));

      // Execute the query
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        fullName = `${doc.data().surname} ${doc.data().firstname}`;
      });

      // Add a new feedback document with a generated id.
      const docRef = await addDoc(collection(db, "feedbacks"), {
        docId: "",
        feedback,
        rating,
        postedBy: {
          uid: userUid,
          fullName,
        },
        createdAt: serverTimestamp(),
      });

      // Update the newly created document with the generated id
      await updateDoc(doc(db, "feedbacks", docRef.id), {
        docId: docRef.id,
      });
    } catch (error: any) {
      throw new Error(error.message); // Rethrow the error to be caught by the useMutation hook
    }
  };

  export default submitFeedback