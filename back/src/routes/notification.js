const server = require("express").Router();
const { Notification } = require("../db.js");

server.put("/viewed", async (req, res) => {
  console.log(req.body);
  /* id del que mira SUS notificaciones*/
  const { id } = req.body;

  Notification.update(
    { visto: true },
    { where: { notification_Id: id } }
  )


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
