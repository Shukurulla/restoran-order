import React, { useState } from "react";
import { useSelector } from "react-redux";
import Hamburger from "../../../public/hamburger.png";
import "./karaoke.scss";
import io from "socket.io-client";
const socket = io.connect("https://restoran-service.onrender.com");

const Karakoe = () => {
  const { karaoke } = useSelector((state) => state.karaoke);
  const [msg, setMsg] = useState(false);
  const f = new Intl.NumberFormat("es-sp");
  const tableId = localStorage.getItem("tableId");
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");

  const submitKaraoke = () => {
    try {
      socket.emit("post_karaoke", { title: tableId, agent: { lat, lon } });
    } catch (error) {}
  };

  return (
    <div className="relative w-100 text-light">
      <div className="karaoke-header">
        <h4>Karaoke</h4>
        <div>
          <img src={Hamburger} alt="" />
        </div>
      </div>
      <div className="karaoke-body">
        {msg == true && (
          <div className="msg-box">
            <h3>Buyurtmangiz qabul qilindi</h3>
          </div>
        )}
        <div className="karaoke-box">
          <h4>
            Karaoke uchun soatiga{" "}
            <span className="orange">{f.format(karaoke[0].persent)}so'm</span>
          </h4>
          <button onClick={() => submitKaraoke()}>Buyurtma berish</button>
        </div>
      </div>
    </div>
  );
};

export default Karakoe;
