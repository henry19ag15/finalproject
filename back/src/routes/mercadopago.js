const server = require("express").Router();
const mercadopago = require("mercadopago");
// Agrega credenciales

mercadopago.configure({
    access_token: "TEST-5744131261849900-012314-d0b641511d07f8adc8be1c70f285658d-659924599",
});


server.post("/suscription", function (req, res) {
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
    console.log(res)
   try {
       const payment_id = req.query.payment_id
       const payment_status = req.query.status
       const external_reference =req.query.external_reference


   } catch (error) {
       
   }
});


module.exports = server;
