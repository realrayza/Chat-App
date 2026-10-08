import { useState } from "react";
import { PagesNoSideBar } from "../Layout/PagesNoSideBar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = useUserContext();
  const { setUser } = auth;
  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const login = await fetch(`${url}/api/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await login.json();
      if (login.ok) {
        setEmail("");
        setPassword("");
        setUser(data);
        setError(null);
        localStorage.setItem(
          "user",
          JSON.stringify(data),
        );
        navigate("/chat");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification Enabled");
      }
      } else {
        setError(data.message);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setError("Something went wrong. Couldn't log in", error.message);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <PagesNoSideBar>
      <div className="page">
        <div className="login loginMd  spaceBetween flexRow">
          <div className="formContainer flexRow center mgTop25 pad25 pad5Md">
            <form
              className="loginForm loginFormMd  flexColumn center  secColor pad10 padLeft25 padRight25 radius10"
              onSubmit={handleSubmit}>
              <div className="font mgBottom25 largeFont bold700 fontColorSec">
                LOGIN
              </div>
              {error && (
                <div className="error  fontColorMain mgTop15 font pad10 bold500 solidBorder bdWidth2">{error}</div>
              )}
              <input
                value={email}
                onChange={(e) => {
                  setError(null);
                  setEmail(e.target.value);
                }}
                type="text"
                className="formInput formInput font  pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Email..."
              />

              <input
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
                type="password"
                className="formInput formInput font pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Enter password..."
                autoComplete="off"
              />

              <button
                type="submit"
                className="radius10 noBorder mainColor fontColorMain font largeFont pad5">
                LOGIN
              </button>
              <h2 className="font smallFont  mgTop10">
                Don't have an account?{" "}
                <i
                  button
                  className="pointer fontColorThird"
                  onClick={() => navigate("/create-account")}>
                  Sign up
                </i>
              </h2>
            </form>
          </div>
          <div className="loginImage"></div>
        </div>
      </div>
    </PagesNoSideBar>
  );
};
