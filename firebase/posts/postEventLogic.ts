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

type UsePostEventParams = {
  userUid: string | null;
  eventTopicRef: React.RefObject<string>;
  eventVenueRef: React.RefObject<string>;
  timeRef: React.RefObject<string>;
  dateRef: React.RefObject<string>;
  eventDescriptionRef: React.RefObject<string>;
  selectedEventType: string;
  selectedEventCategory: string;
  photo?: string;
};

const postEventLogic = async ({
  userUid,
  eventTopicRef,
  eventVenueRef,
  timeRef,
  dateRef,
  eventDescriptionRef,
  selectedEventType,
  selectedEventCategory,
  photo,
}: UsePostEventParams) => {
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
        eventTopic: eventTopicRef.current.trim(),
        eventVenue: eventVenueRef.current.trim(),
        time: timeRef.current.trim(),
        date: dateRef.current.trim(),
        description: eventDescriptionRef.current.trim(),
        eventType: selectedEventType.trim(),
        eventCategory: selectedEventCategory.trim(),
        photo: uploadedImage,
        postType: "event",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
      });

      // Update document with its own ID
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    } else {
      // Add document
      const docRef = await addDoc(collection(db, "posts"), {
        id: "",
        eventTopic: eventTopicRef.current.trim(),
        eventVenue: eventVenueRef.current.trim(),
        time: timeRef.current.trim(),
        date: dateRef.current.trim(),
        description: eventDescriptionRef.current.trim(),
        eventType: selectedEventType.trim(),
        eventCategory: selectedEventCategory.trim(),
        postType: "event",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
      });

      // Update document with its own ID
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postEventLogic;
