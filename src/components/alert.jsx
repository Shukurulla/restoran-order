import React from "react";

const Alert = ({ msg, className, setState }) => {
  setTimeout(() => {
    setState(false);
  }, [4000]);
  return (
    <div className={`alert ${className && "show"}`}>
      {msg}
      <i
        className="bi bi-check2-circle text-success"
        onClick={() => setState(false)}
      ></i>
    </div>
  );
};

export default Alert;
