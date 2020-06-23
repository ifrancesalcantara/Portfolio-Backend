const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema  = new Schema ({
    dateOfCreation: Date,
    username: {type: String, required: true},
    paintings: [{type: String, ref: "Painting"}], //Must be an ID
    delivers: Boolean,
    models: Boolean,
    image: String,
    techniques: [String],
    password: {type: String, required: true}, 
    likedPaintings: [Schema.Types.ObjectId], 
    chats: [{type: Schema.Types.ObjectId, ref: "ChatRoom"}]
},{
    timestamps: { createdAt: "created_at" }
  })

const User = mongoose.model("User", userSchema)

module.exports = User