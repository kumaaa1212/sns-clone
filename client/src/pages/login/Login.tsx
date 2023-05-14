import React, { useContext, useRef } from "react";
import { LoginCall } from "../state/Action";
import { AuthContext } from "../state/AuthContext";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const {user,isFetching,error,dispatch} =useContext(AuthContext);
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    LoginCall(
      {email:emailRef.current?.value,password:passwordRef.current?.value},dispatch
    )
  }
  console.log(user);
  return (
    <div>
      <div>
        <div>
          <h3>SNSAPP</h3>
          <span>本格的なSNSを自分の手で作る</span>
        </div>
        <div>
          <div>
            <p>ログインはこちら</p>
            <form action="" onSubmit={(e) =>handleSubmit(e)}>
            <input type="email" placeholder="email" required ref={emailRef} />
            <input type="password" placeholder=" password" required ref={passwordRef}/>
            <button>ログイン</button>
            <span>パスワードを忘れた方へ</span>
            <button>アカウント作成</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
