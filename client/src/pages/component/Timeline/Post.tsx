import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../state/AuthContext";
export interface PostData {
  desc: string;
  coverPicture: string;
  createdAt: string;
  email: string;
  followers: [];
  followings: [];
  isAdmin: boolean;
  profilePicture: string;
  username: string;
  __v: number;
  _id: string;
}
const Post = ({ post }: any) => {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setlike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [users, setUsers] = useState<PostData>({} as PostData);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/user?userId=${post.userId}`);
      setUsers(response.data);
    };
    fetchUser();
  }, [post.userId]);
  const handleLike = async () => {
    try {
      await axios.put(`/post/${post._id}/like`, { userId: currentUser._id });
    } catch (erro) {
      console.log(erro);
    }
    setlike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="">
      <div className="border border-gray-300 shadow-custom rounded-custom m-3 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={`profile/${users.username}`}>
              <img
                src={
                  users.profilePicture
                    ? process.env.REACT_APP_PUBLIC + users.profilePicture
                    : process.env.REACT_APP_PUBLIC + "/person/noAvatar.png"
                }
                alt=""
                className="w-10 h-10 rounded-circle"
              />
            </Link>
            <span className="ml-2">{users.username}</span>
            <span className="ml-2">{format(post.createdAt)}</span>
          </div>
          <div className="mr-1">
            <MoreVert />
          </div>
        </div>
        <div>
          <span>{post.desc}</span>
          <img
            src={process.env.REACT_APP_PUBLIC + post.img}
            alt=""
            className="mt-4"
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex">
            <img
              src={process.env.REACT_APP_PUBLIC + "/heart.png"}
              alt=""
              className="w-7 h-7"
              onClick={() => handleLike()}
            />
            <span className="ml-2">{like}人がいいねを押しました</span>
          </div>
          <div>
            <span>{post.comment}:コメント</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
