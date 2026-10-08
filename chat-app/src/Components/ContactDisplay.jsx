import { useNavigate } from "react-router-dom";
export const ContactDisplay = ({contact,setReceiverId,receiverId}) => {
    const navigate = useNavigate()
    const handleChatUser = () => {
    navigate(`/chat/${receiverId}`);
  };
  return (
     <div className="flexRow left button hover transition pointer" onClick={() => {
                    setReceiverId(contact.uid);
                    handleChatUser()
                  }} >
      <div className="mgBottom5 mgTop5 chatView contactViewMd fourthColor flexColumn radius10 hideOverflow">
        <div className="padLeft10 padTop5 font largerFont bold700 ">
          {contact.name.toUpperCase()}
        </div>
        <div className="pad10 font largeFont ">
            {contact.uid}
        </div>
      </div>
    </div>
  )
}
