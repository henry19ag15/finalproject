const server = require('express').Router();
const { Post, User, Comment, Like, Notification } = require('../db.js')
const sequelize = require("sequelize")


//traerse los posts por usuarios
server.post('/getbyusers', async function (req, res) {
    console.log(req.body)

    let posts = [];
    try {
        posts = await Post.findAll({
            where: {
                autorId: req.body.payload.map(e => e)
            },
            include: [
                { model: Like }

            ]
        })

        console.log(posts)

        res.send(posts)


    } catch (error) {
        console.log(error)

    }
});

// traerse todos los post
server.get('/getAll', async function (req, res) {


    try {
        let posts = await Post.findAll({
            include: [
                { model: Like }

            ]
        });
        res.send(posts);
    } catch (error) {
        console.log(error)
    }

})
// dar like
server.post("/likes", async function (req, res) {

    const {
        idUser,
        idPost,

    } = req.body;

    let findLike = await Like.findOne({
        where: {
            userId: idUser,
            postId: idPost
        }
    })
    let findPost = await Post.findOne({
        where: { id: idPost }
    })

    console.log(findLike)

    if (!findLike) {
        try {
            await Like.create({
                userId: idUser,
                postId: idPost,

            })

            if (findPost.autorId !== idUser) {
                await Notification.create({
                    autor: idUser,
                    detail: " le ha dado like a una de tus publicaciones.",
                    about: idPost,
                    notification_Id: findPost.autorId
                });
            }
            res.status(200).send("like dado")

        } catch (error) {
            console.log(error)

        }
    }
    else {
        try {
            await Like.destroy({
                where: {
                    userId: idUser,
                    postId: idPost,
                }
            })
            send.status(200).send("like borrado")

        } catch (error) {
            console.log(error)

        }
    }
})


module.exports = server;