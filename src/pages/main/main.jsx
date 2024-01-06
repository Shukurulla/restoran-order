import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./main.scss";

const Main = () => {
  const navigate = useNavigate();
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");
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
        },
        function (error) {
          // Xatolik bo'lganda
          console.error(
            "Geolokatsiya ma'lumotlarini olishda xatolik:",
            error.message
          );
        }
      );
    } else {
      // Geolokatsiya xizmati mavjud emas
      console.error("Geolokatsiya xizmati bu brauzerda mavjud emas.");
    }
  }
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="relative text-light main">
      <div className="title-box">
        <h2>
          <span className="orange">Karavan</span> Restoraniga xush kelibsiz!!!
        </h2>

        <p>Bu yerda siz buyurtmalarni online yuborishingiz mumkin</p>
        <p className="orange">Iltimos joylashuvga ruxsat bering</p>
        <button onClick={() => navigate("/home")}>Boshlash</button>
      </div>
    </div>
  );
};

export default Main;
