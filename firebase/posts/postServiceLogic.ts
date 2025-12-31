import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
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

type PostServiceParams = {
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
}: PostServiceParams) => {
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
      const docRef = await addDoc(collection(db, "posts"), {
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

      // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    } else {
      // Add document
      const docRef = await addDoc(collection(db, "posts"), {
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

      // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postServiceLogic;
