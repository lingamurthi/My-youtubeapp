import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS_API } from "../utils/constants";
import VideoCard, { AdVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";


const VideoContainer = () => {
  const [video, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const handleScroll = () => {
    //scrollY - how much I have scrolled
    // innerHeight - heigh of the window(visible setion)
    // document.body.scrollHeight - total height of the web page
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      getVideos();
    }
  };
  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API+process.env.REACT_APP_GOOGLE_API_KEY);
    const json = await data?.json();
 

    if (Array.isArray(json?.items) && json.items.length > 0) {
      setVideos((prevVideos) => [...prevVideos, ...json.items]);
    } 

  };
  return (
    <div className="md:flex flex-wrap">
      {video[0] && <AdVideoCard info={video[0]} />}
      {video.map((video,index) => (
        <Link key={index} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
