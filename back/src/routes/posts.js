const server = require("express").Router();
const { User, Post } = require("../db.js");
const sequelize = require("sequelize");

//crear post
server.post("/newPost", async (req, res) => {
  const { user, data, media } = req.body;
  let newPost = Post.create({
    data,
    media,
  });

  const creator = user.map((u) => {
    const addUser = await User.findOne({
      where: { id: u },
    });
    newPost.addType(addUser);
  });

  await Promise.all(creator)

    .then((post) => {
      res.status(201).send(post);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//traer posts
server.get("/all", async (req, res) => {
  await Post.findAll()
    .then((post) => {
      res.status(201).send(post);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

server.put("/follow", async (req, res) => {
  /* 
   idUser = el usuario que sigue o deja de seguir
  idPost = el usuario que se sigue o se deja de seguir
  req.body porque no se por donde lo van a mandar todavia
  */
  console.log("Esto es el body: ", req.body);
  const idUser = req.body[0];
  const idPost = req.body[1];

  let user = await User.findOne({
    where: { id: idUser },
  });
  console.log(user);
  let post = await Post.findOne({
    where: { id: idPost },
  });

  console.log("1: ", user.dataValues);
  console.log("2: ", post.dataValues);

  if (user && post) {
    if (!post.like.includes(user)) {
      try {
        await post.update({
          like: sequelize.fn("array_append", sequelize.col("like"), idUser),
        });

        console.log("postUpdate", post.dataValues);

        res.status(200).send("Like it");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await post.update({
          like: sequelize.fn("array_remove", sequelize.col("like"), idUser),
        });
        res.status(200).send("Doesn't like it");
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.status(404).send("Usuario o post no encontrado");
  }
});

module.exports = server;
