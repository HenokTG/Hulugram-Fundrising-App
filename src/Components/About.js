import React from "react";

import { useGlobalContext } from "../context";

export default function About() {
  const { isWindow960, cause } = useGlobalContext();
  const { photo, title } = cause;
  return (
    <main className="support-cause">
      <div>
        <img src={photo && photo.photo} alt="cause-img" className="cause-img" />
      </div>
      {isWindow960 < 960 && <h2 className="cause-title">{title}</h2>}
    </main>
  );
}
