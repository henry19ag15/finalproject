const { Router } = require('express');
const {User} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//import all routers;
const Admin = require('./admin')
const Posts = require('./posts')
const User = require('../../api/src/routes/user')

const router = Router();

router.use('/admin', Admin);
router.use('./posts', Posts);
rotuer.use('./user', User)

router.post("/register", async function (req, res) {

    console.log(req.body)

    try {
        const { uid,email} = req.body.payload.user;
        await User.create({
            id:uid,
            email,
        })
        res.status(200).send("Usuario creado correctamente")

    } catch (error) {
        console.log(error)

    }
    


})




module.exports =router;