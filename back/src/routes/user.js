const server = require("express").Router();
const db = require("../db");

//Me traigo los usuarios de la db
server.get("/", (req, res) => {
  db.User.findAll()
    .then((users) => res.send(users))
    .catch(() =>
      res.status(400).json({
        error: true,
        message: "error al buscar el usuario",
      })
    );
});
//Buscar usuario por id
server.get("/user/:id", (req, res) => {
  db.User.findOne({
    where: { id: req.params.id },
  }).the((user) => {
    res.status(200).send(user);
  });
});
