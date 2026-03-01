import createChatRoom from "@/firebase/chatRooms/createChatRoom";
import { useMutation } from "@tanstack/react-query";

export default function useCreateChatRoom() {
  const mutation = useMutation({
    mutationFn: createChatRoom,
  });

  return {
    createChatRoom: mutation.mutate,
    isCreatingChatRoom: mutation.isPending,
    createChatRoomError: mutation.error,
    isCreateChatRoomError: mutation.isError,
  };
}
