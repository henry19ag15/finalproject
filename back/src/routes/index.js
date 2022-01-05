const { Router } = require("express");
const { User } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/user", User);
router.use("/admin", Admin);
router.use("/post", Post);
router.use("/comment", Comment);

module.exports = router;
