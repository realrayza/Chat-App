import { useContact } from "../hooks/useContact";

export const Inbox = ({ setReceiverId, message, handleChatUser, user }) => {
  const context = useContact();
  const { contacts } = context;
  const alias = contacts.find((contact) => contact.uid === message.contact);
  const mappedMessages = message.messages.map(m=>{return m})
  const otherSenders = mappedMessages.filter((m)=> m.receiverId === user.nkataId)
  const unread = otherSenders.filter(message=>message.read === false)
  const sortedMessages = message.messages.sort((b,a)=>a.createdAt - b.createdAt)
  const unreadCount = unread.length
 
  const sender = message.messages[message.messages.length - 1].senderId === user.nkataId? "You" : (alias ? alias.name : message.messages[message.messages.length - 1].senderId)

  return (
    <div>
      <button
        className="chatDisplay chatDisplayMd chatBG noBorder flexRow itemCenter spaceBetween radius10 transition hideOverflow pointer "
        onClick={() => {
          setReceiverId(message.contact);
          handleChatUser();
          localStorage.setItem("receiver",JSON.stringify(message.contact))
        }}>
        <div className="flexColumn center itemTop ">
          <div className="padLeft15 largerFont largerFontMd fontColorMain bold700">
            { alias ? (
              alias.name
            ) : (sortedMessages[sortedMessages.length-1].senderId === user.nkataId && sortedMessages[sortedMessages.length-1].receiverId === user.nkataId? "You" :
              message.contact
            )}
          </div>
          <div className="padLeft15 smallFont fontColorMain bold500 flexRow">
            {sender}
            : {sortedMessages[sortedMessages.length-1].text}
          </div>
        </div>
        {unreadCount > 0 && <div className=" mgRight25"><h2 className="largerFont font fontColorMain">{unreadCount}</h2></div>}
        
      </button>
    </div>
  );
};
