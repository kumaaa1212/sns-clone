import React from "react";

const CloseFrend = ({user}:any) => {
  return (
    <div className="mt-4">
      <li className="flex items-center">
        <img src={process.env.REACT_APP_PUBLIC + user.profilePicture} alt="" className="rounded-circle h-10 w-10 ml-3" />
        <span className="ml-3">{user.username}</span>
      </li>
    </div>
  );
};

export default CloseFrend;
