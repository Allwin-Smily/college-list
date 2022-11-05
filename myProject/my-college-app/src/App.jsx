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
  const [confirmPassword, setConfirmPassword] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      navigate('/college')
    }
  }, [])

  const handleAction = (id) => {
    const authentication = getAuth();
    // Register
    if (id === 2) {
      let confirmPassCheck = !(confirmPassword.replace(/\s{2,}/g,' ').trim()) ? false : true
      if(password === confirmPassword && validationForm() && confirmPassCheck) {
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
      } else {
        toast.error('Mismatch in Password');
      }
     
    }
    // Login
    if (id === 1) {
      if(validationForm()) {
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
  }

  function validationForm() {
    if(!(email.replace(/\s{2,}/g,' ').trim())) {
      toast.error('Email Can not be empty');
      return false;
    }
    if(!(password.replace(/\s{2,}/g,' ').trim())) {
      toast.error('Password Can not be empty');
      return false;
    }
    return true;
  }

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
                handleAction={() => handleAction(1)}
                isLogin={true} />}
          />
          <Route
            path='/register'
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                handleAction={() => handleAction(2)}
                isLogin={false} />}
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