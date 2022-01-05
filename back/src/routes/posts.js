const server = require("express").Router();
const { Post } = require("../db.js");

//crear post
server.post("/", (req, res) => {
  const { id, data, creator } = req.body;
  Post.create({
    id,
    data,
    creator,
  })
    .then((post) => {
      res.status(201).send(post);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;
  Post.destroy({
    id,
  })
    .then((deleted) => {
      res.status(201).send(deleted);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = server;
