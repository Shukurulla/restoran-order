import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hamburger from "../../../public/hamburger.png";
import "./karaoke.scss";
import io from "socket.io-client";
import MsgBox from "../../components/msg-box";
const socket = io.connect("https://api.kepket.uz");

const Karakoe = () => {
  const { karaoke } = useSelector((state) => state.karaoke);
  const [msg, setMsg] = useState(false);
  const f = new Intl.NumberFormat("es-sp");
  const tableId = localStorage.getItem("tableId");
  const equalTable = karaoke.filter((c) => c.tableId == tableId);
  const [status, setStatus] = useState(false);

  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");

  const submitKaraoke = () => {
    try {
      if (equalTable.filter((c) => c.place == "first").length > 0) {
        socket.emit("post_karaoke", {
          title: tableId,
          tableId,
          agent: { lat, lon },
        });
        socket.on("get_message", (data) => {
          if (data.msg == "success") {
            setMsg(true);
            setStatus("success");
          }
          if (data.msg == "error") {
            setMsg(true);
            setStatus("error");
          }
        });
      } else {
        socket.emit("post_karaoke", {
          title: tableId,
          tableId,
          place: "first",
          agent: { lat, lon },
        });
        socket.on("get_message", (data) => {
          if (data.msg == "success") {
            setMsg(true);
            setStatus("success");
          }
          if (data.msg == "error") {
            setMsg(true);
            setStatus("error");
          }
        });
      }
    } catch (error) {}
    console.log(equalTable.filter((c) => c.place == "first"));
  };

  useEffect(() => {
    socket.on("get_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return msg ? (
    <MsgBox status={status} />
  ) : (
    <div className="relative w-100 text-light">
      <div className="karaoke-header">
        <h4>Karaoke</h4>
        <div>
          <img src={Hamburger} alt="" />
        </div>
      </div>
      <div className="karaoke-body">
        <div className="karaoke-box">
          <h4>
            Karaoke uchun soatiga{" "}
            <span className="orange">{f.format(20000)}so'm</span>
          </h4>
          <button onClick={() => submitKaraoke()}>Buyurtma berish</button>
        </div>
      </div>
    </div>
  );
};

export default Karakoe;
