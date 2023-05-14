import { Analytics, Face, Gif, Image } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../state/AuthContext';
import axios from 'axios';
interface Img{
  lastModified: number
  lastModifiedDate: Date;
  name:string;
  size:number; 
  type:string; 
  webkitRelativePath:string; 
  }
const Share = () => {
  const [uploadfile, setUploadfile] = useState<File | null>(null);
  const descRef = React.useRef<HTMLInputElement>(null!);
  const {user} =useContext(AuthContext);
  const handleSubmit = async(e:any) => {
    e.preventDefault();
    const desc = descRef.current.value;
    const newPost = {
      userId: user._id,
      desc: desc,
      img: '',
  }
  if(uploadfile){
    const data = new FormData();
    // kryとvalueを合わせてデータとして残しておく
    const filename = Date.now() + uploadfile.name;
    // keyとvalueの名前を設定する
    data.append('name',filename);
    data.append('file',uploadfile);
    newPost.img = filename;
    try{
      await axios.post('/upload',data);
    }
    catch(erro){
      console.log(erro);
    }
    

    try{
      await axios.post('/upload',data);
    }
    catch(err){
      console.log(err);
    }
  }
  try{
    await axios.post('/post',newPost);
  }
  catch(err){
    console.log(err);
  }}
  return (
    <div className='border border-gray-300 shadow-custom rounded-custom m-3 p-2 '>
      <form onSubmit={(e) =>handleSubmit(e)}>
        <div>
          <img  src={user.profilePicture ? process.env.REACT_APP_PUBLIC + user.profilePicture : process.env.REACT_APP_PUBLIC + '/person/noAvatar.png'} alt="" className='h-10 w-10'/>
          <input type="text" placeholder='今何している' className='mt-2 w-full h-8' ref={descRef}/>
        </div>
        <hr />
        <div className='flex justify-between'>
          <div className='flex mt-3'>
            <label htmlFor='file'>
              <Image htmlColor=''/>
              <input type="file" id='file' accept='.png,.jpeg,.jpg' className='hidden' onChange={(e) =>setUploadfile(e.target.files ? e.target.files[0] : null)}/>
            </label>
            <div className='ml-3'>
              <Gif/>
            </div>
            <div  className='ml-3'>
              <Face/>
            </div>
            <div  className='ml-3'>
              <Analytics/>
            </div>
          </div>
          <button className='mt-3 mr-2' type='submit'>投稿</button>
        </div>
      </form>
    </div>
  )
}
export default Share
