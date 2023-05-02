import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/ApiService';
import { Post } from '../../model/Post';
import { getAllUsers } from '../../service/ApiService';
import { User } from '../../model/User';
import '../dashboard/Dashboard.css';
import imagem from '../../assets/imgs/compass.uol_Negativo 1.png'
export default function Dashboard() {

  const [posts, setPosts] = useState([] as Post[]);
  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response);
    })
  }, [])

  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
      console.log(response);
    })
  }, [])

  return (

    <div className='home'>
      <div className='nav'>
        <img className='compassnegativo' src={imagem} alt='' />
      </div>
      <div className='main'>
        <div className='header-dash'>
          <i className="fa-solid fa-house"></i>
          <h3> Home</h3>
          <h3 className='user-lol'>User</h3>
        </div>
        <div className='body'>
          <div className='posts'>
            <div className='write-field'>
              <form className='form-dash'>
                <img src='https://meups.com.br/wp-content/uploads/2022/10/The-Witcher-6-900x503.jpg' className='imagem' alt=''></img>
                <input type="text" name="" id="" className='textarea' placeholder='No que você está pensando?' /><br />
                <div className='Sempre'>
                  <i className="fa-solid fa-camera"></i>
                  <i className="fa-regular fa-image"></i>
                  <i className="fa-solid fa-paperclip"></i>
                  <i className="fa-regular fa-face-smile"></i>
                  <i className="fa-solid fa-location-dot"></i>
                  <button type='submit' className='dash-b'>Postar</button>
                </div>
              </form>

            </div>
            
            <div className='post'>

            </div>
          </div>
          <div className='topics'>
            <div className='trend friends'>
              <h3>Meus Amigos</h3>
              <ul>
                {users.map((item,index) => (
                  <li className='lista-d'>{item.name}</li>
                ))}
              </ul>
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
