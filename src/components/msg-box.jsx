import React from "react";
import { Link } from "react-router-dom";

const MsgBox = ({ status }) => {
  return (
    <div className={`msg ${status == "success" ? "success" : "failure"}`}>
      <div className="msg-box">
        <i
          className={`bi ${
            status == "success" ? "bi-check2-circle" : "bi-x-circle text-danger"
          }`}
        ></i>
        <p>
          {status == "success"
            ? "Tez orada buyurmangiz yetkaziladi"
            : "Kechirasiz hatolik yuz berdi"}
        </p>
        <Link to={"/"}>Menuga qaytish</Link>
      </div>
    </div>
  );
};

export default MsgBox;
