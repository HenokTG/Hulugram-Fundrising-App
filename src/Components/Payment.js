import React, { useState, useEffect } from "react";

import AmoleOTP from "./AmoleOTP";

import {
  closeModal,
  fetchPaymentMethod,
  selectPaymentMethod,
  continuePayment,
} from "../modules";
import { useGlobalContext } from "../context";

export default function Payment() {
  const { cause, setReturnedUuid, showOTP, setShowOTP} = useGlobalContext();

  const [paymentList, setPaymentList] = useState([]);
  const [payValue, setPayValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [paymentProivderId, setPaymentProivderId] = useState(null);

  useEffect(() => {
    fetchPaymentMethod(setPaymentList);
  }, []);

  return (
    <>
      <section id="payModal" className="payment-modal">
        <div className="modal-content">
          <span
            className="close-payment-modal"
            onClick={() => closeModal("payModal", setShowOTP)}
          >
            &times;
          </span>
          <br />
          {showOTP ? (
            <AmoleOTP setShowOTPMOdal={setShowOTP} />
          ) : (
            <div>
              <div>
                <p>
                  You're supporting <strong>{cause.title}</strong>
                </p>
              </div>
              <div className="hrt-rule--horizontal"></div>
              <form
                id="payment-form"
                onSubmit={(e) =>
                  continuePayment(
                    e,
                    setShowOTP,
                    cause,
                    paymentProivderId,
                    setReturnedUuid
                  )
                }
              >
                <label htmlFor="donate-id">Enter Your Donations Here</label>
                <div className="donate-div-wraper">
                  <strong id="ETB-currency">ETB</strong>
                  <input
                    required
                    autoFocus
                    min={0}
                    type="number"
                    id="donate-id"
                    className="donation-input"
                    name="donate"
                    value={payValue}
                    onChange={(e) => setPayValue(e.target.value.slice(0, 6))}
                  />
                  <span id="float-point">.00</span>
                </div>
                <div className="phone-div-wraper">
                  <span id="et-code-span">+251</span>
                  <input
                    required
                    type="number"
                    id="phone-id"
                    className="donation-input"
                    name="phone"
                    value={phoneValue}
                    onChange={(e) => setPhoneValue(e.target.value.slice(0, 9))}
                  />
                </div>
                <textarea
                  type="text-area"
                  name="comment"
                  id="comment-id"
                  className="donation-input"
                  rows="5"
                  placeholder="Enter your well wishs here"
                />
                <div className="hrt-rule--horizontal"></div>

                <h4>Choose payment method</h4>
                <div className="pay-method-link">
                  {paymentList.map((paymentOn) => {
                    const { id, name, image } = paymentOn;
                    const elemId = `pay-by-${name}`;
                    return (
                      <div
                        key={id}
                        id={elemId}
                        className="payment-wrapper"
                        onClick={(e) =>
                          selectPaymentMethod(
                            e,
                            id,
                            elemId,
                            setPaymentProivderId
                          )
                        }
                      >
                        <img
                          src={image}
                          alt="Telebirr icon"
                          className="detail-img"
                        />

                        <strong>{name}</strong>
                      </div>
                    );
                  })}
                </div>
                <div className="hrt-rule--horizontal"></div>

                <button type="submit" className="btn cont-btn block">
                  Continue
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
