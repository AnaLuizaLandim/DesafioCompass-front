import React from 'react';
import '../register/Register.css'
import { User, UserLogin } from '../../model/User';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getAllUsers, postUserLogin } from '../../service/ApiService';

export default function Register() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> { }

    const navigate = useNavigate();
    const [users, setUsers] = useState([] as User[]);
    useEffect(() => {
      getAllUsers().then((response) => {
        setUsers(response);
      })
    }, [])
  
  
    const [form, setForm] = useState({ email: '', password: '' } as UserLogin);
    const [error, setError] = useState(false);
  
  
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  
    const handleSubmit = (event: FormEvent): void => {
      event.preventDefault();
      postUserLogin(form).then((response) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
          navigate('/dashboard')
        } else {
          setError(true);
        }
        console.log(response);
      })
    };
  
  return (
    <div className="overflow-login">
      <div className="card-principal">
        <div className="box-register">
          <header className="header-register">
            <h1 className="ola-register">Olá,</h1>
            <p className="pheader-register"> Para Continuar de forma segura,<br /> efetue o login</p>
          </header>

          <section className="formulario">
            <h3>Login</h3>
            <form action="" method="get" className='formulario-register' onSubmit={handleSubmit}>
              <input type="text" id="name" name="name" placeholder="Nome" className="inputs required input-register space" /><br/>
              <span className="span-required">Nome inválido, no mínimo 6 caracteres</span>

              <input type="text" id="user" name="user" placeholder="User" className="inputs required input-register space" /><br/>
              <span className="span-required">Usuario inválido, sem símbolos</span>

              <input type="date" id="date" name="date" placeholder="Data" className="inputs required input-register space" /><br/>
              <span className="span-required">Insira o seu nascimento</span>

              <label htmlFor="email" className=""> </label>
              <input type="email" id="email" name="email" placeholder="Email" className="inputs required space input-register space" autoComplete="off" /><br />
              
              <label htmlFor="password" className=""> </label>
              <input type="password" id="password" name="password" placeholder="Senha" className="inputs required space input-register" /><br />

              <label htmlFor="password2" className=""> </label>
              <input type="password2" id="password2" name="password" placeholder="Repita a senha" className="inputs required space input-register" /><br />
              <span className="span-required" style={{ textAlign: 'center' }}>Senha Inválida<br /> Por favor, tente novamente</span>
              
              <button className="button space button-register" type="submit">Registrar-se</button>

            </form>
          </section>

          <section className="register">
            <p>Já possui login?&nbsp;<a href="/">Entre por aqui</a></p>
          </section>

        </div>


        <section className="background-compass">
        </section>
      </div>
    </div>
  )
  }

