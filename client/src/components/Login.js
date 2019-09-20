import React, {useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({username: "", password: ""});

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page');
        console.log(res)
      })
      .catch(err => console.log(err));
  };


  return (
    <>
      <form onSubmit={login}>
        <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        />
        <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        />
        <button>Log in</button>
    </form>
    </>
  );
};

export default Login;
