import React from "react";

import { showModal } from "./Info";

export default function ButtonsContainer(props) {
  return (
    <div className={props.classN} style={props.buttonStyle}>
      <button
        type="button"
        className="btn donate-btn block"
        onClick={() => showModal("payModal", "shareModal")}
      >
        {props.btnLable}
      </button>
      <button
        type="button"
        className="btn share-btn block"
        onClick={() => showModal("shareModal", "payModal")}
      >
        Share
      </button>
    </div>
  );
}
