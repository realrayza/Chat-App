import { useContext } from "react"
import { contactContext } from "../Context/ContactContext"

export const useContact = () => {
    const context = useContext(contactContext)
  return context
}
