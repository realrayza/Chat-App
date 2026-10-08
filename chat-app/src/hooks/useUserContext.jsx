import { useContext } from "react";
import { userContext } from "../Context/UserContextCreator";

export const useUserContext = () =>{
  const auth = useContext(userContext) 
  return auth 
}
