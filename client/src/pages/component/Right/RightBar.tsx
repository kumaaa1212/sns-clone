import React from "react";
import Online from "../Online";
import { Users } from "../../../dummy";
const RightBar = ({ user }: any) => {
  const HomeRightBar = () => {
    return (
      <div>
        <div>
          <div className="flex">
            <img src={process.env.REACT_APP_PUBLIC + '/star.png'} alt="" className="w-10 h-10"/>
            <span>
              <b>フォロワー限定</b>イベント開催中
            </span>
          </div>
          <img src={process.env.REACT_APP_PUBLIC + "/ad.jpeg"} alt="" />
          <h4>オンラインの友達</h4>
          <ul>
            {Users.map((u) => (
              <Online key={u.id} user={u} />
            ))}
          </ul>
          <p>プロモーション広告</p>
          <img src={process.env.REACT_APP_PUBLIC + '/promotion/promotion1.jpeg'} alt="" />
          <p>ショッピング</p>
          <img src={process.env.REACT_APP_PUBLIC + '/promotion/promotion2.jpeg'} alt="" />
          <p>カーショップ</p>
          <img src={process.env.REACT_APP_PUBLIC + '/promotion/promotion3.jpeg'} alt="" />
          <p>株式会社</p>
        </div>
      </div>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <h4>ユーザー情報</h4>
        <div>
          <div>
            <span>出身</span>
            <span>福岡</span>
          </div>
          <h4>あなたの友達</h4>
          <div>
            <div>
              <img src={process.env.REACT_APP_PUBLIC + '/person/1.jpeg'} alt="" />
              <span>熊あああ</span>
            </div>
          </div>
          <div>
            <div>
              <img src={process.env.REACT_APP_PUBLIC + '/person/2.jpeg'}  alt="" />
              <span>熊あああ</span>
            </div>
          </div>
          <div>
            <div>
              <img src={process.env.REACT_APP_PUBLIC + '/person/3.jpeg'}  alt="" />
              <span>熊あああ</span>
            </div>
          </div>
          <div>
            <div>
              <img src={process.env.REACT_APP_PUBLIC + '/person/4.jpeg'} alt="" />
              <span>熊あああ</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  return <div>{user ? <ProfileRightBar /> : <HomeRightBar />}</div>;
};
export default RightBar;
