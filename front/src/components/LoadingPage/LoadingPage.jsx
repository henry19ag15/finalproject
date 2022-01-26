import React from "react";
import loading from "../../sass/loading.gif";
import style from "./LoadingPage.module.scss";

export default function LoadingPage() {
  return (
    <div className={style.loadingPage}>
      <img src={loading} alt="" />
    </div>
  );
}
