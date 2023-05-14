import React from "react";
import TopBar from "../component/TopBar";
import SideBar from "../component/Left/SideBar";
import RightBar from "../component/Right/RightBar";
import Timeline from "../component/Timeline/Timeline";

const Home = () => {
  return (
    <div>
      <TopBar />
      <div className="flex">
        <div className="w-3/12">
          <SideBar />
        </div>
        <div className="w-6/12">
          <Timeline />
        </div>
        <div className="w-3/12">
          {/* <RightBar /> */}
        </div>
      </div>
    </div>
  );
};
export default Home;
// coponentは細かい部品のことであり、他のフォルだはページのことを指す。




