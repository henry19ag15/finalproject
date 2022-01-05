const { Router } = require("express");
const { User } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

<<<<<<< HEAD
//import all routers;
const Admin = require('./admin')
const Posts = require('./posts')
const User = require('../../api/src/routes/user')

=======
>>>>>>> 12cdee9fa39978140d9bf4d29f1820878bebd0be
const router = Router();

router.use('/admin', Admin);
router.use('./posts', Posts);
rotuer.use('./user', User)

router.use("/user", User);
router.use("/admin", Admin);
router.use("/post", Post);
router.use("/comment", Comment);

module.exports =router;