import { FieldValue } from "firebase/firestore";

type OtherUser = {
  fullName: string;
  image: string;
  uid: string;
};

type ChatRoomsType = {
  roomId: string;
  createdAt: FieldValue;
  lastMessage: null | string;
  lastMessageSender: null | string;
  lastMessageTime: { seconds: number; nanoseconds: number; type: string };
  participants: (string | null)[];
  otherUser: OtherUser;
};

export default ChatRoomsType;
