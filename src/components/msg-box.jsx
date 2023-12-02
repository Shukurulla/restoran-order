import React from "react";
import { Link } from "react-router-dom";

const MsgBox = ({ status }) => {
  return (
    <div className={`msg ${status == "success" ? "success" : "failure"}`}>
      <div className="msg-box">
        <i
          className={`bi text-success ${
            status == "success" ? "bi-check2-circle" : "bi-x-circle text-danger"
          }`}
        ></i>
        <p className="text-center">
          {status == "success"
            ? "Tez orada buyurtmangiz yetkaziladi"
            : "Kechirasiz hatolik yuz berdi"}
        </p>
        <Link to={"/"}>Menuga qaytish</Link>
      </div>
    </div>
  );
};

export default MsgBox;
