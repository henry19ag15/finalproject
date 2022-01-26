const server = require("express").Router();
const { User, Follower, Following, Suscriber, Suscripto, Post, Notification } = require("../db");
const sequelize = require("sequelize")


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
          Follower.destroy({
            where: {
              autorId: idTwo,
              follower_Id: idOne
  
            }
  
          })
          Following.destroy({
            where: {
              autorId: idOne,
              followin_Id: idTwo
  
            }
  
          })
          res.send("Se ha dejado de seguir")
  
        } catch (error) {
          console.log(error)
  
        }
  
  
      } else {
        try {
          Follower.create({
            autorId: idTwo,
            follower_Id: idOne
          })
          Following.create({
            autorId: idOne,
            followin_Id: idTwo
          })
  
  
          /* NOTIFICACION SOBRE SEGUIDO */
  
          await Notification.create({
            autor: idOne,
            detail: "Te ha empezado a seguir",
            about: idTwo,
            notification_Id:idOne
          });
          res.send("Se ha empezado a seguir")
  
  
        } catch (error) {
          console.log(error)
  
        }
  
      }
  
  
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
          Follower.destroy({
            where: {
              autorId: idTwo,
              follower_Id: idOne
  
            }
  
          })
          Following.destroy({
            where: {
              autorId: idOne,
              followin_Id: idTwo
  
            }
  
          })
          res.send("Se ha dejado de seguir")
  
        } catch (error) {
          console.log(error)
  
        }
  
  
      } else {
        try {
          Follower.create({
            autorId: idTwo,
            follower_Id: idOne
          })
          Following.create({
            autorId: idOne,
            followin_Id: idTwo
          })
  
  
          /* NOTIFICACION SOBRE SEGUIDO */
  
          await Notification.create({
            autor: idOne,
            detail: "Te ha empezado a seguir",
            about: idTwo,
            notification_Id:idOne
          });
          res.send("Se ha empezado a seguir")
  
  
        } catch (error) {
          console.log(error)
  
        }
  
      }
  
  
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
          Follower.destroy({
            where: {
              autorId: idTwo,
              follower_Id: idOne
  
            }
  
          })
          Following.destroy({
            where: {
              autorId: idOne,
              followin_Id: idTwo
  
            }
  
          })
          res.send("Se ha dejado de seguir")
  
        } catch (error) {
          console.log(error)
  
        }
  
  
      } else {
        try {
          Follower.create({
            autorId: idTwo,
            follower_Id: idOne
          })
          Following.create({
            autorId: idOne,
            followin_Id: idTwo
          })
  
  
          /* NOTIFICACION SOBRE SEGUIDO */
  
          await Notification.create({
            autor: idOne,
            detail: "Te ha empezado a seguir",
            about: idTwo,
            notification_Id:idOne
          });
          res.send("Se ha empezado a seguir")
  
  
        } catch (error) {
          console.log(error)
  
        }
  
      }
  
  
    }
  
  });
  module.exports = server;