import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./order.scss";

const Unknown = ({ setState }) => {
  const navigator = useNavigate();
  const [error, setError] = useState(false);
  function getUserLocation() {
    // Geolokatsiya xizmati mavjudligini tekshirish
    if ("geolocation" in navigator) {
      // Geolokatsiya ma'lumotlarini olish
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Geolokatsiya ma'lumotlarini olish
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;

          // Foydalanuvchi manzilini yaratish
          localStorage.setItem("lat", latitude);
          localStorage.setItem("lon", longitude);
          setState(false);
        },
        function (error) {
          // Xatolik bo'lganda
          window.location.reload();
          navigator("/");
        }
      );
    } else {
      // Geolokatsiya xizmati mavjud emas
      console.error("Geolokatsiya xizmati bu brauzerda mavjud emas.");
    }
  }

  return (
    <div className="unknown relative text-light">
      <div className="unknown-box">
        {error == false ? (
          <h5>Buyurtma berish uchun Joylashuvga ruxsat berishingiz kerak</h5>
        ) : (
          <h5>
            Siz joylashuvga ruxsatni blocklagansiz. <br />{" "}
            <span className="orange"></span>
          </h5>
        )}
        <button onClick={() => getUserLocation()}>
          Joylashuvni ko'rsatish
        </button>
      </div>
    </div>
  );
};

export default Unknown;
