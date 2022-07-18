import React from "react";

import googlePlay from "../image/googlePlayNoPadding.jpg";

import { useGlobalContext } from "../context";

function Thanks() {
  const { cause } = useGlobalContext();
  return (
    <section className="thanks-section">
      <header className="thanks-title">
        <h1>Thank You for the Donation!</h1>
      </header>
      <article className="thanks-content">
        <div className="confirm-message">
          <p>
            Your donation to <strong>{cause.title}</strong> is Confirmed!
          </p>
        </div>
        <div className="hrt-rule--horizontal"></div>
        <div className="thanks-message">
          <p>
            On behalf of every one at <strong>Hulugram</strong>
            <strong>
              {cause.telegram_channel && ` and ${cause.telegram_channel.title}`}
            </strong>{" "}
            thank you for your compassion and support.
          </p>
        </div>
        <div className="about-hulugram">
          <h4>About Hulugram</h4>
          <p className="hulugram-home">
            Hulugram is a telegram based superapp that addresses the needs of
            the users all in one place. Furthermore, it is a simple, fun and an
            easy to use app. If you want to learn more about us visit{" "}
            <a href="https://www.hulugram.org/">
              <strong>our website</strong>
            </a>
            .
          </p>
          <p className="hulugram-apps">
            For best user experience download{" "}
            <strong>Hulugram Application</strong>{" below"}.
          </p>
          <div className="hulugram-downlink">
            <a href="https://play.google.com/store/apps/details?id=plus.ride.huluchat">
              <div className="hulugram-downflex">
                <img src={googlePlay} alt="Google play icon" />
                <div className="google-play-text">
                  <h4>GET IT ON</h4>
                  <h2>Google Play</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

export default Thanks;
