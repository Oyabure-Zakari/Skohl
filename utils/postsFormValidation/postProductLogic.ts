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

type UsePostProductParams = {
  userUid: string | null;
  photo: string;
  productNameRef: React.RefObject<string>;
  productPriceRef: React.RefObject<string>;
  productDescriptionRef: React.RefObject<string>;
  selectedProductCategory: string;
};

const postProductLogic = async ({
  userUid,
  photo,
  productNameRef,
  productPriceRef,
  productDescriptionRef,
  selectedProductCategory,
}: UsePostProductParams) => {
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

    // Upload image to cloudinary and get URL
    const uploadedImage = await postImageUrl(photo);

    // Add document
    const docRef = await addDoc(collection(db, "products"), {
      id: "",
      name: productNameRef.current.trim(),
      price: `₦${productPriceRef.current.trim()}`,
      description: productDescriptionRef.current.trim(),
      category: selectedProductCategory.trim(),
      photo: uploadedImage,
      postType: "product",
      postedBy: { userUid, fullName, image },
      createdAt: serverTimestamp(),
    });

    // Update document with its own ID
    await updateDoc(doc(db, "products", docRef.id), { id: docRef.id });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postProductLogic;
