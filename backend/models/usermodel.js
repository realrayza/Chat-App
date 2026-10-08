const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema;
const contactSchema = new schema(
  {
    uid: { type: String, required: true },
    name: {type:String,required: true, trim:true}
  },
  { _id: false },
);

const userSchema = new schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  uid: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    immutable: true,
  },
  nkataId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  contact: [contactSchema],
});

userSchema.statics.signup = async function (
  name,
  username,
  email,
  password,
  nkataId,
  uid,
) {
  if (!username || !password || !username || !name) {
    throw Error("All FIELDS must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already exists");
  }
  const usernameCheck = await this.findOne({ username });

  if (usernameCheck) {
    throw Error("Username already exists");
  }
  const uidCheck = await this.findOne({ uid });

  if (uidCheck) {
    throw Error("uid already exists");
  }
  const nkataidCheck = await this.findOne({ nkataId });

  if (nkataidCheck) {
    throw Error("nkata id already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    name,
    username,
    email,
    password: hash,
    nkataId,
    uid,
  });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All FIELDS must be field");
  }
  const user = await this.findOne({
    $or: [{ email: email }, { username: email }],
  });
  if (!user) {
    throw Error("Incorrect username/email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};
const User = mongoose.model("user", userSchema);

module.exports = User;
