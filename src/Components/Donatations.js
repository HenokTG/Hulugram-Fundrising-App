import React from "react";

import commentAvator from "../image/commentAvator.png";

function Donatations(props) {
  const { funds } = props;

  return (
    <>
      {funds.map((contrib, idx) => {
        const { funder, amount, updated_at, comment } = contrib;
        const time = Date.now() - new Date(updated_at);
        const checkHour = Math.floor(time / 1000 / 60 / 60);
        const checkDay = Math.floor(time / 1000 / 60 / 60 / 24);
        const checkWeek = Math.floor(time / 1000 / 60 / 60 / 24 / 7);
        const checkMonth = Math.floor(time / 1000 / 60 / 60 / 24 / 30);
        const checkYear = Math.floor(time / 1000 / 60 / 60 / 24 / 365.25);

        return (
          <article className="contrib-content-wraper" key={contrib.id}>
            <img
              src={commentAvator}
              alt={funder.telegramID}
              className="detail-img"
            />
            <div className="support-info">
              <h3>
                {funder.first_name} {funder.last_name}
              </h3>
              <div className="timeline-flex">
                <strong>ETB {Number(amount)}</strong>
                <h3 className="m-donation-and-time--dot-separater">•</h3>
                <span className="m-donation-and-time--time">
                  {checkYear > 0 ? (
                    <p>
                      {checkYear} year
                      {checkYear > 1 && "s"} ago
                    </p>
                  ) : checkMonth > 0 ? (
                    <p>
                      {checkMonth} month
                      {checkMonth > 1 && "s"} ago
                    </p>
                  ) : checkWeek > 0 ? (
                    <p>
                      {checkWeek} week
                      {checkWeek > 1 && "s"} ago
                    </p>
                  ) : checkDay > 0 ? (
                    <p>
                      {checkDay} day{checkDay > 1 && "s"}
                      ago
                    </p>
                  ) : checkHour > 0 ? (
                    <p>
                      {checkHour} hour
                      {checkHour > 1 && "s"} ago
                    </p>
                  ) : (
                    <p>a moment ago</p>
                  )}
                </span>
              </div>
              <p className="word-of-support">{comment}</p>
              <div className="hrt-rule--horizontal"></div>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default Donatations;
