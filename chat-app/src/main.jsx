import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContextProvider.jsx";
import { ChatContextProvider } from "./Context/ChatContextProvider.jsx";
import { ContactContextProvider } from "./Context/ContactContextProvider.jsx";
import { ScrollToTop } from "./Layout/Layout Components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
      <UserContextProvider>
        <ChatContextProvider>
            <ContactContextProvider>
              <App />
            </ContactContextProvider>
  
        </ChatContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
