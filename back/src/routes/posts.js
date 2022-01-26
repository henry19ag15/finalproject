const server = require('express').Router();
const { Post, User, Comment, Like, Notification } = require('../db.js')
const sequelize = require("sequelize")

//crear post 
server.post('/', async function (req, res) {
    try {
        const { photoURL, creator, detail, private } = req.body
        await Post.create({
            photo: photoURL,
            detail: detail,
            autorId: creator,
            private: private
        })
        res.status(200).send("se creo el post")


        /* NOTIFICACION SOBRE NUEVO POST */

        // let idPost = await Post.findOne({
        //   where: {},
        // });

        // await Notification.create({
        //   autor: creator,
        //   details: " ha publicado algo",
        //   about: idPost,
        //   recieves: user.id,
        // });

    } catch (error) {
        console.log(error)
    }


})

//borrar post

server.delete("/destroy/:id", async function (req, res) {
    try {
        const { id } = req.params;
        await Post.destroy({
            where: {
                id
            }

        });
        res.status(200).send("Post eliminado correctamente");
    } catch (error) {
        console.log(error);
    }
});


//editar post

server.put('/setting/:id', (req, res, next) => {
    console.log(req.body)
    const { id, detail } = req.body.payload;

    var postmod = {
        photo,
        detail: detail,
        creator,
        likes,
        active
    }
    Post.findOne({
        where: {
            id: id
        }
    }).then(post => {
        post.update(postmod)
            .then(newPost => {
                newPost.save()
                res.status(200).send('Post modificado con exito')
                return res.json(newPost)
            }).catch(error => { console.log(error) })

    }).catch(err => {
        console.log(err)
        res.status(404).send('Post no encontrado')
    })
})



module.exports = server;