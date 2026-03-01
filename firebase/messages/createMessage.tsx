import { db } from "@/firebase/firebase.config";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { IMessage } from "react-native-gifted-chat";

type SendMessageParams = {
  roomId: string;
  messageInfo: IMessage;
  userImage?: string;
};

const sendMessage = async ({ roomId, messageInfo, userImage }: SendMessageParams) => {
  try {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");

    const docRef = await addDoc(messagesRef, {
      message: messageInfo.text,
      senderUid: messageInfo?.user?._id,
      senderAvatar: messageInfo?.user?.avatar || userImage,
      // Use JS Date so onSnapshot can immediately read it before server resolves
      createdAt: messageInfo?.createdAt ?? new Date(),
    });

    // Write back the auto-generated doc id into the document itself
    await updateDoc(docRef, { id: docRef.id });

    // Update chat room's last message preview
    await updateDoc(doc(db, "chatRooms", roomId), {
      lastMessage: messageInfo.text,
      lastMessageSender: messageInfo?.user?._id,
      lastMessageTime: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default sendMessage;
