import React from "react";

import { useGlobalContext } from "../context";
import Donatations from "./Donatations";

export default function Comments() {
  const { funds, next, totalCount,setUrl } = useGlobalContext();

  const showMore = () => {
    console.log(next);
    setUrl(next);
  };
  return (
    <section className="comment-section">
      <div className="comment-section-header">
        <h2>words of support ({totalCount})</h2>
        <p>Please donate to share words of support.</p>
      </div>
      <Donatations funds={funds} />
      {next !== null && (
        <button
          type="button"
          className="btn comment-show-btn"
          onClick={showMore}
        >
          Show More
        </button>
      )}
    </section>
  );
}
