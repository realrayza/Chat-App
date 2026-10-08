import { contactContext } from "./ContactContext";
import { useReducer } from "react";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
const initialState = { contacts: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CONTACTS":
      return {
        ...(state.contacts = [...state.contacts, { ...action.payload }]),
      };

    case "FETCH_CONTACTS":
      return { ...state, contacts: action.payload };
    case "CLEAR_CONTACTS":
      return { ...state, contacts: [] };
    default:
      return state;
  }
};
export const ContactContextProvider = ({ children }) => {
  const [contactName, setContactName] = useState("");
  const [contactId, setContactId] = useState("");
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useUserContext();
  const { user } = auth;

  const url = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if(!user){
      return
    }
    const fetchContact = async () => {
      try {
        const response = await fetch(`${url}/api/contacts/`, {
          headers: { Authorization: user.token },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch({ type: "FETCH_CONTACTS", payload: data.contact });
        } else {
          setError(data);
        }
      } catch (error) {
        setError(error.message);

      }
    };
    fetchContact();
  }, [url, user?.token,user]);
  const fetchContact = async () => {
    try {
      const response = await fetch(`${url}/api/contacts/`, {
        headers: { Authorization: user.token },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "FETCH_CONTACTS", payload: data.contact });
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const addContact = async (e) => {
    
    e.preventDefault();
    try {
      if(!contactId){
      throw Error("ContactId is required")
    }
      const response = await fetch(`${url}/api/contacts/add/`, {
        method: "POST",
        body: JSON.stringify({ contactName, contactUid: contactId }),
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "ADD_CONTACT", payload: data });
        fetchContact();
        setContactId("");
        setContactName("");
      } else {
        throw Error(data);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <contactContext.Provider
      value={{
        ...state,
        dispatch,
        setError,
        error,
        contactId,
        contactName,
        setContactId,
        setContactName,
        addContact,
      }}>
      {children}
    </contactContext.Provider>
  );
};
