import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MsgBox = ({ status, message }) => {
  const navigate = useNavigate();

  const navigateHandler = async () => {
    await navigate("/");
    window.location.reload();
  };

  return (
    <div className={`msg ${status == "success" ? "success" : "failure"}`}>
      <div className="msg-box">
        <i
          className={`bi text-success ${
            status == "success" ? "bi-check2-circle" : "bi-x-circle text-danger"
          }`}
        ></i>
        <p className="text-center">{message}</p>
        <button onClick={() => navigateHandler()}>Bosh menuga qaytish</button>
      </div>
    </div>
  );
};

export default MsgBox;
