import { chatContext } from "../Context/ChatContext";
import { useContext } from "react";

export const useChatContext = () =>{
    const chats = useContext(chatContext) 


    return chats
}