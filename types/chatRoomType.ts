import { FieldValue } from "firebase/firestore";
import OtherUserType from "./OtherUser";

type ChatRoomsType = {
  roomId: string;
  createdAt: FieldValue;
  lastMessage: null | string;
  lastMessageSender: null | string;
  lastMessageTime: { seconds: number; nanoseconds: number; type: string };
  participants: (string | null)[];
  otherUser: OtherUserType;
};

export default ChatRoomsType;
