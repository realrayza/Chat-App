import { useEffect, useReducer, useState } from "react";
import { chatContext } from "./ChatContext";
import { useUserContext } from "../hooks/useUserContext";
import { socket } from "../utils/Socket";

const messagesState = { messages: [] };

const messagesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      const index = state.messages.findIndex(
        (message) => message.contact === action.payload.contact,
      );

      let updatedMessages;
      if (index >= 0) {
        updatedMessages = state.messages.map((entry, i) =>
          i === index
            ? {
                ...entry,
                messages: [...entry.messages, ...action.payload.messages],
                updatedTime: action.payload.updatedTime,
              }
            : entry,
        );
      } else {
        updatedMessages = [...state.messages, { ...action.payload }];
      }

      return { ...state, messages: updatedMessages };
    }
    case "FETCH_MESSAGES":
      return { ...state, messages: action.payload };
    case "CLEAR_CHAT":
      return { ...state, messages: [] };
    default:
      return state;
  }
};

const convoInitialState = { conversations: [] };

const convoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { conversations: [...state.conversations, { ...action.payload }] };

    case "FETCH_MESSAGES":
      return { ...state, conversations: action.payload };
    case "CLEAR_CHAT":
      return { ...state, conversations: [] };
    default:
      return state;
  }
};

export const ChatContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, messagesState);
  const [convoState, convoDispatch] = useReducer(
    convoReducer,
    convoInitialState,
  );
  const [messageError, setMessageError] = useState(null);
  const [convoError, setConvoError] = useState(null);
  const [receiverId, setReceiverId] = useState("");
  const [sendError, setSendError] = useState(null);
  const [text, setText] = useState("");
  const auth = useUserContext();
  const { user } = auth;
  const url = import.meta.env.VITE_BACKEND_URL;

  // fetchConversation
  const fetchChats = async () => {
    if(!user.token){
      return
    }
    try {
      const response = await fetch(
        `${url}/api/messages/getConversation/${receiverId}`,
        {
          headers: { Authorization: user.token },
        },
      );

      const data = await response.json();
      if (response.ok) {
        convoDispatch({ type: "FETCH_MESSAGES", payload: data });
      } else {
        setConvoError(data);
      }
    } catch (error) {
      setConvoError(error.message);
    }
  };

  // fetch message history
  const fetchHistory = async () => {
    if (!user?.nkataId) return;
    try {
      const response = await fetch(`${url}/api/messages/history`, {
        headers: { Authorization: user.token },
      });
      const data = await response.json();

      if (response.ok) {
        const grouped = data.reduce((acc, msg) => {
          const contact =
            msg.senderId === user.nkataId ? msg.receiverId : msg.senderId;
          if (!acc[contact]) {
            acc[contact] = {
              contact,
              messages: [],
              updatedTime: msg.createdAt,
            };
          }
          acc[contact].messages.push(msg);
          return acc;
        }, {});

        dispatch({ type: "FETCH_MESSAGES", payload: Object.values(grouped) });
      } else {
        setMessageError(data);
      }
    } catch (error) {
      setMessageError(error);
    }
  };
  useEffect(() => {
    if (!user?.nkataId) return;
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${url}/api/messages/history`, {
          headers: { Authorization: user.token },
        });
        const data = await response.json();

        if (response.ok) {
          const grouped = data.reduce((acc, msg) => {
            const contact =
              msg.senderId === user.nkataId ? msg.receiverId : msg.senderId;
            if (!acc[contact]) {
              acc[contact] = {
                contact,
                messages: [],
                updatedTime: msg.createdAt,
              };
            }
            acc[contact].messages.push(msg);
            return acc;
          }, {});

          dispatch({ type: "FETCH_MESSAGES", payload: Object.values(grouped) });
        } else {
          setMessageError(data);
        }
      } catch (error) {
        setMessageError(error);
      }
    };
    fetchHistory();
  }, [dispatch, url, user?.nkataId, user?.token, setMessageError]);

  useEffect(() => {
    const fetchReceiver = async () => {
      const receiver = await localStorage.getItem("receiverId");
      if (receiver) {
        setReceiverId(receiver);
      }
    };
    fetchReceiver();
  }, []);

  // notification
  useEffect(() => {
    const askPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification Enabled");
      }
    };
    askPermission()
  },[]);

  // connecting to socket.io and receiving new messages
  useEffect(() => {
    if (!user?.token) return;
    socket.auth = user && { token: user.token };

    const onConnect = () => console.log("connected to socket.io");
    const onError = (err) => console.log("connect_error:", err.message);
    const newPrivateMessage = (data) => {
      const contact =
        data.senderId === user.nkataId ? data.receiverId : data.senderId;
      dispatch({
        type: "ADD_MESSAGE",
        payload: { contact, messages: [data], updatedTime: data.createdAt },
      });
      convoDispatch({
        type: "ADD_MESSAGE",
        payload: data,
      });
      if(Notification.permission === "granted"){
        new Notification("New Message",{
          contact: contact,
          body: data.text
        })
      }
    };

    socket.off("newPrivateMessage");
    socket.off("privateMessageSent");

    socket.on("connect", onConnect);
    socket.on("connect_error", onError);
    socket.on("newPrivateMessage", newPrivateMessage);
    socket.on("privateMessageSent", newPrivateMessage);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onError);
      socket.off("newPrivateMessage", newPrivateMessage);
      socket.off("privateMessageSent", newPrivateMessage);
      socket.disconnect();
    };
  }, [user, dispatch]);

  // sendMessage
  const sendMessage = async () => {
    try {
      const response = await fetch(`${url}/api/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user.token,
        },
        body: JSON.stringify({ receiverId, message: text }),
      });
      const data = await response.json();
      if (response.ok) {
        setText("");
      } else {
        setSendError(data);
      }
    } catch (error) {
      setSendError(error);
    }
  };
  return (
    <chatContext.Provider
      value={{
        ...state,
        ...convoState,
        convoDispatch,
        fetchHistory,
        dispatch,
        sendError,
        receiverId,
        text,
        setText,
        setReceiverId,
        sendMessage,
        messageError,
        setMessageError,
        setSendError,
        fetchChats,
        convoError,
        setConvoError,
      }}>
      {children}
    </chatContext.Provider>
  );
};
