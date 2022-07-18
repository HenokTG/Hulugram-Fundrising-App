import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";

import { useGlobalContext } from "../context";

function Loading() {
  const { isLoadingFailed } = useGlobalContext();
  return (
    <section style={{ textAlign: "center", marginTop: "10rem" }}>
      {isLoadingFailed ? (
        <div className="loading-fail">
          <SmsFailedIcon sx={{ fontSize: "4rem" }} />
          <div style={{ marginTop: "0.5rem", color: "#0d243a" }}>
            <h2>500 | Internal Server Error</h2>
          </div>
        </div>
      ) : (
        <div className="loading-success">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
          <h1 style={{ marginTop: "1rem", color: "#0d243a" }}>Loading...</h1>
        </div>
      )}
    </section>
  );
}

export default Loading;
