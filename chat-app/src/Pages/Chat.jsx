import { PagesAndSide } from "../Layout/PagesAndSide";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../hooks/useChatContext";
import { useUserContext } from "../hooks/useUserContext";
import { Inbox } from "../Components/Inbox";
import { useEffect } from "react";

export const Chat = () => {
 
  const navigate = useNavigate();
  const auth = useUserContext();
  const { user } = auth;
 
  const chats = useChatContext();
  const {
    messages,
    receiverId,
    setText,
    setReceiverId,fetchHistory,convoDispatch
  } = chats;
  
  useEffect(()=>{
    fetchHistory()
  },[fetchHistory])

 
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.updatedTime) - new Date(a.updatedTime),
  );
 


  const handleChatUser = () => {
    navigate(`/chat/${receiverId}`);
  };

  const newChat = () => {
    convoDispatch({ type: "CLEAR_CHAT" });
    setText("");
    setReceiverId("");
    navigate(`/chat/newChat`);
  };

  return (
    <PagesAndSide>
      <div className="page ">
        <div className="chat chatMd mgLeft10 pad5 mgRight10 pad0Md mgRight5Md mgLeft5Md vb100 scrollOverflowY hideOverflowX ">
          <button
            className="pointer createChatMd chatBg fontColorsec pad10 noBorder largeFont font bold700 mgLeft15 radius5 mgBottom10"
            onClick={newChat}>
            New Chat +
          </button>
          {sortedMessages &&
            sortedMessages?.map((message, index) => (
              <div key={index} className="chatHistory pad5  flexRow">
                <Inbox
                user={user}
                message={message}
                handleChatUser={handleChatUser}
                setReceiverId={setReceiverId}
                />
              </div>
            ))}

        </div>
        
      </div>
    </PagesAndSide>
  );
};
