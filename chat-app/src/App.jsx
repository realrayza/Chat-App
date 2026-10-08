import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Pages } from "./Layout/Pages";
import { Layout } from "./Layout/Layout";
import { Header } from "./Layout/Layout Components/Header";
import { Footer } from "./Layout/Layout Components/Footer";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
import { NotFound } from "./Pages/NotFound";
import { Logout } from "./Pages/Logout";
import { Chat } from "./Pages/Chat";
import { useUserContext } from "./hooks/useUserContext";
import { ChatUser } from "./Pages/ChatUser";
import { NewChat } from "./Components/NewChat";
import { Contacts } from "./Pages/Contacts";

function App() {
  const auth = useUserContext();
  const { user } = auth;

  return (
    <Layout>
      <Header />
      <Pages>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Chat />} />
          <Route
            path="/create-account"
            element={!user ? <SignUp /> : <Chat />}
          />
          <Route path="/" element={!user ? <Home /> : <Chat />} />
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/logout" element={<Logout />} />
          <Route path="/chat" element={!user ? <Login /> : <Chat />} />
          <Route
            path="/chat/newChat"
            element={!user ? <Login /> : <NewChat />}
          />
          <Route
            path="/chat/:user"
            element={!user ? <Login /> : <ChatUser />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Pages>
      <Footer />
    </Layout>
  );
}

export default App;
