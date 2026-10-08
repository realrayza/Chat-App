import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import { useChatContext } from "../hooks/useChatContext";
import { useContact } from "../hooks/useContact";
export const Logout = () => {
  const context = useContact();
  const { dispatch: contactDispatch } = context;

  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const chats = useChatContext();
  const { dispatch, convoDispatch } = chats;
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("receiverId")
    setUser(null);
    dispatch({ type: "CLEAR_CHAT" });
    convoDispatch({ type: "CLEAR_CHAT" });
    contactDispatch({ type: "CLEAR_CONTACTS" });
    navigate("/");
  }, [dispatch, navigate, setUser,convoDispatch, contactDispatch]);
  return <div>Logout</div>;
};
