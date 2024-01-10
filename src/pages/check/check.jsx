import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import "./check.scss";

const Check = () => {
  const { id } = useParams();
  const { tables } = useSelector((state) => state.table);
  const { saved } = useSelector((state) => state.saved);
  const equalTables = saved?.filter((c) => c.tableId == id);
  const firstOrder =
    equalTables.length > 0 &&
    equalTables?.filter((c) => c.place === "first")[0];
  const hour = new Date().getHours();

  //Foods
  const foods = equalTables?.filter((c) => c.orderType == "food");
  const foodPrice =
    foods.length > 0 &&
    foods
      ?.map((item) => +item.savedOrder.totalPrice)
      ?.reduce((sum, num) => sum + num);

  // Musics
  const musics = equalTables?.filter((c) => c.orderType == "music");
  const musicPrice =
    musics.length > 0 &&
    musics
      ?.map((item) =>
        item.savedOrder.music.musics.map((music) => music.price).toString()
      )
      ?.reduce((sum, num) => +sum + +num);

  //Discount
  const discount = firstOrder.savedOrder?.discount == true ? 10 : 0;

  // minutes
  var hozirgiVaqt = new Date();
  var buyurtmaVaqtiObj = new Date(firstOrder.savedOrder?.orderedAt);
  var farq = hozirgiVaqt - buyurtmaVaqtiObj;
  var farqDaqiqa = Math.floor(farq / (1000 * 60));
  const tablePrice =
    (tables?.filter((c) => c._id == id)[0]?.surcharge / 60) * farqDaqiqa;

  // Karaoke
  const karaoke = equalTables?.filter((c) => c.orderType == "karaoke");

  var karaokeTime = new Date(karaoke[0]?.savedOrder.item?.orderedAt);
  var now = hozirgiVaqt - karaokeTime;
  var minutes = Math.floor(now / (1000 * 60));

  // TotalPrice
  const ofitsiantPersent = hour > 18 && hour > 4 ? 15 / 100 : 10 / 100;

  const totalPrice =
    (minutes ? minutes * (20000 / 60) : 0) +
    foodPrice +
    +musicPrice +
    tablePrice;
  const isDiscount =
    discount === 0
      ? totalPrice + totalPrice * ofitsiantPersent
      : totalPrice -
        (totalPrice + totalPrice * ofitsiantPersent * 10) / 100 +
        (totalPrice - (totalPrice + totalPrice * ofitsiantPersent * 10) / 100) *
          ofitsiantPersent;

  //Ofitsiant
  const ofitsiantPrice = isDiscount * ofitsiantPersent;

  const f = new Intl.NumberFormat("es-sp");
  useEffect(() => {
    console.log(equalTables);
  }, []);

  const checkRef = useRef();

  const screenCheck = () => {
    const checkContent = document.querySelector("#check-content");
    html2canvas(checkContent).then(function (canvas) {
      console.log(canvas.toDataURL());
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.download = "karavan_client_check";
      a.click();
    });
  };

  return equalTables.length > 0 ? (
    <div className="relative text-light py-5">
      <>
        <div className="check-content" id="check-content" ref={checkRef}>
          <h3 className="text-center">
            {tables?.filter((c) => c._id == id)[0].tableNumber}-stol
          </h3>
          <ul className="check">
            <p className="report">Barcha hisobotlar</p>
            <li>
              <li className="title">
                Vaqt (soatiga{" "}
                {f.format(tables?.filter((c) => c._id == id)[0].surcharge)}
                so'm) :
              </li>

              <ul>
                <li>
                  Kelgan vaqti:{" "}
                  {`${new Date(
                    firstOrder.savedOrder.orderedAt
                  ).getHours()}:${new Date(
                    firstOrder.savedOrder.orderedAt
                  ).getMinutes()}`}
                </li>
                <li>
                  Hozirgi vaqt:{" "}
                  {`${new Date().getHours()}:${new Date().getMinutes()}`}{" "}
                </li>
                <li>
                  Oraliq:{" "}
                  {parseInt(farqDaqiqa / 60) > 0
                    ? `${parseInt(farqDaqiqa / 60)} soat ${
                        farqDaqiqa % 60
                      } daqiqa`
                    : `${farqDaqiqa} daqiqa`}
                </li>
                <li>Jami: {f.format(tablePrice.toFixed(0))}so'm</li>
              </ul>
            </li>
            {foods.length > 0 && (
              <li>
                <li className="title">Taomlar:</li>
                <ul>
                  {foods.map((item) => {
                    const uniqueArray = Array.from(
                      new Set(
                        item.savedOrder.allOrders.map((food) => food?._id)
                      )
                    );
                    return (
                      <li className="check-food-item">
                        {uniqueArray.map((id) => (
                          <p className="m-0 p-0">
                            <span>
                              {" "}
                              {
                                item.savedOrder.allOrders.filter(
                                  (c) => c._id == id
                                ).length
                              }{" "}
                              {
                                item.savedOrder.allOrders.filter(
                                  (c) => c._id == id
                                )[0]?.foodName
                              }
                            </span>
                          </p>
                        ))}
                      </li>
                    );
                  })}
                  <li>Jami: {f.format(foodPrice)} so'm</li>
                </ul>
              </li>
            )}
            {musics.length > 0 && (
              <li>
                <li className="title"> Musiqalar :</li>
                <ul>
                  {musics.map((music) =>
                    music.savedOrder.music.musics.map((item) => (
                      <li>{item.musicName}.mp3</li>
                    ))
                  )}
                  <li>Jami: {f.format(musicPrice)}so'm</li>
                </ul>
              </li>
            )}
            {karaoke.length > 0 && (
              <li>
                Karaoke uchun 20.000 so'm:
                <ul>
                  <li>
                    Bandlik:{" "}
                    {parseInt(minutes / 60) > 0
                      ? `${parseInt(minutes / 60)} soat ${minutes % 60} daqiqa`
                      : `${minutes} daqiqa`}
                  </li>
                  <li>
                    Jami: {f.format((minutes * (20000 / 60)).toFixed())} som
                  </li>
                </ul>
              </li>
            )}
            <li className="">
              Tushlik uchun (12:00-15:00) chegirma 10%:{" "}
              {firstOrder.savedOrder.discount == true
                ? `${f.format((totalPrice * 0.1).toFixed(0))} so'm`
                : "chegirma mavjud emas"}
            </li>
            <li className="">
              Ofitsiant xizmati uchun ({ofitsiantPersent * 100}%) :{" "}
              {f.format(ofitsiantPrice.toFixed(0))}so'm
            </li>
          </ul>
          <h5 className="px-3">
            Jami Hisob:{" "}
            {f.format(
              discount === 0
                ? (totalPrice + totalPrice * ofitsiantPersent).toFixed(0)
                : isDiscount.toFixed(0)
            )}
            so'm
          </h5>
        </div>
        <button onClick={() => screenCheck()}>Checkni olish</button>
      </>
    </div>
  ) : (
    <div className="relative text-light msg">Buyurtmalar mavjud emas</div>
  );
};

export default Check;
