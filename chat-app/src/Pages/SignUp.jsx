import { useNavigate } from "react-router-dom";
import { PagesNoSideBar} from "../Layout/PagesNoSideBar";
import { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const auth = useUserContext();
  const { setUser } = auth;
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  console.log(url)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const register = await fetch(`${url}/api/users/signup`, {
        method: "POST",
        body: JSON.stringify({ email, name, username, password,phone }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await register.json();
      if (register.ok) {
        setUser(data);
        setError(null);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/chat");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Couldn't create account", error.message);
    }
  };
  return (
    <PagesNoSideBar>
      <div className="page">
        <div className="signup signupMd flexRow spaceBetween">
          <div className="formContainer flexRow center mgTop25 pad25 pad5Md ">
            <form
              className="loginForm flexColumn center  secColor pad10 padLeft25 padRight25 radius10"
              onSubmit={handleSubmit}>
              <div className="font mgBottom15 largeFont bold700 fontColorSec">
                CREATE ACCOUNT
              </div>
              {error && (
                <div className="error  fontColorMain mgTop15 font pad10 bold500 solidBorder bdWidth2">{error}</div>
              )}
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                type="text"
                id="name"
                className="formInput formInput font  pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Name..."
              />

              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError(null);
                }}
                type="text"
                id="username"
                className="formInput formInput font  pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Username..."
              />

              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                type="email"
                id="email"
                className="formInput formInput font  pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Email..."
              />
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError(null);
                }}
                type="phone"
                id="phone"
                className="formInput formInput font  pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Phone number"
              />

              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                type="password"
                id="password"
                className="formInput formInput font pad5 radius5 solid bdWidth2 smallFont fontColorsec mgBottom10"
                placeholder="Enter password..."
                autoComplete="off"
              />

              <button
                type="submit"
                className="noBorder mainColor fontColorMain font largeFont pad5 radius10">
                CREATE ACCOUNT
              </button>
              <h2 className="font smallFont  mgTop10">
                Already have an account?{" "}
                <i
                  button
                  className="pointer fontColorThird"
                  onClick={() => navigate("/login")}>
                  Sign up
                </i>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </PagesNoSideBar>
  );
};
