const server = require("express").Router();
const { User } = require("../db");

// crear usuario
server.post("/register", async function (req, res) {
  console.log(req.body)

  try {
    const { uid, email, displayName } = req.body.payload;
    await User.create({
      id: uid,
      email,
      username: displayName,
    });
    res.status(200).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
  }
});

server.delete("/user/destroy/:id", async function (req, res) {
  try {
    //falta foto
    const { id } = req.params;
    await User.destroy({
      id,
    });
    res.status(200).send("Usuario eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
});

server.get("/", async function (req, res) {
  try {
    let users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error al buscar los usuarios",
    });
  }

});

//Buscar usuario por id
server.get("/user/:id", async function (req, res){
  try {
    let user =await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user);
  } catch(error) {
    res.status(400).json({
      error: true,
      message: "Error al buscar el usuario",
    });
  }
});



module.exports = server;

