import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useChatContext } from "../hooks/useChatContext";
import { ChatDisplaySender } from "./ChatDisplaySender";
import { ChatDisplayReceiver } from "./ChatDisplayReceiver";
import { useNavigate } from "react-router-dom";
import { useContact } from "../hooks/useContact";

export const ChatBox = ({
  receiverId,
  setReceiverId,
  sendMessage,
  error,
  text,
  setText,
  setError
}) => {
  const [contact, setContact] = useState(receiverId);
   const [visible, setVisible] = useState(false);
  // const url = import.meta.env.VITE_BACKEND_URL;
   const chats = useChatContext();
  const {
    fetchChats,conversations
  } = chats;

  const sortedConversations = conversations?.sort(
    (a, b) => b.createdAt - a.createdAt,
  );
  const auth = useUserContext();
  const { user } = auth;
  const navigate = useNavigate();
  const context = useContact();
  const { contacts,addContact,setContactName,setContactId,contactId, error:addError,setError:setAddError } = context;
  const alias = contacts.find((contact) => contact.uid === receiverId);
  
  // scrollMessage
  // const messageScrollRef = useRef(null)

  // useEffect(()=>{
  //   messageScrollRef.current?.scrollIntoView({
  //     behaviour: "smooth"
  //   })
  // },[sortedConversations])
  // fetch previous conversation
  useEffect(() => {
    if(!receiverId){
      return
    }
    if(receiverId){
      setContactId(receiverId)
    }
  fetchChats()
  }, [receiverId,setContactId,fetchChats]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await sendMessage();
  
  };


  return (
    <div className="chatBox chatBoxMd secColor radius10 pad15 pad5 mgLeft10Md">
      <div className=" flexColumn spaceBetween gap15">
        <div className="flexRow spaceBetween gap10">
          <h2
            className="fontColorMain pointer buttonNav mainColor font largeFont pointer pointer buttonNav pad10 radius10"
            onClick={() => {
              (setReceiverId(""), setError(null), navigate(-1),setAddError(null),setContactId(""));
            }}>
            ⬅ Back
          </h2>
          {!alias && (
            <h2
              className="fontColorMain pointer buttonNav mainColor font largeFont pointer pointer buttonNav pad10 radius10"
             onClick={() => {setVisible(!visible);setAddError(null);}}>
              Add Contact+
            </h2>
          )}
        </div>
         {addError !== null && (
          <h2 className="error  fontColorMain mgTop15 font pad10 bold500 solidBorder bdWidth2">{addError.message}</h2>
        )}
        <div className={`${visible ? "modalVisible" : "modalHide"} mgTop20 selfAlignCenter`}>
          <form className="flexRow flexColumnMd spaceBetween gap15" onSubmit={addContact}>
            <input
              className="largeFont pad5 font fontColorSec radius5 bdWidth2 solidBorder"
              type="text"
              placeholder="Contact Name..."
              onChange={(e) => {setContactName(e.target.value);setAddError(null);}}
            />
            <input
              className="largeFont pad5 font fontColorSec radius5 bdWidth2 solidBorder "
              type="text"
              value={contactId}
              onChange={(e) => {setContactId(e.target.value);setAddError(null);}}
            />
            <button
              type="submit"
              className="mainColor fontColorMain largeFont padTop5 padBottom5 padRight10 padLeft10 bold700 font radius5 noBorder">
              Save
            </button>
          </form>
        </div>
        {error && (
          <h2 className="error font pad5 mgLeft20 bdWidth2 largeFont">
            {error}
          </h2>
        )}
        <div className="flexRow gap10 itemCenter">
          <h2 className="font fontColorSec">To:</h2>
          <input
            value={
              receiverId
                ? alias
                  ? alias.name
                  : user.nkataId === receiverId
                    ? "Me"
                    : receiverId
                : contact
            }
            className="vw100 bold700 font largeFont pad5 radius5 bdWidth2 solidBorder"
            type="text"
            onChange={(e) => {
              setError(null);
              setContact(e.target.value);setAddError(null);
            }}
            required={!receiverId}
          />
          <button
            className="noBorder bold700 font largeFont mainColor fontColorMain padBottom5 padLeft15 padRight15 padTop5 radius5 "
            onClick={() => {
              (setError(null), setReceiverId(contact), setAddError(null));fetchChats()
            }}
            disabled={!contact}>
            Chat
          </button>
        </div>
        {conversations && (
          <div className="messageDisplay messageDisplayMd hideOverflow scrollOverflowY">
            {sortedConversations.map((message) => (
              <div key={message._id} >
                {message.senderId === user.nkataId ? (
                  <ChatDisplaySender message={message} />
                ) : (
                  <ChatDisplayReceiver message={message}/>
                )}
              </div>
            ))}
           <div  />
          </div>
      
        )}

        <form className="compose flexColumn gap5" onSubmit={handleSubmit}>
          <div className="composeInput vw100">
            <textarea
              className="textArea font pad10 autoOverflow scrollOverflowY vw100"
              value={text}
              onChange={(e) => {
                setError(null);
                setText(e.target.value);
                setAddError(null);
              }}
              disabled={!receiverId}
              placeholder="Compose..."></textarea>
          </div>
          <button
            className="noBorder mainColor pad5 radius10 font fontColorMain largerFont"
            type="submit"
            disabled={!text}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
