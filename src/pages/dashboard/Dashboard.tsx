import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/ApiService';
import { Post } from '../../model/Post';
import './Dashboard.css';
export default function Dashboard() {

  const [posts, setPosts] = useState([] as Post[]);
  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response);
    })
  }, [])

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div>
        {/* saksaksak */}
        {posts.map((item, index) => (
          <div className='card-container' key={index}>
            <div className="card">
              <h4>{item.user}</h4>
              <p>
              {item.description}
              </p>
              <div className="comments">
              {item.comments && item.comments.map((commentItem, commentIndex)=>(
                <div className="comment" key={'comment'+ commentIndex}> 
                <h5>{commentItem.user}</h5>
                <p>{commentItem.comment}</p>
                </div>
              ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}
