const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
  roomId: String, //!!!ID
  comments: [{type: Schema.Types.ObjectId, ref: "ChatComment"}] //!!!ID
});

const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);

module.exports = ChatRoom;
