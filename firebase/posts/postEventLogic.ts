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

type PostEventParams = {
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
}: PostEventParams) => {
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
      // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
      const uploadedImage = await postImageUrl(photo);

      // Add document
      const docRef = await addDoc(collection(db, "posts"), {
        id: "",
        photo: uploadedImage,
        title: eventTopicRef.current.trim(),
        description: eventDescriptionRef.current.trim(),
        category: selectedEventCategory.trim(),
        postType: "event",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
        eventVenue: eventVenueRef.current.trim(),
        eventTime: timeRef.current.trim(),
        eventDate: dateRef.current.trim(),
        eventType: selectedEventType.trim(),
      });

      // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    } else {
      // Add document
      const docRef = await addDoc(collection(db, "posts"), {
        id: "",
        photo: "",
        title: eventTopicRef.current.trim(),
        description: eventDescriptionRef.current.trim(),
        category: selectedEventCategory.trim(),
        postType: "event",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
        eventVenue: eventVenueRef.current.trim(),
        eventTime: timeRef.current.trim(),
        eventDate: dateRef.current.trim(),
        eventType: selectedEventType.trim(),
      });

      // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
      await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postEventLogic;
