import React from "react";

import Donatations from "./Donatations";
import { useGlobalContext } from "../context";

export const showModal = (modalId, noShowModalId) => {
  const modal = document.getElementById(modalId);
  const noModal = document.getElementById(noShowModalId);
  modal.style.display = "flex";
  modal.style.justifyConent = "center";
  modal.style.alignItems = "center";
  noModal.style.display = "none";
};

export default function Info() {
  const { isWindow960, cause, funds } = useGlobalContext();
  let { total_amount, total_count, target_amount, button_label_text } = cause;
  //This is to by pass "#DIV by 0" b/s in fetched data target_amount=0
  target_amount = Number(target_amount);
  const percentage =
    target_amount === 0
      ? (total_amount / 1700) * 100
      : (total_amount / target_amount) * 100;

  const topDonations = funds
    .sort((a, b) => (Number(a.amount) < Number(b.amount) ? 1 : -1))
    .slice(0, 5);
  console.log("TOP: ", topDonations);

  return (
    <aside
      className={`info-section ${
        isWindow960 >= 960 ? "info-section-side" : undefined
      }`}
    >
      {isWindow960 < 960 && (
        <progress id="progress-bar" value={percentage.toString()} max="100">
          {percentage} %
        </progress>
      )}
      <div className="flex-container">
        <h3>{total_amount}</h3>
        <p>ETB raised of {target_amount} goal</p>
        {isWindow960 >= 960 && (
          <progress
            id="progress-bar"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            value={percentage.toString()}
            max="100"
          >
            {percentage} %
          </progress>
        )}
        <span className="total-count-span">{total_count} donations</span>
      </div>
      <div className="btn-container">
        <button
          type="button"
          className="btn share-btn block"
          onClick={() => showModal("shareModal", "payModal")}
        >
          Share
        </button>
        <button
          type="button"
          className="btn donate-btn block"
          onClick={() => showModal("payModal", "shareModal")}
        >
          {button_label_text}
        </button>
      </div>
      {isWindow960 >= 960 && (
        <div>
          <h2 style={{ margin: "2rem", textAlign: "center" }}>
            Top Donations
          </h2>
          <div style={{ marginLeft: "0.5rem" }}>
            <Donatations
              funds={topDonations}
            />
          </div>
        </div>
      )}
    </aside>
  );
}
