const server = require("express").Router();
const {  Comment } = require('../db.js')


// comentar
server.post("/", async function (req, res) {

    try {
        const {
            idUser,
            idPost,
            detail,
        } = req.body;

        await Comment.create({
            detail: detail,
            idUser: idUser,
            idPost: idPost,

        })
        res.status(200).send("comentario")

    } catch (error) {
        console.log(error)

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

module.exports = server;
