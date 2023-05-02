import React from 'react';
import './Login.css';
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../service/ApiService';
import { User } from '../../model/User';


interface FormEvent extends React.FormEvent<HTMLFormElement> {}

export default function Login(): JSX.Element {

  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
      console.log(response);
    })
  }, [])

  const form = document.querySelector('form') as HTMLFormElement;
  const campos = document.querySelectorAll('.required') as NodeListOf<HTMLInputElement>;
  const span = document.querySelector('.span-required') as HTMLElement;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const setError = (index: number): void => {
    campos[index].style.border = '0.125rem solid yellow';
    span.style.display = 'block';
  };

  const removeError = (index: number): void => {
    campos[index].style.border = '';
    span.style.display = 'none';
  };

  const userValidation = (): void => {
    const emailuser = users.map((item, index) => item.email);
    if (emailRegex.test(campos[0].value)) {
      for (var i = 0; i < emailuser.length; i++) {
        if (campos[0].value === emailuser[i]) {
          removeError(0);
          return;
        }
      }
    }
    setError(0);
  };
  
    
  const senhaValidation = (): void => {
    if ("BolsistasUOL" === campos[1].value) {
      removeError(1);
    } else {
      setError(1);
    }
  };
  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    senhaValidation();
    userValidation();
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
              action=""
              method="get"
              className="formulario-login"
              onSubmit={handleSubmit}
            >
              <label htmlFor="user"></label>
              <input
                type="email"
                id="user"
                name="user"
                placeholder="Usuário"
                className="inputs required space"
                autoComplete="off"
              />
              <br />

              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
                className="inputs required space"
              />
              <br />
              <span
                className="span-required"
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
              <a href="/dashboard">Registre-se</a>
            </p>
          </section>
        </div>

        <section className="background-compass"></section>
      </div>
    </div>
  );
}
