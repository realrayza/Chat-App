const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");

const randomUID = () => {
  const uid = randomBytes(8).toString("base64url").slice(0, 7);
  return uid;
};

const generateUniqueUID = async () => {
  let uid = randomUID();
  while (await User.exists({ uid })) {
    uid = randomUID();
  }
  return uid;
};
const createToken = (_id, uid, nkataId) => {
  return jwt.sign({ _id, uid, nkataId }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

const signup = async (req, res) => {
  const { email, name, username, password } = req.body;

  try {
    const uid = await generateUniqueUID();
    const nkataId = await `${username}@nkt`;

    const user = await User.signup(
      name,
      username,
      email,
      password,
      nkataId,
      uid,
    );

    const token = createToken(user._id, user.uid, user.nkataId);
    res.status(200).json({
      name: user.name,
      uid: user.uid,
      nkataId: user.nkataId,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id, user.uid, user.nkataId);
    res.status(200).json({
      name: user.name,
      uid: user.uid,
      nkataId: user.nkataId,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
