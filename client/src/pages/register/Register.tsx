import axios from 'axios';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const username = useRef<HTMLInputElement>(null!);
  const email = useRef<HTMLInputElement>(null!);
  const password = useRef<HTMLInputElement>(null!);
  const passwordAgain = useRef<HTMLInputElement>(null!);
  const handleSubmit = async(e:any) =>{
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      password.current.setCustomValidity("パスワードが一致しません");
  }else{
    try{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      await axios.post("/auth/register",user);
      navigate("/login");
    }
    catch{
      console.log("error");
    }
  }
}
  return (
    <div>
      <div>
        <div>
          <h3>SNSAPP</h3>
          <span>本格的なSNSを自分の手で作る</span>
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <p>新規登録はこちら</p>
            <input type="text" placeholder='ユーザー名' required ref={username}/>
            <input type="email" placeholder='email' required ref={email}/>
            <input type="password" placeholder=' password'ref={password}/>
            <input type="password" placeholder=' 確認用' ref={passwordAgain}/>
            <button type='submit'>サインアップ</button>
            <button type='submit'> ログイン</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;