import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MusicService from "../service/music-service";

const MusicDelete = ({ id, music, setShowAlert }) => {
  const { musics } = music.music;
  const equalMusic = musics.filter((c, idx) => idx == id)[0];
  const unequalMusic = musics.filter((c, idx) => idx !== id);
  const dispatch = useDispatch();

  const deleteSchema = { ...music, music: { musics: unequalMusic } };

  const deleteHandler = () => {
    MusicService.editMusic(dispatch, music._id, deleteSchema);
    setShowAlert(false);
  };

  return (
    <div className="music-alert">
      <div className="modal-window"></div>
      <div className="delete-info">
        <p>
          <span>{equalMusic.musicName}</span> o'chirilsinmi
        </p>
        <div className="buttons">
          <button className="cancel-btn" onClick={() => setShowAlert(false)}>
            Bekor qilish
          </button>
          <button className="submit-btn" onClick={() => deleteHandler()}>
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicDelete;
