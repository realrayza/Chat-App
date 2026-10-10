import { Link } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { TfiAlignLeft } from "react-icons/tfi";
import { useState } from "react";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useUserContext();
  const { user } = auth;
  return (
    <div className="header headerMd  flexRow spaceBetween pad10 itemCenter flexRowReverseMd">
      <header>
        <div className="leftHeader mgLeft20 ">
          <Link className="links" to="/"><h2 className="fontColorMain font hugeFont ">NKATA</h2></Link>
          
        </div>
      </header>
      <div
        className="hidden showMd pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <TfiAlignLeft fill="white" size="1.5em" />
      </div>
      <div
        className={`rightHeaderMd  ${isOpen ? " showMd  bigMidFontMd" : "hiddenMd"} transition`}>
        <nav
          className="flexRow flexColumnMd  gap10 gap10Md mgRight20"
          onClick={() => setIsOpen(!isOpen)}>
          {user && (
            <div className="fontColorMain font bold">Hi, {user.name}</div>
          )}
          <Link className="links fontColorMain font bold" to="/">
            HOME
          </Link>

          {user && (
            <div className="flexColumnMd gap10Md">
              <Link
                to="/"
                className={`hidden showMd  links fontColorMain bold700 font radius5 `}>
                CHATS
              </Link>
              <Link
                to="/contacts"
                className={`hidden showMd radius5 fontColorMain links bold700 font`}>
                CONTACTS
              </Link>
              <Link className="links fontColorMain font bold" to="/logout">
                LOGOUT
              </Link>
            </div>
          )}
          {!user && (
            <div className="gap10 flexRow flexColumnMd">
              <Link className="links fontColorMain font bold" to="/login">
                LOGIN
              </Link>
              <Link
                className="links fontColorMain font bold"
                to="/create-account">
                SIGN UP
              </Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};
