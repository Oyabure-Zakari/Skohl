import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

type CreateChatRoomParams = {
  roomId: string;
  currentUserId: string;
  otherUserId: string;
};

const createChatRoom = async ({ roomId, currentUserId, otherUserId }: CreateChatRoomParams) => {
  try {
    const docRef = doc(db, "chatRooms", roomId);
    const docSnap = await getDoc(docRef);

    // If the chat room already exists, do nothing
    if (docSnap.exists()) return;

    // Create the chat room
    await setDoc(docRef, {
      roomId,
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageSender: null,
      lastMessageTime: null,
      participants: [currentUserId, otherUserId].sort(),
    });
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create chat room");
  }
};

export default createChatRoom;
