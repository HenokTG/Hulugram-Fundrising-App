import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { confirMOTP } from "../modules";
import { useGlobalContext } from "../context";

export default function AmoleModal(props) {
  const [OTPValue, setOTPValue] = useState("");
  const { returnedUuid, confirmAmole, setConfirmAmole } = useGlobalContext();
  const history = useNavigate();

  return (
    <section id="amoleModal" className="amole-modal">
      <div>
        <strong>Submit the OTP you recieved on your Phone</strong>
      </div>
      <div className="hrt-rule--horizontal"></div>
      <form
        onSubmit={(e) =>
          confirMOTP(
            e,
            props.setShowOTPMOdal,
            returnedUuid,
            history,
            setConfirmAmole
          )
        }
      >
        <input
          required
          autoFocus
          // type="number"
          id="amole-OTP-id"
          className="donation-input"
          placeholder="____"
          name="otp"
          value={OTPValue}
          onChange={(e) => setOTPValue(e.target.value.slice(0, 4))}
        />
        <button
          type="submit"
          style={{
            backgroundColor: confirmAmole && "white",
            border: confirmAmole && "2px solid black",
          }}
          className="btn cont-btn block"
        >
          {confirmAmole ? (
            <>
              <Box
                sx={{ display: "flex", justifyContent: "center", gap:"1rem" }}
              >
                <CircularProgress size="20px" sx={{ color: "white" }} />
                Confirming...
              </Box>
            </>
          ) : (
            "Confirm OTP"
          )}
        </button>
      </form>
    </section>
  );
}
