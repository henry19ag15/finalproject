const server = require("express").Router();
const mercadopago = require("mercadopago");
const { Order } = require('../db.js');
// Agrega credenciales

mercadopago.configure({
    access_token: "TEST-5248169896209640-012521-46f7f8d47c498f0b37bbdc5a76c2fea3-684896062",
});


server.post("/", function (req, res) {
    console.log(req.body.uid)



    let preference = {

        items: [
            {
                title: "ShareIt Premium",
                unit_price: 10,
                quantity: 1,
            },
        ],

        back_urls: {
            "success": "https://pruebaconbackreal-pg15.herokuapp.com/mercadopago/feedback",
            "failure": "http://localhost:3001/feedback",
            "pending": "http://localhost:3001/feedback"
        },
        auto_return: "approved",

        external_reference: req.body.uid


    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            console.log("ACA", response)
            const preferenceId = response.body.id
            res.send(response.body.id);
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        })
        .catch(function (error) {
            console.log(error);
        });



});

server.get('/feedback', async function (req, res) {
    console.log(res.)

    try {
        const payment_id = req.query.payment_id
        const payment_status = req.query.status
        const external_reference = req.query.external_reference

        if (payment_status === "approved") {

            await Order.create({
                payment_status,
                payment_id,
                userId: external_reference,
            })
        }
        res.redirect("http://localhost:3000")
    } catch (error) {
        console.log(error)
        res.redirect(`http://localhost:3000/asd`)

    }


});




module.exports = server;
