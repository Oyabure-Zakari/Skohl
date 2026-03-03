import { collection } from "firebase/firestore";
import { db } from "../firebase.config";

const chatRoomsCollectionRef = collection(db, "chatRooms");

export default chatRoomsCollectionRef;
