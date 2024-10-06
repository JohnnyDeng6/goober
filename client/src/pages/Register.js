import React from 'react';
import { Header, Footer } from '../components/index.js';
import { LoginForm } from '../components/index.js';

const Login = (props) => {
  return (
    <div>
      <Header />

      <div>
        <p>Welcome to the login page</p>
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
};

export default Login;