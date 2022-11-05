import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const CollegeList = () => {
  const [collegeName, setcollegeName] = useState([])

  const fetchData =  async (e) => {
    const query = e.target.value
    const response = await fetch(`http://universities.hipolabs.com/search?name=${query}&country=India`)
    const data = await response.json()
    setcollegeName(data)
  }

  const initialFetchData = async () => {
    const response = await fetch("http://universities.hipolabs.com/search?country=India")
    const data = await response.json()
    setcollegeName(data)
  }

  useEffect(() => {
    initialFetchData()
  }, [])

  return (
    <div className="">
      <div className="flex py-[20px] justify-between">
        <h2 className="text-[#191919] text-[36px] text-left uppercase leading-[32px] font-extrabold">College List</h2>
        <div className="max-w-[450px]">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input onChange={fetchData} className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[350px]" placeholder="Search for College..." type="text" name="search"/>
          </label>
        </div>
      </div>
      {collegeName.length > 0 ? (
        <div>
          {collegeName.map((college, i) => (
            <div className="flex flex-col md:flex-row md:items-center py-[10px] md:py-[20px] border-b md:last:border-b-0" key={i}>
              <div className="basis-[80%] md:mr-[25px]">
                <h5 className="text-[#191919] text-[24px] text-left leading-[32px] font-bold max-w-[700px] pb-[2px]">{college.name}</h5>
                <div className="flex">
                  <p className="text-[10px] text-[#191919] font-semibold px-[8px] py-[4px] border-[1px] border-solid border-[#505761] rounded-[5px] bg-[#ffe1d7]">{(college['state-province'] ? college['state-province']+',': '')} {college.country}</p>
                </div>
              </div>
              <div className="basis-[10%] md:mr-[25px]">
                <a href={college.web_pages} className="text-[#191919] text-[16px] leading-[28px] font-semibold flex items-center justify-center border-transparent rounded transition-all duration-300 ease-in py-[7px] px-[14px] bg-[#dceae5] hover:bg-[#fef4de]">Website</a>
              </div>
              <div className="basis-[10%]">
                <Link to={`/college/${college.name}`} className="text-[#191919] text-[16px] leading-[28px] font-semibold flex items-center justify-center border-transparent rounded transition-all duration-300 ease-in py-[7px] px-[14px] bg-[#dceae5] hover:bg-[#fef4de]">View More</Link>
              </div>
            </div>
          ))}
        </div>
      ) : (<p className="text-[#191919] text-[36px] text-center uppercase leading-[32px] font-extrabold my-[60px]">No Results Found</p>)}
    </div>
  )
}

export default CollegeList