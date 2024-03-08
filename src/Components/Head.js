import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { HAMBURGER_ICON, USER_ICON, YOUTUBE_LOGO, YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { Link } from "react-router-dom";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    // Add event listener to handle clicks outside suggestion list
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target) && suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();

    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex md:col-span-1 col-span-4">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          src={HAMBURGER_ICON}
          alt="menu"
        />
        <a href="/">
          <img className="h-8 mx-2" src={YOUTUBE_LOGO} alt="youtube-logo" />
        </a>
      </div>

      <div className="md:col-span-10 px-10 col-span-7">
        <div ref={inputRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            className="px-5 w-[60%] md:w-1/2 border border-gray-400 p-2 rounded-l-full"
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>

        {showSuggestions && (
          <div ref={suggestionRef} className="absolute mt-0 bg-white py-2 px-2 w-[33rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s, index) => (
                <li key={index} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  <Link to={`/results?search_query=${s}`} onClick={() => handleSuggestionClick(s)}>
                    🔍 {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="md:col-span-1 col-span-1">
        <img className="h-8" alt="user" src={USER_ICON} />
      </div>
    </div>
  );
};

export default Head;
