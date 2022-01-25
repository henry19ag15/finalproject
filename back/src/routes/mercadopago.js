const server = require("express").Router();
const mercadopago = require("mercadopago");
// Agrega credenciales

mercadopago.configure({
    access_token: "TEST-1669804256012393-012002-9bab02eee7f87d669e56773678a093ab-684896062",
});


server.post("/", function (req, res) {
    console.log(req.body)

    let preference = {
        items: [
            {
                title: "Suscripción",
                unit_price: 100,
                quantity: 1,
            },
        ],
        back_urls: {
            "success": "http://localhost:30001/feedback",
            "failure": "http://localhost:3001/feedback",
            "pending": "http://localhost:3001/feedback"
        },
        auto_return: "approved",
    };

    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            console.log("ACA",response)
            const preferenceId = response.body.id
            res.send(response.body.id);
            // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
        })
        .catch(function (error) {
            console.log(error);
        });



});

server.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});


module.exports = server;
