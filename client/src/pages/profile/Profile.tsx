import React, { useEffect, useState } from "react";
import TopBar from "../component/TopBar";
import SideBar from "../component/Left/SideBar";
import RightBar from "../component/Right/RightBar";
import Timeline from "../component/Timeline/Timeline";
import { PostData } from "../component/Timeline/Post";
import axios from 'axios'
import { useParams } from "react-router-dom";
const Profile = () => {
  const useparams = useParams().username;
  const [users, setUsers] = useState<PostData>({} as PostData);
  useEffect(() =>{
    const fetchUser = async () =>{
      const response = await axios.get(`/user?username=${useparams}`);
      // これはホームの:usenameの所
      setUsers(response.data);
    }
    fetchUser();
  },[])
  return (
    <div>
      <TopBar />
      <div className="flex">
        <div className="w-1/5">
          <SideBar />
        </div>
        <div className="w-4/5">
          <div>
            <div className="relative">
              <img
                src= {users.coverPicture || process.env.REACT_APP_PUBLIC + "/post/1.jpeg"}  alt=""
                className="w-full h-64 object-cover "/>
            </div>
            <div className="">
              <img src={process.env.REACT_APP_PUBLIC + users.profilePicture || process.env.REACT_APP_PUBLIC + '/person/noAvatar.png'} alt="" className="w-24 h-24" />
              <h4>{users.username}</h4>
              <span>{users.desc}</span>
            </div>
          </div>
          <div>
            <Timeline username={users.username} />
            {/* <RightBar user={users} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
