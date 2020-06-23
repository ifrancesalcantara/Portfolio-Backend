const express = require("express");
const router = express.Router();
const Paintings = require("../models/Painting");
const User = require("../models/User");
const parser = require("./../config/cloudinary");

// /paintings/image
router.post("/image", parser.single("photo"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
  }
  const imageUrl = req.file.secure_url;
  res.json(imageUrl).status(200);
});

router.post("/", function(req, res, next) {
  const { creator } = req.body;

  Paintings.create(req.body)
    .then(newPainting => {
      res.status(202).json(newPainting);
      User.findByIdAndUpdate(
        creator,
        { $push: { paintings: newPainting._id } },
        { new: true, useFindAndModify: false }
      )
        .populate("paintings")
        .then(updatedUser => {
          {
            console.log(updatedUser);
          }
        })
        .catch(err => console.log(err));
      return;
    })
    .catch(err => {
      res.status();
      console.log(err);
    });
});

//!!! CLAN IT. NOT USING MOST PART
router.get("/", function(req, res, next) {
  if (req.query) {
    const { tag, game } = req.query;
    if (tag) {
      Paintings.find({ tags: { $in: [tag] } })
        .then(filteredPaintings => {
          res.status(202).json(filteredPaintings);
          return;
        })
        .catch(err => {
          res.status(404).json(err);
          console.log(err);
        });
    } else if (game) {
      Paintings.find({ game: game })
        .then(filteredPaintings => {
          res.status(202).json(filteredPaintings);
          return;
        })
        .catch(err => {
          res.status(404).json(err);
          console.log(err);
        });
    }
  } else {
    Paintings.find()
      .then(allPaintings => {
        res.status(202).json(allPaintings);
        return;
      })
      .catch(err => {
        res.status(404).json(err);
        console.log(err);
      });
  }
});

router.get("/home", function(req, res, next) {
  Paintings.find({})
    .then(allPaintings => {
      //!!!
      const notOwnPaintings = allPaintings.filter(painting => {
        if (painting.creator != "5deb63889997fe333e0be6d0") {
          return true;
        }
      });
      res.status(202).json(notOwnPaintings);
      return;
    })
    .catch(err => {
      res.status(404).json(err);
      console.log(err);
    });
});

router.get("/:paintingId", function(req, res, next) {
  const { paintingId } = req.params;
  Paintings.findById(paintingId)
    .then(painting => {
      res.status(202).json(painting);
      return;
    })
    .catch(err => {
      res
        .status(404, "Painting not found. It may have been deleted.")
        .json(err);
    });
});

router.get("/user/:userId", function(req, res, next) {
  User.findById(req.params.userId)
    .populate("paintings")
    .then(user => {
      res.status(202).json(user.paintings);
      return;
    })
    .catch(err => {
      res.status(404).json(err);
      console.log(err);
    });
});

router.delete("/:paintingId", function(req, res, next) {
  const { paintingId } = req.params;
  Paintings.findByIdAndDelete(paintingId)
    .then(() => {
      res.status(202);
      return;
    })
    .catch(err => {
      res.status(err.status);
      console.log(err);
    });
});

router.put("/:paintingId", function(req, res, next) {
  const { paintingId } = req.params;
  console.log("AAAAAAAA: ", paintingId);
  Paintings.findByIdAndUpdate(paintingId, req.body, { new: true })
    .then(updatedPainting => {
      res.status(202).json(updatedPainting);
      return;
    })
    .catch(err => {
      res.status(err.status);
      console.log(err);
    });
});

router.delete("/admin/all", function(req, res, next) {
  Paintings.find({})
    .then(paintingArr => {
      paintingArr.forEach(painting => {
        Paintings.findByIdAndDelete(painting._id).then(deletion => {
          res.status(200).json(deletion);
        });
      });
    })
    .catch(err => {
      res.status();
      console.log(err);
    });
});

module.exports = router;
