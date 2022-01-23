const { Router } = require("express");




//import all routers;
const User = require("./user");
const Admin = require("./admin");
const Posts = require("./posts");
const Comment = require("./comment");
const Notification= require("./notification")



const router = Router();


router.use("/admin", Admin);
router.use("/user", User);
router.use("/posts", Posts);
router.use("/comment", Comment);
router.use("/notification",Notification);


module.exports =router;