const { Router } = require('express');
const {User} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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




module.exports = router;
