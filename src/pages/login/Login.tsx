import React from 'react';
import './Login.css';
import { useEffect, useState } from 'react'
import { getAllUsers, postUserLogin } from '../../service/ApiService';
import { User, UserLogin } from '../../model/User';
import { useNavigate } from 'react-router-dom';


interface FormEvent extends React.FormEvent<HTMLFormElement> { }

export default function Login(): JSX.Element {
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
      <div className="alinhar">
        <div className="box">
          <header className="header">
            <h1 className="ola">Olá,</h1>
            <p className="pheader">
              Para Continuar de forma segura,<br /> efetue o login
            </p>
          </header>

          <section className="formulario">
            <h3>Login</h3>
            <form
              className="formulario-login"
              onSubmit={handleSubmit}
            >
              <label htmlFor="user"></label>
              <input
                type="email"
                id="user"
                name="user"
                placeholder="Usuário"
                className={error?'inputs space error' : 'inputs space'}
                autoComplete="off"
                value={form.email}
                onChange={(event) => {
                  setForm({ ...form, email: event.target.value })
                }}
              />
              <br />

              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
                className={error?'inputs space error' : 'inputs space'}
                value={form.password}
                onChange={(event) => {
                  setForm({ ...form, password: event.target.value })
                }}
              />
              <br />
              <span
                className={error?'error2' : 'span-required'}
                style={{ textAlign: 'center' }}
              >
                Usuário e/ou Senha Inválidos
                <br />
                Por favor, tente novamente
              </span>

              <button className="button space button-log" type="submit">
                Logar-se
              </button>
            </form>
          </section>

          <section className="register">
            <p>
              Novo por aqui?&nbsp;
              <a href="/register">Registre-se</a>
            </p>
          </section>
        </div>

        <section className="background-compass"></section>
      </div>
    </div>
  );
}
