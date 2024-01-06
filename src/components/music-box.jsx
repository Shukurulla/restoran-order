import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMusic, addPrice } from "../redux/slice/music";

const MusicBox = ({ state, setState }) => {
  const [musicName, setMusicName] = useState("");
  const [musics, setMusics] = useState([]);
  const { price } = useSelector((state) => state.music);
  const musicData = useSelector((state) => state.music.musics);
  const [musicPrice, setMusicPrice] = useState(7000);
  const dispatch = useDispatch();

  const addMusics = (val) => {
    setMusics([
      ...musics,
      { musicName: val, isPlaying: false, isEnding: false, price: musicPrice },
    ]);
    setMusicName("");
  };
  const deleteMusic = (val) => {
    setMusics(musics.filter((c) => c !== val));
    dispatch(addPrice(price - musicPrice));
  };

  const submitMusic = () => {
    dispatch(addMusic(musicData.concat(musics)));
    dispatch(addPrice(musics.length * musicPrice + price));
    setState(false);
    setMusics([]);
    setMusicName("");
  };

  return (
    <div className={`music-box ${state == true ? "show" : "hide"}`}>
      <div className="title">Musiqa buyurtma berish</div>
      <div className="service-info">
        <p className="orange">Musiqa narxini belgilash</p>
        <select
          value={musicPrice}
          onChange={(e) => setMusicPrice(+e.target.value)}
        >
          <option value={7000}>7.000 so'm</option>
          <option value={10000}>10.000 so'm</option>
          <option value={15000}>15.000 so'm</option>
        </select>
      </div>
      <div className="add-box">
        <input
          type="text"
          value={musicName}
          placeholder="Musiqa nomini kiriting..."
          onChange={(e) => setMusicName(e.target.value)}
        />
        <button
          className="music-btn"
          disabled={musicName == ""}
          onClick={() => addMusics(musicName)}
        >
          Qo'shish
        </button>
      </div>
      <div className="select-music">
        {musics.map((item) => (
          <p>
            <span>
              {" "}
              <i className="bi bi-music-note-beamed orange"></i>{" "}
              {item.musicName}.mp3
            </span>
            <i className="bi bi-x-lg" onClick={() => deleteMusic(item)}></i>
          </p>
        ))}
      </div>
      <div className="submit">
        <button className="cancel-btn" onClick={() => setState(false)}>
          Bekor Qilish
        </button>
        <button
          className="submit-btn"
          disabled={musics.length == 0}
          onClick={() => submitMusic()}
        >
          Yuborish
        </button>
      </div>
    </div>
  );
};

export default MusicBox;
