const mongoose = require("mongoose");

const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    senderId: { type: String, required: true, index: true },
    receiverId: { type: String, required: true, index: true },
    text: { type: String, required: true, trim: true },
    contactName: { type: String, trim:true},
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

messageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
