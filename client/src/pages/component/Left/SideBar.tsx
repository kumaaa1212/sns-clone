import {
  Bookmark,
  Home,
  MessageRounded,
  Notifications,
  Person,
  Search,
  Settings,
} from "@mui/icons-material";
import React from "react";
import CloseFrend from "./CloseFrend";
import { Users } from "../../../dummy";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-full ">
      <div>
        <ul className="ml-3 mb-5">
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Home />
            <Link to='/'>
            <span>ホーム</span>
            </Link>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Search />
            <span>検索</span>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Notifications />
            <span>通知</span>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <MessageRounded />
            <span>メッセージ</span>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Bookmark />
            <span>ブックマーク</span>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Person />
            <Link to='/profile/kuma' style={{}}>
            <span>プロフィール</span>
            </Link>
          </li>
          <li className="mt-1 pl-4 h-10 flex items-center border border-gray-300 shadow-custom rounded-custom">
            <Settings />
            <span>設定</span>
          </li>
        </ul>
        <hr />
        <ul>
          {Users.map((u) => (
            <CloseFrend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
