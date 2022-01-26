const server = require("express").Router();
const { Notification } = require("../db.js");

server.get("/:id", async (req, res) => {
  console.log(req.body);
  /* id del que mira SUS notificaciones*/
  const { id } = req.params;

  try {
    let busy = await Notification.findAll({
      where: {
        recieves: id,
      },
    });
    res.status(200).send(busy);
  } catch (err) {
    console.log(err);
  }
});



server.put("/visto/:id", (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  Notification.findOne({
    where: {
      id,
    },
  })
    .then((noti) => {
      noti.visto = true;
      noti.save();
    })
    .catch((err) => {
      console.log(err);
    });
});


server.get("/boolean/:id", async (req, res) => {
  console.log(req.body);
  /* id del que mira SUS notificaciones*/
  const { id } = req.params;

  try {
    let noti = await Notification.findAll({
      where: {
        recieves: id,
      },
    });
    res.status(200).send(noti);
  } catch (err) {
    console.log(err);
  }
  if(noti){
    return {
      visto: false
    }
    
  }
  res.status(200).send(noti)
});
module.exports = server;
