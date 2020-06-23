const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Paintings = require("../models/Painting");
const Likes = require("../models/Like");
const Chatrooms = require("../models/Chatroom");

/* GET users listing. */

router.get("/chatrooms/:userId", async function(req, res, next) {
  const { userId } = req.params;
  const result = [];
  await User.findById(userId)
    .populate({ path: "chats", populate: [{ path: "comments" }] })
    .then(async user => {
      res.status(202).json(user.chats);
    })
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get("/:userId", function(req, res, next) {
  const { userId } = req.params;
  User.findById(userId)
    .populate("paintings")
    .then(user => {
      res.status(202).json(user);
      return;
    })
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.get("/", function(req, res, next) {
  User.find()
    .then(allUsers => {
      res.status(202).json(allUsers);
      return;
    })
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    });
});

router.patch("/handle-like/:instruction/:userId/:paintingId", function(
  req,
  res
) {
  const { instruction, userId, paintingId } = req.params;
  if (instruction === "like") {
    User.findByIdAndUpdate(
      userId,
      { $push: { likedPaintings: paintingId } },
      { new: true }
    )
      .then(updatedUser => {
        Paintings.findByIdAndUpdate(
          paintingId,
          { $push: { usersWhoLiked: userId } },
          { new: true }
        )
          .then(updatedPainting => {
            Likes.create({ userWhoLiked: userId, paintingLiked: paintingId })
              .then(like => {
                Paintings.findByIdAndUpdate(
                  paintingId,
                  { $push: { likes: like._id } },
                  { new: true }
                )
                  .then(updatedPainting => {
                    // console.log("updatedPainting", updatedPainting);
                    res.status(202).json(updatedPainting.usersWhoLiked);
                  })
                  .catch(err => console.log(err));
                console.log("like: ", like);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        return;
      })
      .catch(err => {
        res.status(500).json(err);
        console.log(err);
      });
  } else if (instruction === "unlike") {
    User.findByIdAndUpdate(
      userId,
      { $pull: { likedPaintings: paintingId } },
      { new: true }
    )
      .then(updatedUser => {
        Paintings.findByIdAndUpdate(
          paintingId,
          { $pull: { usersWhoLiked: userId } },
          { new: true }
        )
          .populate("likes")
          .then(updatedPainting => {
            updatedPainting.likes.forEach(like => {
              if (like.userWhoLiked == userId) {
                Likes.findByIdAndDelete(like._id).catch(err =>
                  console.log(err)
                );
                Paintings.findByIdAndUpdate(
                  paintingId,
                  { $pull: { likes: like._id } },
                  { new: true }
                )
                  .then(updatedPainting2 => {
                    // console.log(
                    //   "2: updatedPainting without mu id in likedUsers and the like Id in likes, ",
                    //   like._id,
                    //   ": ",
                    //   updatedPainting2
                    res.status(202).json(updatedPainting2.usersWhoLiked);
                  })
                  .catch(err => console.log(err));
              }
            });
          })
          .catch(err => console.log(err));
        return;
      })
      .catch(err => {
        res.status(500).json(err);
        console.log(err);
      });
  }
});

router.patch("/add-seen/:paintingId", function(req, res, next) {
  const { paintingId } = req.params;
  Paintings.findById(paintingId).then(painting => {
    Paintings.findByIdAndUpdate(
      paintingId,
      { timesSeen: painting.timesSeen + 1 },
      { new: true }
    )
      .then(updatedPainting => {
        res.status(202).json(updatedPainting);
        return;
      })
      .catch(err => {
        res.status(500).json(err);
        console.log(err);
      });
  });
});

module.exports = router;
