import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setTableId } from "../redux/slice/tables";

const Bearer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { tables, tableId } = useSelector((state) => state.table);
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    dispatch(setTableId(id));
  }, []);
  setTimeout(() => {
    tables.map((item) => {
      if (item._id === id) {
        localStorage.setItem("tableId", id);
        navigate("/");
      } else {
        setMsg(!msg);
      }
    });
  }, 1000);

  return (
    <div className="bearer ">
      {!msg ? (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div>Kechirasiz bu stolning id sini topolmadik</div>
      )}
    </div>
  );
};

export default Bearer;
