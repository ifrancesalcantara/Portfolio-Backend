const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

/* GET users listing. */

router.post("/", async function(req, res, next) {
  const { creatorId, userId, newCommentData } = req.params;
  console.log(req.params)
  const newProject = await Project.create(req.body)
    .then(newProject => {
      console.log(newProject)
      return newProject;
    })
    .catch(err => {console.log(err);return});
});

module.exports = router;
