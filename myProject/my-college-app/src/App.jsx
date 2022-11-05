import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Form from './Components/Form';
import CollegeDetail from './Components/CollegeDetail';
import { useState, useEffect } from 'react';
import './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const handleAction = (id) => {
    console.log(id)
    const authentication = getAuth();
    // Register
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/college')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
        })
    }
    // Login
    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('/college')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((error) => {
          if(error.code === 'auth/wrong-password'){
            toast.error('Please check the Password');
          }
          if(error.code === 'auth/user-not-found'){
            toast.error('Please check the Email');
          }
        })
    }
  }

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')

    if (authToken) {
      navigate('/college')
    }
  }, [navigate])

  return (
    <>
      <div className="App w-[88%] mx-auto max-w-[1300px]">
        <Routes>
          <Route
            path='/login'
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)} />}
          />
          <Route
            path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(2)} />}
            />
          <Route path='/college' element={<Home />} />
          <Route path='/college/:collegeName' element={<CollegeDetail />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;