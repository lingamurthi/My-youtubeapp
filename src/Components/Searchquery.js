import React, { useEffect, useState } from "react";
import {
  YOUTUBE_INPUTTEXTSEARCH_VIDEO_API,
  YOUTUBE_URL,
} from "../utils/constants";
import { useSearchParams } from "react-router-dom";

const Searchquery = () => {
  const [querydata, setQuerydata] = useState([]);
  const [searchParam, useSearchParam] = useSearchParams();



  useEffect(() => {
    const a = async () => {
      const data = await fetch(
        YOUTUBE_INPUTTEXTSEARCH_VIDEO_API +
          searchParam.get("search_query") +
          "&type=video&key=" +
         process.env.REACT_APP_GOOGLE_API_KEY
      );
      const json = await data?.json();
      setQuerydata(json?.items);
   
    };
    a();
  }, [searchParam]);
  return (
    <div>
      <ul>
        {querydata?.map((item) => (
          <li key={item.id.videoId}>
            <div className="flex">
              <div>
                <iframe
                  className="w-[700px] h-[281px] mt-10"
                  src={YOUTUBE_URL + item.id.videoId}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="ml-5 mt-10">
                <h1 className="font-bold text-5xl"> {item.snippet.channelTitle}</h1>
                <h4>{item.snippet.description}</h4>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Searchquery;
