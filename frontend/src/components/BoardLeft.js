import React from "react";
import "../pages/board.css";

const BoardLeft = ({ loading, onSendData }) => (
  <div className="board-left">
    <div className="board-left-top">
      <div className="frame-round">
        <img id="frame-round-person" src="teacher-square.jpg" alt="fake person face" />
        <img id="frame-round-frame" src="roundFrameWood2.png" alt="round wooden frame" />
      </div>
    </div>
    <div className="board-left-bottom">
      <div className="button-container">
        <button className="primary-button" onClick={onSendData} disabled={loading}>
          {loading ? "Carregando..." : "Ver professor"}
        </button>
      </div>
    </div>
  </div>
);

export default BoardLeft;
