import { useEffect } from "react";
import { ChatBox } from "../Components/ChatBox"
import { PagesAndSide } from "../Layout/PagesAndSide"
import { useChatContext } from "../hooks/useChatContext";
import { useParams } from "react-router-dom";

export const ChatUser = () => {
     const chats = useChatContext();
      const {
        messages,
        dispatch,
        sendError,
        receiverId,
        setText,
        setReceiverId,
        text,
        sendMessage,setSendError
      } = chats;

  const param = useParams()
  const user = param.user


  useEffect(()=>{
    const setReceiver = async ()=>{
      setReceiverId(user)
    }
    setReceiver()

    
  },[user,setReceiverId])

  return  <PagesAndSide>
    <div className="page">
        <ChatBox 
        receiverId={receiverId}
          setReceiverId={setReceiverId}
          sendMessage={sendMessage}
          error={sendError}
          messages={messages}
          dispatch={dispatch}
          text={text}
          setText={setText}
          setError={setSendError}
        />
    </div>
        
        </PagesAndSide>
}
