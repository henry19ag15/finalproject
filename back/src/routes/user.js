const server = require("express").Router();
const { User, Follower, Following, Suscriber, Suscripto, Post, Notification } = require("../db");
const sequelize = require("sequelize")

// crear usuario
server.post("/register", async function (req, res) {
  console.log("este es el body:", req.body);

  try {
    const { uid, email, displayname, detail, photoURL } = req.body;

    await User.create({
      id: uid,
      email,
      username: displayname,
      detail,
      profilephoto: photoURL
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
      include: [{
        model: Follower
      },
      { model: Following },
      { model: Suscriber },
      { model: Suscripto }
      ]

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
    let users = await User.findAll({
      include: [{
        model: Follower
      },
      { model: Following },
      { model: Suscriber },
      { model: Suscripto },
      { model: Notification }
      ]
    });
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
      include: [{
        model: Follower
      },
      { model: Following },
      { model: Suscriber },
      { model: Suscripto },
      { model: Notification }
      ]


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
  } = req.body.payload.user;

  var usermod = {
    id: uid,
    email,
    username: displayname,
    comment: detail,
    profilephoto,
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
      }).catch((error) => {
        console.log(error)
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send("Usuario no encontrado");
    });
});

server.delete("/destroy/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await Follower.destroy({
      where: {
        autorId: id
      }

    })
    await Following.destroy({
      where: {
        autorId: id
      }

    })


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

  // console.log("1: ", userOne.dataValue);
  // console.log("2: ", userTwo.dataValues);

  let follower = await Follower.findOne({
    where: {
      follower_Id: idOne,
      autorId: idTwo,
    }
  })
  console.log(follower)


  if (userOne && userTwo) {
    if (follower) {
      try {
        await Follower.destroy({
          where: {
            autorId: idTwo,
            follower_Id: idOne

          }

        })
        await Following.destroy({
          where: {
            autorId: idOne,
            followin_Id: idTwo

          }
          

        })

        await Notification.destroy({
          where: {
            autor: idOne,
            about: idTwo,
            notification_Id: idOne
          }
        });
        res.status(200).send("Se ha dejado de seguir")

      } catch (error) {
        console.log(error)

      }


    } else {
      try {
        await Follower.create({
          autorId: idTwo,
          follower_Id: idOne
        })
        await Following.create({
          autorId: idOne,
          followin_Id: idTwo
        })


        /* NOTIFICACION SOBRE SEGUIDO */

        await Notification.create({
          autor: idOne,
          detail: "Te ha empezado a seguir",
          about: idTwo,
          notification_Id: idOne
        });
        res.status(200).send("Se ha empezado a seguir")


      } catch (error) {
        console.log(error)

      }

    }


  }

});

server.put("/suscribe", async (req, res) => {
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

  // console.log("1: ", userOne.dataValue);
  // console.log("2: ", userTwo.dataValues);

  let suscriber = await Suscriber.findOne({
    where: {
      suscriber_Id: idOne,
      autorId: idTwo,
    }
  })
  console.log(suscriber)


  if (userOne && userTwo) {
    if (suscriber) {
      try {
        await Suscriber.destroy({
          where: {
            autorId: idTwo,
            suscriber_Id: idOne

          }

        })
        await Suscripto.destroy({
          where: {
            autorId: idOne,
            suscripto_Id: idTwo

          }

        })
        await Notification.destroy({
          where: {
            autor: idOne,
            about: idTwo,
            notification_Id: idOne

          }

        });
        res.send("Se ha dejado de suscribir")

      } catch (error) {
        console.log(error)

      }


    } else {
      try {
        await Suscriber.create({
          autorId: idTwo,
          suscriber_Id: idOne
        })
        await Suscripto.create({
          autorId: idOne,
          suscripto_Id: idTwo
        })


        await Notification.create({
          autor: idOne,
          detail: "Te ha empezado a suscribir",
          about: idTwo,
          notification_Id: idOne
        });
        res.send("Se ha empezado a suscribir")


      } catch (error) {
        console.log(error)

      }

    }


  }

});

module.exports = server;
