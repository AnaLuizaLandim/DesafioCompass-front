import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/ApiService';
import { Post } from '../../model/Post';
import '../dashboard/Dashboard.css';
export default function Dashboard() {

  const [posts, setPosts] = useState([] as Post[]);
  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response);
    })
  }, [])

  return (

    <div className='home'>
      <div className='nav'>
        <h1>COMPASS.OUL</h1>
      </div>
      <div className='main'>
        <div className='header-dash'>
        <h2> home</h2>
        </div>
        <div className='body'>
          <div className='posts'>
            <div className='write-field'>
            <form>
              <img src='https://meups.com.br/wp-content/uploads/2022/10/The-Witcher-6-900x503.jpg' className='imagem'></img>
              <input type="text" name="" id="" className='textarea'/><br/>
              <button>Postar</button>
            </form>
            </div>
          <div className='post'>

          </div>
          </div>
          <div className='topics'>
          <div className='trend'>
            
          </div>
          <div className='trend'>
            
          </div>
          <div className='trend'>
            
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
