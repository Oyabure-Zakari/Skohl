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

type PostProductParams = {
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
}: PostProductParams) => {
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
    const docRef = await addDoc(collection(db, "posts"), {
      id: "",
      photo: uploadedImage,
      title: productNameRef.current.trim(),
      price: `₦${productPriceRef.current.trim()}`,
      description: productDescriptionRef.current.trim(),
      category: selectedProductCategory.trim(),
      postType: "product",
      postedBy: { userUid, fullName, image },
      createdAt: serverTimestamp(),
    });

    // Stores the Firestore-generated ID inside the document itself to make CRUD operations easier, since Firestore operations rely on the generated ID(i.e document ID = docRef.id).
    await updateDoc(doc(db, "posts", docRef.id), { id: docRef.id });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default postProductLogic;
