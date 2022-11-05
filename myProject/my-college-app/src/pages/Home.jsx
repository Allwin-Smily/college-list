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
    navigate('/login');
    window.location.reload(); 
  }

  return (
    <div className="w-[88%] mx-auto max-w-[1300px]">
      <h1 className='text-[#191919] text-[36px] text-center uppercase leading-[32px] font-extrabold py-[40px]'>Home Page</h1>
        <div className='flex justify-center'>
          <button className='text-[#fff] text-[16px] leading-[28px] font-semibold flex items-center justify-center border-transparent rounded transition-all duration-300 ease-in py-[7px] px-[14px] bg-[#dd0735] hover:bg-[#bb022a]' onClick={handleLogout}>Log out</button>
        </div>
        <CollegeList />
    </div>
  )
}

export default Home