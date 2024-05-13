import React from "react";
import style from "./style.module.css";
import { FaWindowClose } from "react-icons/fa";

export default function Countrys(props) {
  const { name, flags, area, population, capital } = props;

  return (
    <div key={props.id} className={style.card}>
      <img src={flags.png} alt={flags.alt} />
      <h3>Name: {name.common}</h3>
      <p>Area: {area}</p>
      <p>Population: {population}</p>
      <p>Capital: {capital}</p>
      <button
        className={style.btn}
        onClick={() => {
          props.deleteBtn(name.common);
        }}
      >
        <FaWindowClose />
      </button>
    </div>
  );
}
