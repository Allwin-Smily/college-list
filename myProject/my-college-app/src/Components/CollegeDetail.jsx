import {useParams} from "react-router-dom"
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

export default function CollegeDetail() {
    const [collegeList, setcollegeList] = useState([])
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
        // navigate('/login')
    }

    const initialFetchData = async () => {
        const response = await fetch("http://universities.hipolabs.com/search?country=India")
        const data = await response.json()
        setcollegeList(data)
      }
    
      useEffect(() => {
        initialFetchData()
      }, [])

    const {collegeName} = useParams();
    const currentCollege = collegeList.find((college) => college.name === collegeName);

  return (
        <>
            <div className="my-[20px]">
                <h2 className="text-[#191919] text-[28px] text-center leading-[32px] font-bold">College Detail Page</h2>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div className="my-[20px]">
                <h2 className="text-[#191919] text-[28px] text-center leading-[32px]">{(currentCollege) && currentCollege.name}</h2>
            </div>
            <div>
            {(currentCollege) &&
                <div className="max-w-[500px] mx-auto">
                    <div className="flex justify-between">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">College Name:</p>
                        <p className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">{currentCollege.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">Domain:</p>
                        <p className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">{currentCollege.domains}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">State:</p>
                        <p className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">
                        {(currentCollege['state-province'] ? currentCollege['state-province']: ' - ')}</p>
                    </div>
                    <div className="flex">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">Country:</p>
                        <p className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">{currentCollege.country}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">Country Code:</p>
                        <p className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">{currentCollege.alpha_two_code}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="basis-[30%] text-[#191919] text-[18px] text-left leading-[22px] font-bold">Website:</p>
                        <a href={currentCollege.web_pages} className="basis-[70%] text-[#191919] text-[16px] text-left leading-[22px]">Link</a>
                    </div>
                </div>
            }
            </div>
        </>
  );
}