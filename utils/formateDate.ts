import { Timestamp } from "firebase/firestore";

const formatDate = (user: any): string => {
  // Turns the Firestore timestamp into  to JavaScript Date e.g Joined January 2025
  const firestoreTimestamp = {
    seconds: user?.joinedAt?.seconds, // seconds should always come first
    nanoseconds: user?.joinedAt?.nanoseconds,
  };

  // Format date
  const date = new Timestamp(firestoreTimestamp.seconds, firestoreTimestamp.nanoseconds).toDate();
  const year = date?.getFullYear();
  const month = date?.toLocaleString("default", { month: "long" });

  return `${month}, ${year}`;
};

export default formatDate;
