import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MercadoPago() {

    const FORM_ID = 'payment-form';
    let idPrueba = ""

    const { id } = useParams()
    useEffect(() => {
        axios.post("http://localhost:3001/mercadopago/", {}).then((res) => {
            idPrueba=res.data;
            console.log(idPrueba)
            prueba()
        }).catch((error) => { console.log("ACA ERROR", error) })

    }, [])

 

    let prueba = (() => {
        
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
            script.setAttribute('data-preference-id', idPrueba);
            const form = document.getElementById(FORM_ID);
            form.appendChild(script)  
    })


    return (
        <div>
            <h2>Hola</h2>
            
            <form id={FORM_ID} method="GET" />
        </div>
    )

}