import React from "react";
import { useEffect } from "react";
import style from "./Premium.module.scss";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import shareItImg from '../../assets/logo3.png'

export default function Premium({ setPremiumModalView, data }) {
  useEffect(() => {
    const script = document.createElement("script"); //Creo un elemento html script
    const attr_data_preference = document.createAttribute("data-preference-id"); //Creo un nodo attribute
    attr_data_preference.value = data; //Le asigno como valor el id que devuelve mercado pago

    // Agrego atributo al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    document.getElementById("form1").appendChild(script);
    return () => {
      document.getElementById("form1").removeChild(script);
    };
  }, [data]);

  return (
    <div className={style.allPremium}>

      <form className={style.formPremium} id="form1">
        <div className={style.btnCLoseBox}>
          <button onClick={() => setPremiumModalView(false)}><AiOutlineCloseCircle /></button>
        </div>
        <div className={style.imgBox}>
          <img src={shareItImg} alt="" />
          <p className={style.textPremium}>Premium</p>
        </div>
        <div className={style.descripcionBox}>
          <p className={style.text1}>Con ShareIt Premium podras compartir tener algunas funcionalidades extras más </p>
          <p className={style.text2}>a tan solo</p>
          <p className={style.text3}>$10</p>


        </div>


      </form>
    </div>
  );
}
