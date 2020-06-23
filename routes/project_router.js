const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

router.post("/", async function(req, res, next) {
  const newProject = await Project.create(req.body)
  .then(newProject => {
    res.status(202).json(newProject);
    return})
  .catch(err => {
    res.status(500).json(err);
    return
    });
});

router.get("/projects", async function(req, res, next) {
  Project.find({})
    .then(allProjects => {
      res.status(202).json(allProjects);
      return})
    .catch(err => {
      res.status(404).json(err);
      return
      });
});

router.get("/:name", async function(req, res, next) {
  const {name}=req.params
  Project.findOne({name:name})
    .then(project => {
      res.status(202).json(project);
      return
    })
    .catch(err => {
      res.status(404).json(err);
      return
    })
});

module.exports = router;
