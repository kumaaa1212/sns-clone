import { Chat, Notifications, Search } from "@mui/icons-material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/AuthContext";

const TopBar = () => {
  const { user }:any = useContext(AuthContext);
  return (
    <div className="flex justify-between mt-3">
      <div className="flex items-center">
      <Link to='/'>
        <span className="text-4xl text-blue-600">SNS</span>
      </Link>
      </div>
      <div className="flex items-center w-96">
        <div className="mx-auto">
          <button>
            <Search />
          </button>
          <input
            type="text"
            placeholder="入力"
            className=" ml-3 h-10 w-60 border border-gray-400"
          />
        </div>
      </div>

      <div className="flex h-16 w-36 mr-4">
        <div className="flex">
          <div className="h-16 flex items-center">
            <Chat />
            <span>1</span>
          </div>
          <div className="h-full flex items-center">
            <Notifications />
            <span>2</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePictur ? user.profilePictur : process.env.REACT_APP_PUBLIC + '/person/noAvatar.png'} alt="icon" className="w-16 h-16" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
