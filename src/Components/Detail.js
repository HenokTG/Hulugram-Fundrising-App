import React, { useState, useEffect, useRef } from "react";

import ButtonsContainer from "./Buttons";
import organizer from "../image/organizer.jpg"

import { handleScroll } from "../modules";
import { useGlobalContext } from "../context";

export default function Detail() {
  const { isWindow960, cause } = useGlobalContext();
  const {
    button_label_text,
    description,
    updated_at,
    telegram_channel,
    category_text,
  } = cause;

  console.log("Created on: ", updated_at)
  const createdAt = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(updated_at));

  const causeDetailSection = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const buttonStyle = {
    display: isScrolling ? "flex" : "none",
    position: isScrolling ? "fixed" : "relative",
  };
  
  useEffect(() => {
    window.addEventListener("scroll", () =>
      handleScroll(causeDetailSection, isScrolling, setIsScrolling)
    );

    return () => {
      window.removeEventListener("scroll", () =>
        handleScroll(causeDetailSection, isScrolling, setIsScrolling)
      );
    };
  }, [isScrolling]);

  return (
    <>
      <section ref={causeDetailSection}>
        <div className="wrapper">
          <img src={organizer} alt="icon" className="detail-img" />

          <p>
            <strong>{telegram_channel && telegram_channel.title}</strong> is
            organizing this fundraiser.
          </p>
        </div>
        <div className="hrt-rule--horizontal"></div>
        <div className="timeline-flex">
          <p>Created on {createdAt}</p>
          <h3 className="m-donation-and-time--dot-separater">•</h3>
          <span className="special-link-class">{category_text}</span>
        </div>
        <div className="hrt-rule--horizontal"></div>
        <div className="detail-text">
          <p>{description}</p>
        </div>
        <ButtonsContainer
          classN="fixxed-btn-container"
          btnLable={button_label_text}
        />

        <div className="hrt-rule--horizontal"></div>
      </section>
      {isWindow960 < 960 && (
        <ButtonsContainer
          classN="float-btn-container"
          btnLable={button_label_text}
          buttonStyle={buttonStyle}
        />
      )}
    </>
  );
}
