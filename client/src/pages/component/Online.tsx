import React from "react";

const Online = ({ user }: any) => {
  return (
    <li>
      <div>
        <img src={process.env.REACT_APP_PUBLIC + user.profilePicture} alt="" />
        <span>オンラインの印</span>
      </div>
      <span>{user.username}</span>
    </li>
  );
};

export default Online;
