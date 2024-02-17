/*import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../Utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../Utils/constants';

const Head = () => {

  const[searchQuery,setSearchQuery]=useState("");
   const[suggestions,setSuggestions]=useState([])
   const[showsuggestions,setShowSuggestions]=useState(false)

  useEffect(()=>{
    const timer=setTimeout(()=>getSerachSuggestions(),200);
    return()=>{
      clearTimeout(timer);
    }
  },[searchQuery])

 const getSerachSuggestions=async()=>{
  const data=await fetch(YOUTUBE_SEARCH_API+searchQuery)
  const json=await data.json
  ();
  console.log(json[1]);
  setSuggestions(json[1])
 }

  const dispatch=useDispatch();
  const toggleMenuHandler=()=>{
      dispatch(toggleMenu())
  }


  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
            <div className="flex col-span-1">
                <img onClick={toggleMenuHandler}  className="h-8 cursor-pointer" src="https://cdn.icon-icons.com/icons2/2348/PNG/512/hamburger_icon_143010.png" alt="hamburger" />
        <img className="h-8 mx-2" src="https://www.edigitalagency.com.au/wp-content/uploads/Youtube-logo-png.png" alt="ytlogo" /></div>

        <div className="col-span-10 px-10">
          <div>
       <input   className="w-1/2 border border-gray-400 p-2  rounded-l-full" type="text"   value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onFocus={setShowSuggestions(true)}
       onBlur={setShowSuggestions(false)} />
       <button className="border border-gray-400  px-5 p-2 rounded-r-full bg-gray-100">🔍</button>
       </div>
        { showsuggestions&&(<div className='fixed bg-white py-2 px-5  w-[35rem] shadow-lg rounded-lg border-gray-100'>
          <ul> 
            {suggestions.map((s)=>(
              <li className='py-2 shadow-sm hover:bg-gray-100 '>🔍 {s}</li>
            ))}
           
          
          </ul>
         </div>)}
        </div>
        <img   className="h-8"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5MrPqniAxFPzHkxGjFiCG4DGATpp21n2dA&usqp=CAU" alt="user" />
        </div>
  )
}

export default Head;

*/




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../Utils/appSlice';
import { YOUTUBE_SEARCH_API, ytlogo } from '../Utils/constants';
import { cacheResults } from '../Utils/searchSlice';
import { Link } from 'react-router-dom';

const Head = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
const serachCache=useSelector((store)=>store.search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if(serachCache[searchQuery])
      {
        setSuggestions(serachCache[searchQuery])
      }
      else{
        getSearchSuggestions()
      }
    },200)
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json[1]);
    setSuggestions(json[1]);
    //lets update
    dispatch(
      cacheResults(
        {
         [searchQuery]:json[1],
        }
      )
    )

  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          src="https://cdn.icon-icons.com/icons2/2348/PNG/512/hamburger_icon_143010.png"
          alt="hamburger"
        />
        
        
      <img
        className="h-8 mx-2"
        src={ytlogo}
        alt="ytlogo"
      />
    
   
      </div>

      <div className="col-span-10 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 p-2 rounded-r-full bg-gray-100">🔍</button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-5 w-[35rem] shadow-lg rounded-lg border-gray-100">
            <ul>
              {suggestions.map((s, index) => (
                <li key={index} className="py-2 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <img className="h-8" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5MrPqniAxFPzHkxGjFiCG4DGATpp21n2dA&usqp=CAU" alt="user" />
    </div>
  );
};

export default Head;



