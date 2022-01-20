const server = require("express").Router();
const { Comment, Post, Notification, User } = require("../db.js");

// comentar
server.post("/", async function (req, res) {
  try {
    const { idUser, idPost, detail } = req.body;

    await Comment.create({
      detail: detail,
      userId: idUser,
      postId: idPost,
    });

    /* NOTIFICACION SOBRE NUEVO COMENTARIO */

    let autor = await Post.findOne({
      where: {
        id: idPost,
      },
    });

    let user = await User.findOne({
      where: {
        id: autor.id,
      },
    });

    await Notification.create({
      autor: user.id,
      details: "Ha comentado una de tus publicaciones",
      about: idPost,
    });

    res.status(200).send("comentario");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});
// eliminar comentario
server.delete("/delete/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await Comment.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Comentario eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
});

// Traerse todos los comentarios
server.get("/bringsallcomments", async function (req, res) {
  try {
    let comments = await Comment.findAll();
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error al buscar comentario",
    });
  }
});

//Traer un comentario

server.get("/bringscomments/:id", async function (req, res) {
  try {
    let comments = await Comment.findAll({
      where: { postId: req.params.id },
    });
    res.status(200).send(comments);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error al buscar comentario",
    });
  }
});
module.exports = server;
