import React from "react";

import { useGlobalContext } from "../context";

import Loading from "../Components/Loading";
import About from "../Components/About";
import Info from "../Components/Info";
import Detail from "../Components/Detail";
import Comments from "../Components/Comments";
import Payment from "../Components/Payment";
import ShareLink from "../Components/ShareLink";


function Home() {
  const { isWindow960, cause, isLoading } = useGlobalContext();
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isWindow960 >= 960 && (
            <h1 className="cause-title-top">{cause.title}</h1>
          )}
          <div className={isWindow960 >= 960 ? "App-flex" : undefined}>
            <div>
              <About />
              {isWindow960 < 960 && <Info />}
              <Detail />
              <Comments />
              <Payment />
              <ShareLink />
            </div>
            <div>{isWindow960 >= 960 && <Info />}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
