import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MusicBox from "../../components/music-box";
import MusicDelete from "../../components/music-delete";
import { addMusic, addPrice } from "../../redux/slice/music";
import MusicService from "../../service/music-service";
import OrderService from "../../service/order";
import axios from "../../service/api";
import "./music.scss";

const Music = () => {
  const [showMusic, setShowMusic] = useState(false);
  const { musics, musicData, price } = useSelector((state) => state.music);
  const { discount } = useSelector((state) => state.discount);
  const { tables } = useSelector((state) => state.table);
  const [showAlert, setShowAlert] = useState(false);
  const [musicItem, setMusicItem] = useState({});
  const [musicIndex, setMusicIndex] = useState(0);
  const navigate = useNavigate();
  const noneMusic = musicData.filter((c) => c.music.musics.length == 0);
  const dispatch = useDispatch();
  const tableId = localStorage.getItem("tableId");
  const lat = localStorage.getItem("lat");
  const lon = localStorage.getItem("lon");
  const second = new Date().getSeconds();

  useEffect(() => {
    noneMusic.map((item) => {
      MusicService.deleteMusic(dispatch, item._id);
    });
  }, [second]);

  const musicSchema = {
    tableId: tableId,
    music: { musics },
    orderedAt: new Date(),
    price,
    agent: {
      lat,
      lon,
    },
  };

  const deleteMusic = (idx) => {
    dispatch(addMusic(musics.filter((c, id) => id !== idx)));
  };
  const submitMusic = () => {
    if (lat && lon) {
      MusicService.postMusic(dispatch, musicSchema);
      dispatch(addMusic([]));
      dispatch(addPrice(0));
    }
  };

  const showAlertHandler = (item, idx) => {
    setMusicItem(item);
    setMusicIndex(idx);
    setShowAlert(true);
  };

  return (
    <>
      <div className="relative text-light">
        {showAlert == true ? (
          <MusicDelete
            music={musicItem}
            id={musicIndex}
            setShowAlert={setShowAlert}
          />
        ) : (
          ""
        )}
        <div className="music-header pt-2 d-flex align-items-center justify-content-between">
          <h4>Musiqalar</h4>
          <div
            onClick={() => navigate("/home")}
            className="add-box d-flex align-items-center px-2 cursor-pointer active-orange"
          >
            <i className="bi bi-house fs-3 cursor-pointer active-orange"></i>
          </div>
        </div>
        <div className="my-musics py-3">
          <h4>Mening musiqalarim</h4>
          <div className="musics">
            {musics.length > 0 ? (
              <div className="musics relative">
                {musics.map((item, id) => (
                  <p className="text-light">
                    <i
                      className="bi bi-x-lg"
                      onClick={() => deleteMusic(id)}
                    ></i>
                    <span>
                      <i className="bi bi-music-note-beamed orange"></i>
                      {item.musicName}
                      .mp3
                    </span>
                  </p>
                ))}
                <button onClick={() => submitMusic()}>Buyurtma berish</button>
              </div>
            ) : (
              <small className="d-block text-center orange">
                Tanlangan musiqalar topilmadi!!!
              </small>
            )}
          </div>
          <div className="current-music py-4">
            <h4>Ijro etilayotganlar</h4>
            <div className="playing-musics">
              {musicData.map(
                (item) =>
                  item.music.musics.length > 0 && (
                    <div className="table-name">
                      <p>
                        {item.tableId == tableId ? (
                          <p className="orange">Sizning musiqalaringiz</p>
                        ) : (
                          <p>
                            {tables.filter((c) => c._id == item.tableId)
                              .length > 0 &&
                              tables.filter((c) => c._id == item.tableId)[0]
                                .title}
                          </p>
                        )}
                      </p>
                      {item.music.musics.map((music, idx) => (
                        <div>
                          <p
                            className={`${
                              music.isEnding == true
                                ? "text-secondary"
                                : "text-light"
                            } ${
                              music.complaint == true && "complaint"
                            } d-flex aling-items-center m-0 p-0 justify-content-between`}
                          >
                            <span>
                              {" "}
                              {music.complaint !== true ? (
                                <i className="bi bi-music-note-beamed orange"></i>
                              ) : (
                                <i className="bi bi bi-exclamation-circle mx-2"></i>
                              )}
                              {music.musicName}
                              .mp3
                            </span>
                            <span className="d-flex align-items-center gap-2">
                              {music.isPlaying !== true ? (
                                <div>
                                  {music.isEnding == true ? (
                                    <i className="bi bi-check-lg"></i>
                                  ) : (
                                    <i className="bi bi-clock"></i>
                                  )}
                                </div>
                              ) : (
                                <div className={"animation-line"}>
                                  <span />
                                  <span />
                                  <span />
                                </div>
                              )}
                              {tableId == item.tableId && (
                                <span
                                  onClick={() => showAlertHandler(item, idx)}
                                >
                                  {music.isEnding !== true &&
                                    music.isPlaying !== true && (
                                      <i className="bi bi-x-lg"></i>
                                    )}
                                </span>
                              )}
                            </span>
                          </p>
                          {music.complaint == true && (
                            <small className="">Qoshiq nomi tushunarsiz</small>
                          )}
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
          <button onClick={() => setShowMusic(true)}>Musiqa qoshish</button>
        </div>
      </div>
      <MusicBox state={showMusic} setState={setShowMusic} />
    </>
  );
};

export default Music;
