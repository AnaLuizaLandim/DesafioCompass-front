import React from 'react';
import '../register/Register.css';
import { User, UserLogin, UserRegister } from '../../model/User';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllUsers, postUserLogin, postUserRegister } from '../../service/ApiService';

export default function Register() {
  interface FormEvent extends React.FormEvent<HTMLFormElement> {}

  const navigate = useNavigate();
  const [users, setUsers] = useState([] as User[]);
  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  const getUserData = () => {
    getAllUsers().then((response) => {
      setUsers(response);
      console.log(response);
    });
  };

  const [form, setForm] = useState({ email: '', password: '', name: '', user: '', birthdate: '' } as UserRegister);
  const [errors, setErrors] = useState({ email: false, password: false, name: false, user: false, birthdate: false, repeatPassword: false });

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = (event?: FormEvent): void => {
    event?.preventDefault();

    let formErrors = { email: false, password: false, name: false, user: false, birthdate: false, repeatPassword: false };
    const existingUser = users.find((user) => user.user === form.user);
    if (existingUser) {
      formErrors.user = true;
    }

    const existingEmail = users.find((user) => user.email === form.email);
    if (existingEmail) {
      formErrors.email = true;
    }

    if (repeatPassword !== form.password) {
      formErrors.repeatPassword = true;
      formErrors.password = true;
    }

    if (repeatPassword === '') {
      formErrors.repeatPassword = true;
    }
    if (form.name === '' || form.name.length < 6) {
      formErrors.name = true;
    }
    if (form.email === '' || !emailRegex.test(form.email)) {
      formErrors.email = true;
    }
    if (form.birthdate === '') {
      formErrors.birthdate = true;
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(form.birthdate);
      if (selectedDate > currentDate) {
        formErrors.birthdate = true;
      }
    }
    if (form.password === '' || form.password.length < 8) {
      formErrors.password = true;
    }
    if (form.user === '' || /[^a-zA-Z0-9]/.test(form.user) || form.user.length < 6) {
      formErrors.user = true;
    }
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }

    postUserRegister(form).then((response) => {
      if (response) {
        navigate('/');
      } else {
        setErrors({ ...formErrors });
      }
    });
  };
  return (
    <div className="overflow-register">
      <div className="card-principal">
        <div className="box-register">
          <header className="header-register">
            <h1 className="ola-register">Olá,</h1>
            <p className="pheader-register"> Para Continuar de forma segura,<br /> efetue o login</p>
          </header>

          <section className="formulario">
            <h3>Register</h3>
            <form action="" method="get" className='formulario-register' onSubmit={handleSubmit}>
              <input type="text" id="name" name="name" placeholder="Nome" className={errors.name ? "error-register inputs required input-register space" : 'inputs required input-register space'} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} value={form.name} /><br />
              {errors.name && <span className="span-required2">Nome inválido, no mínimo 6 caracteres</span>}

              <input type="text" id="user" name="user" placeholder="User" className={errors.user ? "error-register inputs required input-register space" : 'inputs required input-register space'} onChange={(e) => { setForm({ ...form, user: e.target.value }) }} value={form.user} /><br />
              {errors.user && <span className="span-required2">Usuario inválido, sem símbolos, no minimo 6 caracteres</span>}

              <input type="date" id="date" name="date" placeholder="Data" className={errors.birthdate ? "error-register inputs required input-register space" : 'inputs required input-register space'} onChange={(e) => { setForm({ ...form, birthdate: e.target.value }) }} value={form.birthdate} /><br />
              {errors.birthdate && <span className="span-required2">Insira o seu nascimento</span>}

              <label htmlFor="email" className=""> </label>
              <input type="email" id="email" name="email" placeholder="Email" className={errors.email ? "error-register inputs required input-register space" : 'inputs required input-register space'} autoComplete="off" onChange={(e) => { setForm({ ...form, email: e.target.value }) }} value={form.email} /><br />
              {errors.email && <span className="span-required2">Email inválido</span>}

              <label htmlFor="password" className=""> </label>
              <input type="password" id="password" name="password" placeholder="Senha" className={errors.password ? "error-register inputs required input-register space" : 'inputs required input-register space'} onChange={(e) => { setForm({ ...form, password: e.target.value }) }} value={form.password} /><br />
              {errors.password && <span className="span-required2">Senha inválida, no mínimo 8 caracteres</span>}

              <label htmlFor="password2" className=""> </label>
              <input type="password" id="password2" name="password" placeholder="Repita a senha" className={errors.repeatPassword ? "error-register inputs required input-register space" : 'inputs required input-register space'} value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value) }} /><br />
              {errors.repeatPassword && <span className="span-required2" style={{ textAlign: 'center' }}>As senhas não coincidem</span>}

              <button className="button space button-register" type="button" onClick={()=>{handleSubmit()}}>Registrar-se</button>
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
