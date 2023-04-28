import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../service/ApiService';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
   async function getPosts(){
    const data = await getAllPosts();
    setPosts(data);
    console.log(posts);
   }
  getPosts();
  }, [])

  return (
    <div>Dashboard Page</div>
  )
}
