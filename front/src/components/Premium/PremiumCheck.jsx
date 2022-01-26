import React from "react";
import style from './PremiumCheck.module.scss';
import {BsPatchCheckFill} from 'react-icons/bs';
import{AiOutlineCloseCircle}from 'react-icons/ai'

export default function PremiumCheck({setPremiumModalView}) {




  return (
    <div className={style.allPremium}>
      <div className={style.card}>
        <div className={style.btnCLoseBox}>
          <button onClick={() => setPremiumModalView(false)}>
            <AiOutlineCloseCircle />
          </button>
        </div>

        <div className={style.descripcionBox}>
            <p className={style.text1}>

          <BsPatchCheckFill />
            </p>

          <p className={style.text2}>Eres Premium!</p>
        </div>
      </div>
    </div>
  );
}
