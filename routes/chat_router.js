const express = require("express");
const router = express.Router();
const Chat = require("../models/Chatroom");
const User = require("../models/User")
const Comment = require("../models/Chat-comment");

/* GET users listing. */

router.get("/admin", async function(req, res, next) {
  const allChats = await Chat.find().then(allChats => allChats);
  res.status(202).json(allChats);
});

router.post("/comment/:creatorId/:userId", async function(req, res, next) {
  const { creatorId, userId, newCommentData } = req.params;
  console.log("REQ:BODYYYYYYYYYY: ", req.body);
  const newComment = await Comment.create(req.body)
    .then(newComment => {
      // console.log(newComment)
      return newComment;
    })
    .catch(err => console.log(err));

  const chat1 = await Chat.findOne({ roomId: creatorId + userId })
    .then(chat => {

      if (chat) {
        return chat;
      }
    })
    .catch(err => console.log(err));

  const chat2 = await Chat.findOne({ roomId: userId + creatorId })
    .then(chat => {
      
      if (chat) {
        return chat;
      }
    })
    .catch(err => console.log(err));

  if (chat1) {
    const updatedChatRes = Chat.findByIdAndUpdate(
      chat1._id,
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .then(updatedChat =>
        Chat.findById(updatedChat._id)
          .then(data => data)
          .catch(err => console.log(err))
      )
      .catch(err => console.log(err));

    res.status(202).json(updatedChatRes);
    return;
  } else if (chat2) {
    const updatedChatRes = Chat.findByIdAndUpdate(
      chat2._id,
      { $push: { comments: newComment._id } },
      { new: true }
    ).then(updatedChat => {
      console.log(updatedChat);
      return updatedChat;
    });
    res.status(202).json(updatedChatRes);
    return;
  }
});

router.get("/:creatorId/:userId", async function(req, res, next) {
  const { creatorId, userId } = req.params;
  const chat1 = await Chat.findOne({ roomId: creatorId + userId })
    .populate({ path: "comments", options: { sort: { "created_at": -1 } } })

    .then(chat => {
      if (chat) {
        console.log("chat1", 
        chat)
        return chat;
      }
    })
    .catch(err => console.log(err));

  const chat2 = await Chat.findOne({ roomId: userId + creatorId })
    .populate({ path: "comments", options: { sort: { "created_at": -1 } } })

    .then(chat => {
      if (chat) {
        console.log("chat2", 
        chat)
        return chat;
      }
    })
    .catch(err => console.log(err));

  if (!chat1 && !chat2) {
    Chat.create({ roomId: userId + creatorId })
      .then(newChat => {

        User.findByIdAndUpdate(userId, {$push: {"chats": newChat._id}}, {new:true})
        .then(data=>console.log(data))
        .catch(err=>{console.log(err)})
        User.findByIdAndUpdate(creatorId, {$push: {"chats": newChat._id}}, {new:true})
        .then(data=>console.log(data))
        .catch(err=>{console.log(err)})

        //!!!Remove {a: b:}
        res.status(202).json({ a: newChat, b: "newChat" });
        return;
      })

      .catch(err => console.log(err));
  
    } else if (chat1) {
    //!!!Remove {a: b:}
    res.status(202).json({ a: chat1, b: "chat1" });
    return;

  } else if (chat2) {
    //!!!Remove {a: b:}
    res.status(202).json({ a: chat2, b: "chat2" });
    return;
  }
});

module.exports = router;
