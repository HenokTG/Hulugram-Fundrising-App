import React from "react";

import { closeModal } from "../modules";
import { ShareChannels } from "../shareCompData";
import { useGlobalContext } from "../context";

export default function ShareLink() {
  const canonical = document.querySelector("link[rel=canonical]");
  const url = canonical ? canonical.href : document.location.href;
  const { cause, setShowOTP } = useGlobalContext();

  const hrefList = [
    `https://telegram.me/share/url?text=${cause.title}&url=${url}`,
    `http://twitter.com/share?text=${cause.title}&url=${url}`,
    `https://www.facebook.com/sharer/sharer.php?u=${url}&t=${cause.title}`,
    `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${cause.title}`,
  ];

  return (
    <section id="shareModal" className="share-modal">
      <div className="modal-content">
        <span
          className="close-payment-modal"
          onClick={() => closeModal("shareModal", setShowOTP)}
        >
          &times;
        </span>
        <br />
        <div>
          <p>
            Share <strong>{cause.title}</strong> on
          </p>
        </div>
        <div className="hrt-rule--horizontal"></div>
        <div className="share-icons-wraper">
          {ShareChannels.map((elem, idx) => (
            <div key={idx} className={`share-icons-flex ${elem.specialClass}`}>
              <a href={hrefList[idx]} target="_blank" rel="noopener noreferrer">
                {elem.icon}
                {elem.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
