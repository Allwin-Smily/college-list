import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CollegeList from '../Components/CollegeList'

const Home = () => {
  let navigate = useNavigate();
  useEffect(() => {
      let authToken = sessionStorage.getItem('Auth Token')

      if (authToken) {
          navigate('/college')
      }

      if (!authToken) {
          navigate('/login')
      }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/login')
  }

  return (
    <div className="w-[88%] mx-auto max-w-[1300px]">
        <button onClick={handleLogout}>Log out</button>
        <h1 className='text-[#191919] text-[36px] text-center uppercase leading-[32px] font-extrabold py-[40px]'>Home Page</h1>
        <CollegeList />
    </div>
  )
}

export default Home