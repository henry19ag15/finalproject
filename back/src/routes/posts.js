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
    console.log(req.body)

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
// Realizar  comentarios
server.post("/comments", async function (req, res) {

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
        res.status(200).send("Comentario creado con exito")

    } catch (error) {
        console.log(error)

    }


});


//borrar post

server.delete("/destroy/:id", async function (req, res) {
    try {
      const { id } = req.params;
      await Post.destroy({
        where:{
          id
        }
        
      });
      res.status(200).send("Post eliminado correctamente");
    } catch (error) {
      console.log(error);
    }
  });

//Traer un comentario

server.get("/bringscomments/:id", async function (req, res) {
    try {
      let user = await Comment.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(user);
    } catch (error) {
      res.status(400).json({
        error: true,
        message: "Error al buscar comentario",
      });
    }
  });


// eliminar comentario
server.delete("/commentdelete/:id", async function (req, res) {
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


  //editar post

  server.put('/setting/:id',(req, res, next)=>{
    console.log(req.body)
    const { id, detail} = req.body.payload;
    
    var postmod = {
      photo, 
      detail:detail,
      creator,
      likes,
      active 
    }
    Post.findOne({
      where:{
        id:id
      }
    }).then(post => {
      post.update(postmod)
      .then(newPost =>{
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