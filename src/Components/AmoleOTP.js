import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { confirMOTP } from "../modules";
import { useGlobalContext } from "../context";

export default function AmoleModal(props) {
  const [OTPValue, setOTPValue] = useState("");
  const { returnedUuid } = useGlobalContext();
  const history = useNavigate();

  return (
    <section id="amoleModal" className="amole-modal">
      <div>
        <strong>Submit the OTP you recieved on your Phone</strong>
      </div>
      <div className="hrt-rule--horizontal"></div>
      <form
        onSubmit={(e) =>
          confirMOTP(e, props.setShowOTPMOdal, returnedUuid, history)
        }
      >
        <input
          required
          autoFocus
          type="number"
          id="amole-OTP-id"
          className="donation-input"
          name="otp"
          value={OTPValue}
          onChange={(e) => setOTPValue(e.target.value.slice(0, 5))}
        />
        <button type="submit" className="btn cont-btn block">
          Confirm OTP
        </button>
      </form>
    </section>
  );
}
