const server = require ('express').Router();
const {Post} = require('../db.js')

//crear post 
server.post ('/:id', (req, res) => {
    const { id, data, creator, like}=req.body
    Post.create({
        id,
        data,
        creator,
        like
    })
    .then (post => {res.status(201).send(post)})
    .catch(err => {res.status(404).send(err)})
    
})
module.exports = server;