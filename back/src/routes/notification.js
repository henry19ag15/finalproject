const server = require("express").Router();
const { Notification } = require("../db.js");

server.put("/viewed", async (req, res) => {
  console.log(req.body);
  /* id del que mira SUS notificaciones*/
  const { id } = req.body;

  try {
    await Notification.findAll({
      where: {
        notification_Id: id,
      },
    }).then(res => {
      res.map(e => e.visto = true).save();

    })

    res.status(200);
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

module.exports = server;
