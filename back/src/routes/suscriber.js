const server = require("express").Router();
const { User,Suscriber, Suscripto,  Notification } = require("../db");
const sequelize = require("sequelize")



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
          Suscriber.destroy({
            where: {
              autorId: idTwo,
              suscriber_Id: idOne
  
            }
  
          })
          Suscripto.destroy({
            where: {
              autorId: idOne,
              suscripto_Id: idTwo
  
            }
  
          })
          res.send("Se ha dejado de suscribir")
  
        } catch (error) {
          console.log(error)
  
        }
  
  
      } else {
        try {
          Suscriber.create({
            autorId: idTwo,
            suscriber_Id: idOne
          })
          Suscripto.create({
            autorId: idOne,
            suscripto_Id: idTwo
          })
  
          
          await Notification.create({
            autor: idOne,
            detail: "Te ha empezado a suscribir",
            about: idTwo,
            notification_Id:idOne
          });
          res.send("Se ha empezado a suscribir")
  
  
        } catch (error) {
          console.log(error)
  
        }
  
      }
  
  
    }
  
  });





module.exports = server;