import React, { useState, useEffect, useContext } from "react";

import { fetchFundsData, fetchCauseData } from "./modules";

const myContext = React.createContext();

const uuid = window.location.pathname
  .split("/")
  .filter((elem) => elem !== "")[0];
//"706699c0-0d8e-41bb-bdbe-a041833b1af7";
console.log(
  "Cause uuid: ",
  window.location.pathname.split("/").filter((elem) => elem !== "")[0]
);

export const useGlobalContext = () => {
  return useContext(myContext);
};

export default function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const [cause, setCause] = useState({});
  const [returnedUuid, setReturnedUuid] = useState("");

  const [funds, setFunds] = useState([]);
  const [next, setNext] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [url, setUrl] = useState(
    `https://dev.huluchat.com/hulufund/web/causes/${uuid}/funds/`
  );

  const [isWindow960, setIsWindow960] = useState(window.innerWidth);
  const [showText, setShowText] = useState(window.innerWidth);
  const [showOTP, setShowOTP] = useState(false);
  const [confirmPay, setConfirmPay] = useState(false);
  const [confirmAmole, setConfirmAmole] = useState(false);

  useEffect(() => {
    function handleResize() {
      console.log("Window Resized! ", window.innerWidth);
      setIsWindow960(window.innerWidth);
      setShowText(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isWindow960]);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingFailed(false);
    fetchFundsData(
      url,
      funds,
      setTotalCount,
      setNext,
      setFunds,
      setIsLoadingFailed
    );
    fetchCauseData(uuid, setCause, setIsLoading, setIsLoadingFailed);
  }, []);

  return (
    <myContext.Provider
      value={{
        uuid,
        returnedUuid,
        setReturnedUuid,
        isLoading,
        setIsLoading,
        isLoadingFailed,
        setIsLoadingFailed,
        cause,
        setCause,
        funds,
        setFunds,
        next,
        setNext,
        totalCount,
        setTotalCount,
        url,
        setUrl,
        isWindow960,
        setIsWindow960,
        showText,
        setShowText,
        showOTP,
        setShowOTP,
        confirmPay,
        setConfirmPay,
        confirmAmole,
        setConfirmAmole,
      }}
    >
      {children}
    </myContext.Provider>
  );
}
