import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sideBar show hiddenMd hiddenSd flexColumn pad10 mgLeft10 gap5 mgRight10">
      <Link
        to="/"
        className={`links hover active midFont bold700 font ${location.pathname === "/" || location.pathname === "/chat/:user" ? "secColor fontColorSec" : "fontColorMain mainColor "} pad10 radius5 `}>
        CHATS
      </Link>
      <Link
        to="/contacts"
        className={`pad10 radius5 links hover active midFont bold700 font ${location.pathname === "/contacts" ? "secColor fontColorSec " : "fontColorMain mainColor"} `}>
        CONTACTS
      </Link>
    </div>
  );
};
