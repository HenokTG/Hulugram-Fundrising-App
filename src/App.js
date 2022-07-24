import React, { useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";

import "./App.css";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

import HomePage from "./pages/Home";
import ThanksPage from "./pages/Thanks";

const teleObj = window.Telegram.WebApp;
const webLink =
  "https://hulugram-fund.herokuapp.com/706699c0-0d8e-41bb-bdbe-a041833b1af7/donate";

function App() {
  useEffect(() => {
    console.log(teleObj);
    teleObj.ready();
    // teleObj.MainButton.text("Main Button");
    teleObj.MainButton.show();
    // teleObj.openLink(webLink);
  }, []);

  return (
    <div className={`App`}>
      <Router>
        <ReactNotifications />
        <Navbar />
        <Routes>
          <Route path="/:causeId/donate" element={<HomePage />} exact />
          <Route
            path="/:causeId/thanks-for-your-donation"
            element={<ThanksPage />}
            exact
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
