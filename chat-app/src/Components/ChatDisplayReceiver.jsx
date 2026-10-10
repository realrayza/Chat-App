import { useEffect, useRef } from "react";
import { useContact } from "../hooks/useContact";
export const ChatDisplayReceiver = ({ message }) => {
   const context = useContact();
  const { contacts } = context;
   const messageScrollRef = useRef(null)
  
    useEffect(()=>{
      messageScrollRef.current?.scrollIntoView({
        behaviour: "smooth"
      })
    },[message])
    const updatedTime = new Date(message.createdAt)
    const formattedTime = updatedTime.toLocaleString("en-us",
    {year:"numeric", month: "long", day:"numeric", hour:"numeric",minute:"2-digit"}
  )

  const alias = contacts.find((contact) => contact.uid === message.senderId);
  return (
    <div className="flexRow left" ref={messageScrollRef}>
      <div className="mgBottom5 mgTop5 chatView chatViewMd ChatViewMd fourthColor flexColumn gap5 radius10 hideOverflow">
        <div className="padBottom5 padLeft10 padTop5 font fontColorSec bold boldMd ">
          {message?.senderId === alias?.uid? alias.name : message.senderId}
        </div>
        <div className="pad10 font ">{message.text}</div>
        <div className="font mainColor fontColorMain tinyFont tinyFontMd padBottom5 padLeft10 padTop5">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};
