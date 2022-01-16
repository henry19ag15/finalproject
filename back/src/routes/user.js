const server = require("express").Router();
const { User } = require("../db");
const sequelize = require("sequelize");

// crear usuario
server.post("/register", async function (req, res) {
  console.log("este es el body:", req.body);

  try {
    const { uid, email, username, detail } = req.body.payload.user;

    await User.create({
      id: uid,
      email,
      username,
      detail,
    });
    res.status(200).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
  }
});
//Pasar Usuario de Activo a Inactivo
server.put("/inactive/:id", (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      post.active = false;
      post.save().then((post) => res.status(201).send(post));
    })
    .catch((err) => res.status(404).send(err));

  res.status(200).send("Usuario Inactivo");
});
//Traer todos los usuarios activos
server.get("/active", (req, res) => {
  User.findAll({
    where: {
      active: true,
    },
  })
    .then((post) => res.status(200).send(post))
    .catch((err) => res.status(404).send("No se encontraron usuarios activos"));
});

//Traer todos los usuarios
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
server.get("/:id", async function (req, res) {
  try {
    let user = await User.findOne({
      where: { id: req.params.id },
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Error al buscar el usuario",
    });
  }
});

//Modificar usurarios (cada usuario puede modificar sus propios datos)

server.put("/setting/:id", (req, res, next) => {
  console.log(req.body);
  const {
    uid,
    email,
    displayname,
    detail,
    profilephoto,
    subscribers,
    followers,
    following,
  } = req.body.payload.user;

  var usermod = {
    id: uid,
    email,
    username: displayname,
    detail,
    profilephoto,
    subscribers,
    followers,
    following,
  };
  User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      user.update(usermod).then((newUser) => {
        newUser.save();
        res.status(200).send("Usuario modificado con exito");
        return res.json(newUser);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Usuario no encontrado");
    });
});

server.delete("/destroy/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Usuario eliminado correctamente");
  } catch (error) {
    console.log(error);
  }
});

server.put("/follow", async (req, res) => {
  /* 
  idOne = el usuario que sigue o deja de seguir
  idTwo = el usuario que se sigue o se deja de seguir
  req.body porque no se por donde lo van a mandar todavia
  */
  console.log("Esto es el body: ", req.body);
  const idOne = req.body[0];
  const idTwo = req.body[1];

  let userOne = await User.findOne({
    where: { id: idOne },
  });
  let userTwo = await User.findOne({
    where: { id: idTwo },
  });

  console.log("1: ", userOne.dataValues);
  console.log("2: ", userTwo.dataValues);

  if (userOne && userTwo) {
    if (!userOne.following.includes(idTwo)) {
      try {
        await userOne.update({
          following: sequelize.fn(
            "array_append",
            sequelize.col("following"),
            idTwo
          ),
        });

        console.log("UserOneUpdate", userOne);
        await userTwo.update({
          followers: sequelize.fn(
            "array_append",
            sequelize.col("followers"),
            idOne
          ),
        });

        console.log("UserTwoUpdate", userTwo);

        res.status(200).send("Follow");
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.status(404).send("Usuario no encontrado");
  }
});

module.exports = server;
