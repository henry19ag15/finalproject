const { Router } = require("express");

//import all routers;
const Admin = require("./admin");
const Posts = require("./posts");
const User = require("./user");

const router = Router();

router.use("/admin", Admin);
router.use("/posts", Posts);
router.use("/user", User);

module.exports = router;
