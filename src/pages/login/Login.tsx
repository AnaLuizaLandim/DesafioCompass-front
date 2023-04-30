import React from 'react'
import './Login.css';

export default function Login() {
  return (
    <div className="overflow-login">
      <div className="alinhar">
      <div className="box">
        <header className="header">
          <h1 className="ola">Olá,</h1>
          <p className="pheader"> Para Continuar de forma segura,<br /> efetue o login</p>
        </header>

        <section className="formulario">
          <h3>Login</h3>
          <form action="" method="get" className='formulario-login'>
              <label htmlFor="user" className=""> </label>
              <input type="email" id="user" name="user" placeholder="Usuário" className="inputs required space" autoComplete="off" /><br/>
            
              <label htmlFor="password" className=""> </label>
              <input type="password" id="password" name="password" placeholder="Senha" className="inputs required space" /><br/>
              <span className="span-required" style={{ textAlign: 'center' }}>Usuário e/ou Senha Inválidos<br /> Por favor, tente novamente</span>
          
              <button className="button space button-log" type="submit">Logar-se</button>
           
          </form>
        </section>

        <section className="register">
          <p>Novo por aqui?&nbsp;<a href="/dashboard">Registre-se</a></p>
        </section>

      </div>
      

    <section className="background-compass">
    </section>
    </div>
    </div>
  )
}
