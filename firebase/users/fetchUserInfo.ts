// Firebase
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { getDocs, query, where } from "firebase/firestore";

const fetchUserInfo = async (userUid: string | null) => {
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    let fetchedInfo = {
      uid: "",
      image: "",
      fullName: "",
      faculty: "",
      bio: "",
      joinedAt: { nanoseconds: 0, seconds: 0 },
    };

    snapshot.forEach((doc) => {
      const data = doc.data();
      fetchedInfo = {
        uid: data?.uid,
        image: data?.image,
        fullName: `${data?.surname} ${data?.firstname}`,
        faculty: data?.faculty,
        bio: data?.bio,
        joinedAt: {
          nanoseconds: data?.joinedAt?.nanoseconds ?? 0,
          seconds: data?.joinedAt?.seconds ?? 0,
        },
      };
    });

    return fetchedInfo;
  };

export default fetchUserInfo;