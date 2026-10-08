const Message = require("../models/messagemodel");
const User = require("../models/usermodel");

const sendMessage = (io) => async (req, res) => {
  try {
    const senderId = req.nkataId;

    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      throw Error("receiverId and message are required");
    }

    const userexists = await User.findOne({ nkataId: receiverId });

    if (!userexists) {
      throw Error("user doesn't exist");
    }
    const savedMessage = await Message.create({
      senderId,
      receiverId,
      text: message,
    });

    io.to(receiverId).emit("newPrivateMessage", savedMessage);
    io.to(senderId).emit("privateMessageSent", savedMessage);
    res.status(200).json({ message: "message sent", data: savedMessage });
  } catch (error) {
    res.status(500).json(error.message);
  
  }
};

const getHistory = async (req, res) => {
  const userid = req.nkataId;
  try {
    const messages = await Message.find({
      $or: [{ senderId: userid }, { receiverId: userid }],
    }).sort({createdAt:1});
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
};

const getConversation = async (req, res) => {
  try {
    const { otheruseruid } = req.params;
    const { limit, before } = req.query;
    const userA = req.nkataId;
    const userB = otheruseruid;

    const updateRead = await Message.updateMany(
      { senderId: userB, receiverId: userA, read: false },
      {$set: {read:true}}
    );


    const messages = await Message.find({
      $or: [
        { senderId: userA, receiverId: userB },
        { senderId: userB, receiverId: userA },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(limit);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
     
  }
};

module.exports = { sendMessage, getHistory, getConversation };
