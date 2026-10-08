import { useConversation } from "../hooks/useConversation";
export const useFetchChats = () => {
    const convo = useConversation();
      const {fetchChats } = convo;
  return fetchChats
}
