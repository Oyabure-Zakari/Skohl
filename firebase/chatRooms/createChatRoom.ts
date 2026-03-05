import OtherUserType from "@/types/OtherUser";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

type CreateChatRoomParams = {
  roomId: string;
  userUid: string;
  otherUser: OtherUserType;
};

const createChatRoom = async ({ roomId, userUid, otherUser }: CreateChatRoomParams) => {
  try {
    const docRef = doc(db, "chatRooms", roomId);
    const docSnap = await getDoc(docRef);

    // If the chat room already exists, do nothing
    if (docSnap.exists()) return;

    // Create the chat room
    await setDoc(docRef, {
      roomId,
      otherUser,
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageSender: null,
      lastMessageTime: null,
      participants: [userUid, otherUser?.userUid].sort(),
    });
  } catch (error: any) {
    throw new Error(error?.message || "Failed to create chat room");
  }
};

export default createChatRoom;
