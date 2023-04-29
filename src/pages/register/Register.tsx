import React from 'react';


export default function Register() {
    return (
<div className="alinhar">
      <div className="box">
        <header className="header">
          <h1 className="ola">Olá,</h1>
          <p className="pheader"> Para Continuar de forma segura,<br /> efetue o login</p>
        </header>

        <section className="formulario">
      <h3>Registro</h3>
      <form action="" method="get" id="form">
        <p>
          <label htmlFor="name" className=""> </label>
          <i className="icon1 icon"></i>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome"
            autoComplete="off"
            className="inputs required"
          />
          <span className="span-required">Nome inválido, no mínimo 6 caracteres</span>
        </p>

        <p>
          <label htmlFor="user" className=""> </label>
          <i className="icon1 icon"></i>
          <input
            type="text"
            id="user"
            name="user"
            placeholder="Usuário"
            autoComplete="off"
            className="inputs required"
          />
          <span className="span-required">Usuario inválido, sem símbolos</span>
        </p>
        <p>
          <label htmlFor="date" className=""> </label>
          <i className="icon2 icon"></i>
          <input
            placeholder="Nascimento"
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            id="date"
            className="inputs required"
          />
          <span className="span-required">Insira o seu nascimento</span>
        </p>
        <p>
          <label htmlFor="email" className=""> </label>
          <i className="icon3 icon"></i>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            className="inputs required"
          />
          <span className="span-required">Email inválido</span>
        </p>
        <p>
          <label htmlFor="password" className=""> </label>
          <i className="icon4 icon"></i>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Senha"
            className="inputs required"
          />
          <span className="span-required">A senha dever no mínimo 8 caracteres</span>
        </p>
        <p>
          <label htmlFor="password2" className=""> </label>
          <i className="icon5 icon"></i>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirme sua senha"
            className="inputs required"
          />
          <span className="span-required">As senhas não correspondem</span>
        </p>
        <p>
          <button className="button" type="submit" value="enviar">
            Registrar-se
          </button>
        </p>
      </form>
    </section>

        <section className="register">
          <p>Novo por aqui?&nbsp;<a href="/dashboard">Registre-se</a></p>
        </section>

      </div>
 

    <section className="background-compass">
    </section>
    </div>        
    )
}
