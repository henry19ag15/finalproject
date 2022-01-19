const server = require('express').Router();
const { Post, User, Comment, Like } = require('../db.js')
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

    } catch (error) {
        console.log(error)
    }


})

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

    let findLike = Like.findOne({
        where: {
            userId: idUser,
            postId: idPost
        }
    })

    if (!findLike) {
        try {
            await Like.create({
                userId: idUser,
                postId: idPost,

            })
            res.status(200).send("comentario")

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

        } catch (error) {
            console.log(error)

        }
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