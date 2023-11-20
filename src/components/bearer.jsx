import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Bearer = () => {
  const { id } = useParams();
  const { tables } = useSelector((state) => state.table);
  const navigate = useNavigate();

  const auth = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      localStorage.setItem("lat", position.coords.latitude);
      localStorage.setItem("lon", position.coords.longitude);
    }
    localStorage.setItem("tableId", id);
  };

  useEffect(() => {
    if (tables.filter((c) => c._id === id)) {
      auth();
      navigate("/");
    }
  }, []);

  return (
    <div className="bearer ">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Bearer;
