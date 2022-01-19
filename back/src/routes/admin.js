const server = require("express").Router();
const { User } = require("../db");



//traer usuarios
server.get('/user', async function(req, res){
    try {
        let users = User.findAll();
        res.send(users)
    } catch (error) {
        res.status(400).json({
            error:true,
            message:'Error al buscar el usuario'
        })
        
    }
});
//Buscar usuario por id
server.get('/user/:id', async function(req,res){
  try {
      let user = User.findOne({
          where:{id:req.params.id},
      })
      res.status(200).send(user)

  } catch (error) {
      res.status(400).json({
          error:true,
          message:'Error al buscar el usuario'
      })
      
  }
});

//modifica un usuario para que tenga privilegios de administrador
server.put('/isAdmin/:id',  async function(req, res){
    try {
        User.findByPk(req.params.id)
        (function(users){
            users.rol='admin';
            users.save();
            res.status(201).send('Este usuario ahora es administrador')
        })
    } catch (error) {
        console.log(error)
    }
});
//borrar un usuario
server.delete('/:id',  async function(req,res){
    try {
        let user=User.findByPk(req.params.id);
        (function(users){
            if(!users){
                //si no encuentra al usuario devuelve el error
                return res.status(400).send('Usuario Inexistente');
            }else{
                //pasamos el usuario con la propiedad activo a false
                users.active =false;
                user.save();
                return res.status(200).send('Usuario inactivo')
            }

        })
    } catch (error) {
        console.log(error)
    }

});







module.exports = server;
