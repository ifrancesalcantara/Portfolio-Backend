const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatCommentSchema = new Schema({
  creatorUsername: String,
  creatorId: String, //!!!ID
    commentText: String,
    commentImage: String
  },{
    timestamps: { createdAt: "created_at" }
  }
);

const ChatComment = mongoose.model("ChatComment", ChatCommentSchema);

module.exports = ChatComment;