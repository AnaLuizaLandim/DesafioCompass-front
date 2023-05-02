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
          <a href='/dashboard'><i className="fa-solid fa-house"></i></a>
          <h3 className='title-header'> Home</h3>
          <h3 className='user-lol'>User</h3>
        </div>
        <div className='body'>
          <div className='posts'>
            <div className='write-field'>
              <form className='form-dash'>
              <div className='textbox-comment'>
                  <img src='https://meups.com.br/wp-content/uploads/2022/10/The-Witcher-6-900x503.jpg' className='imagem' alt=''></img>
                  <input className="placeholder" type="text" name="" id="" placeholder='O que você está pensando?'/>
                  </div>
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


            {posts.map((item, index) => (
              <div className='post' key={index}>
                <div className="card">
                  <div className='foto-user'>
                    <img className='perfil' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a99d6e81-03cd-41f9-8532-f42459eaad6e/d9ezf52-b304a893-9b89-41c2-9613-673c842618df.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E5OWQ2ZTgxLTAzY2QtNDFmOS04NTMyLWY0MjQ1OWVhYWQ2ZVwvZDllemY1Mi1iMzA0YTg5My05Yjg5LTQxYzItOTYxMy02NzNjODQyNjE4ZGYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Yy1-8fo5Pzw6v-wyTGCPOf82z7acPfUzMdagNBCKb94' alt=''></img>
                    <div className='column'>
                    <h4>{item.user}</h4>
                    <div className='description-post'>
                    <i className="fa-regular fa-clock"></i><p className='textodebaixo'>12 minutos atrás de <span className='span-dash'>Paisagens Exuberantes</span></p>
                  </div>
                    </div>
                  </div>
                  <p className='post-description'>
                    {item.description}
                  </p>
                  <div className='image-post'>
                  <img src="https://letsflyaway.com.br/wp-content/uploads/2018/08/japao-sakura-templo-1200x700.jpg" alt=""></img>
                  </div>
                  <div className='botoes'>
                  <button><i className="fa-solid fa-thumbs-up"></i>Curtir</button>
                  <button><i className="fa-regular fa-comment-dots"></i>Comentários</button>
                  <button><i className="fa-solid fa-share-nodes"></i>Compartilhar</button>
                  </div>
                  <div className='textbox-comment'>
                  <img src='https://meups.com.br/wp-content/uploads/2022/10/The-Witcher-6-900x503.jpg' className='imagem' alt=''></img>
                  <input className="placeholder" type="text" name="" id="" placeholder='O que você está pensando?'/>
                  </div>
                  <div className="comments">
                    <p className='all-comments'>Todos os comentários</p>
                    {item.comments && item.comments.map((commentItem, commentIndex) => (
                      <div className="comment" key={'comment' + commentIndex}>
                        <div className='foto-user'>
                        <img src='https://sm.ign.com/ign_br/screenshot/default/ign-wiki-witcher-broken-flower-1_vn1m.jpg' className='image-comment' alt=''></img>
                        <div className='comments-text'>
                        <h5>{commentItem.user}</h5>
                        <p>{commentItem.comment}</p>
                        </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
          <div className='topics'>
            <div className='trend friends'>
              <h3>Meus Amigos</h3>
              <ul className='ul-dash'>
                {users.map((item, index) => (
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
