
import { PagesAndSide } from "../Layout/PagesAndSide";
import { ChatBox } from "./ChatBox";
import { useChatContext } from "../hooks/useChatContext";

export const NewChat = ()=>{
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

  return <PagesAndSide>
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
          </PagesAndSide>
};
