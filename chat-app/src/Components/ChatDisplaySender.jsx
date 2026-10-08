import { useEffect, useRef } from "react";
import { useUserContext } from "../hooks/useUserContext";
export const ChatDisplaySender = ({ message }) => {
  const auth = useUserContext();
  const { user } = auth;
  const messageScrollRef = useRef(null);

  useEffect(() => {
    messageScrollRef.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [message]);
   const updatedTime = new Date(message.createdAt)
    const formattedTime = updatedTime.toLocaleString("en-us",
    {year:"numeric", month: "long", day:"numeric", hour:"numeric",minute:"2-digit"}
  )

  return (
    <div className="flexRow right" ref={messageScrollRef}>
      <div className=" chatView chatViewMd flexColumn gap5 radius10 hideOverflow mgBottom5 mgTop5 mainColor fontColorMain">
        <div className="padBottom5 padLeft10 padTop5 font ">
          {message.senderId === user.nkataId ? "You" : message.senderId}
        </div>
        <div className="pad10 font ">{message.text}</div>
        <div className="font fourthColor fontColorSec smallerFont padBottom5 padLeft10 padTop5">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};
