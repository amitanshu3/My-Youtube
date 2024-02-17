/*import React, { useEffect, useState } from 'react'
import { Youtube_Video_Api } from '../Utils/constants'
import VideoCard from './VideoCard';

const VideoContainer = () => {
   
   const[videos,setVideos]=useState([]);
   
    useEffect(()=>{
      getVideos()
    },[])
    const getVideos=async()=>{
        const data=await fetch(Youtube_Video_Api);
        const json= await data.json();
        console.log(json.items)
        setVideos(json.items)
    }
  return (
    <div>
      <VideoCard info={videos[0]} />
    </div>
  )
}

export default VideoContainer;*/


import React, { useEffect, useState } from 'react';
import { Youtube_Video_Api } from '../Utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const VideoContainer = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const data = await fetch(Youtube_Video_Api);
            const json = await data.json();
            setVideos(json.items);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    return (
        <div className='flex flex-wrap justify-evenly'>

             {videos.map(video => (
              <Link to={"/watch?v=" + video.id} key={video.id}> <VideoCard key={video.id} info={video} /></Link>
          
             )) }
        </div>
    );
};

export default VideoContainer;

