const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  userWhoLiked: Schema.Types.ObjectId,
  paintingLiked: Schema.Types.ObjectId
}, {
    timestamps: { createdAt: "created_at"}
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
