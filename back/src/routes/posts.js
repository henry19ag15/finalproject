const server = require('express').Router();
const { Post, User, Comment } = require('../db.js')
const sequelize = require("sequelize")

//crear post 
server.post('/', async function (req, res) {
    try {
        const { photoURL, creator, detail } = req.body
        await Post.create({
            photo: photoURL,
            creator: creator,
            detail: detail,
        })
        res.status(200).send("se creo el post")

    } catch (error) {
        console.log(error)
    }


})
//traerse los posts por usuarios
server.get('/getbyusers', async function (req, res) {


    let posts = [];
    try {
        posts =  await Post.findAll({
            where: {
                creator:req.body.payload.map(e => e)
            }

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
        let posts = await Post.findAll();
        res.send(posts);
    } catch (error) {
        console.log(error)
    }

})
// dar like
server.put("/likes", async (req, res) => {

    console.log("Esto es el body: ", req.body);
    const idUser = req.body[0];
    const idPost = req.body[1];

    let post = await Post.findOne({
        where: { id: idPost }
    })

    if (!post.likes.includes(idUser)) {
        try {
            await post.update(
                { 'likes': sequelize.fn('array_append', sequelize.col('likes'), idUser) },
            );
            res.status(200).send("Se ha dado Like");

        } catch (error) {
            console.log(error)
        }
    }
    else {
        try {
            await post.update(
                { 'likes': sequelize.fn('array_remove', sequelize.col('likes'), idUser) }
            )
            res.status(200).send("Dislike");

        } catch (error) {
            console.log(error)

        }

    }
});



module.exports = server;