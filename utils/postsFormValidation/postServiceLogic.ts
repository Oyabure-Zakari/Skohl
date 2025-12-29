import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import postImageUrl from "../cloudinary/postImageUrl";

type UsePostServiceParams = {
  userUid: string | null;
  jobTitleRef: React.RefObject<string>;
  servicePriceRef: React.RefObject<string>;
  serviceScheduleRef: React.RefObject<string>;
  serviceDescriptionRef: React.RefObject<string>;
  selectedServiceCategory: string;
  photo?: string;
};

const postServiceLogic = async ({
  userUid,
  jobTitleRef,
  servicePriceRef,
  serviceScheduleRef,
  serviceDescriptionRef,
  selectedServiceCategory,
  photo,
}: UsePostServiceParams) => {
  try {
    // Variables to hold user's info
    let fullName;
    let image;

    // Query user document
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    // Get user's info
    snapshot.forEach((doc) => {
      const data = doc.data();
      fullName = `${data.surname} ${data.firstname}`;
      image = data.image;
    });

    // If user has selected an image
    if (photo) {
      // Upload image to cloudinary and get URL
      const uploadedImage = await postImageUrl(photo);

      // Add document
      const docRef = await addDoc(collection(db, "services"), {
        id: "",
        jobTitle: jobTitleRef.current.trim(),
        price: `₦${servicePriceRef.current.trim()}`,
        schedule: serviceScheduleRef.current.trim(),
        description: serviceDescriptionRef.current.trim(),
        category: selectedServiceCategory.trim(),
        photo: uploadedImage,
        postType: "service",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
      });

      // Update document with its own ID
      await updateDoc(doc(db, "services", docRef.id), { id: docRef.id });
    } else {
      // Add document
      const docRef = await addDoc(collection(db, "services"), {
        id: "",
        jobTitle: jobTitleRef.current.trim(),
        price: `₦${servicePriceRef.current.trim()}`,
        schedule: serviceScheduleRef.current.trim(),
        description: serviceDescriptionRef.current.trim(),
        category: selectedServiceCategory.trim(),
        postType: "service",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
      });

      // Update document with its own ID
      await updateDoc(doc(db, "services", docRef.id), { id: docRef.id });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postServiceLogic;
