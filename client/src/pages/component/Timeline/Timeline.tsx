import React, { useContext, useEffect, useState } from 'react'
import Post, { PostData } from './Post'
import Share from './Share'
import axios from 'axios'
import { AuthContext } from '../../state/AuthContext'
const Timeline = ({username}:any) => {
  const [posts, setPosts] = useState([]);
  const {user} =useContext(AuthContext);
  useEffect(() =>{
    const fetchPosts = async () =>{
      const response = username ? await axios.get(`/post/profile/${username}`) : await axios.get(`/post/timeline/${user._id}`);
      setPosts(response.data.sort((p1: PostData | null, p2: PostData | null) => {
        if (p1 && p2) {
          return new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime();
        }
        return 0;
      })); 
    }
    fetchPosts();
  },[username, user._id]);
  return (
    <div className=''>
      <div>
        <Share/>
        {posts.map((post:any) =>(
          <Post post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}
export default Timeline