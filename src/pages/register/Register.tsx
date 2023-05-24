import React from 'react';
import '../register/Register.css'
import { User, UserLogin, UserRegister } from '../../model/User';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getAllUsers, postUserLogin, postUserRegister } from '../../service/ApiService';

export default function Register() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> { }

    const navigate = useNavigate();
    const [users, setUsers] = useState([] as User[]);
    useEffect(() => {
      getAllUsers().then((response) => {
        setUsers(response);
      })
    }, [])
  
  
    const [form, setForm] = useState({ email: '', password: '', name: '', user: '', birthdate:''  } as UserRegister);
    const [error, setError] = useState(false);
  
  
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
    const [repeatPassword, setRepeatPassword] = useState('');
    const handleSubmit = (event?: FormEvent): void => {
      event?.preventDefault();
      if(repeatPassword!== form.password){
         alert('Senhas não correspondem')
         return
      }
      if(form.name== '' || form.email== '' || form.birthdate=='' || form.password=='' || form.user == ''){
        alert('Todos os campos devem ser preenchidos')
        return
      }
      postUserRegister(form).then((response)=>{
        if(response){
          navigate('/')
        }else{
          setError(true);
        }
      })
      // postUserLogin(form).then((response) => {
      //   if (response) {
       
      //   } else {
      //     setError(true);
      //   }
      //   console.log(response);
      // })
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
            <h3>Register</h3>
            <form action="" method="get" className='formulario-register' onSubmit={handleSubmit}>
              <input type="text" id="name" name="name" placeholder="Nome" className="inputs required input-register space" onChange={(e)=>{setForm({...form, name:e.target.value})}} value={form.name}/><br/>
              <span className="span-required">Nome inválido, no mínimo 6 caracteres</span>

              <input type="text" id="user" name="user" placeholder="User" className="inputs required input-register space" onChange={(e)=>{setForm({...form, user:e.target.value})}} value={form.user}/><br/>
              <span className="span-required">Usuario inválido, sem símbolos</span>

              <input type="date" id="date" name="date" placeholder="Data" className="inputs required input-register space" onChange={(e)=>{setForm({...form, birthdate:e.target.value})}} value={form.birthdate}/><br/>
              <span className="span-required">Insira o seu nascimento</span>

              <label htmlFor="email" className=""> </label>
              <input type="email" id="email" name="email" placeholder="Email" className="inputs required space input-register space" autoComplete="off" onChange={(e)=>{setForm({...form, email:e.target.value})}} value={form.email} /><br />
              
              <label htmlFor="password" className=""> </label>
              <input type="password" id="password" name="password" placeholder="Senha" className="inputs required space input-register" onChange={(e)=>{setForm({...form, password:e.target.value})}} value={form.password}/><br />

              <label htmlFor="password2" className=""> </label>
              <input type="password2" id="password2" name="password" placeholder="Repita a senha" className="inputs required space input-register" value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value)}} /><br />
              <span className="span-required" style={{ textAlign: 'center' }}>Senha Inválida<br /> Por favor, tente novamente</span>
              
              <button className="button space button-register" type="button" onClick={()=>{handleSubmit()}} >Registrar-se</button>

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

