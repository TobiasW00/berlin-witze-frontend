import React, { useState, useEffect} from 'react';
import YouTubeSingleBox from './youtubesinglebox';
import styles from './youtuberollup.module.css';
import Masonry from 'react-masonry-css'
import {Helmet}  from 'react-helmet';



function YouTubeRollup(){

    const [videos, setVideos] = useState([]);
    const [currentVideoID, setVideoId] = useState("");
    const [videocount, setVideocount] = useState("");
    const isCancelled = React.useRef(false);


    useEffect(() => {

      function loadVideos(youtubetoken)
      {
       if(undefined ===youtubetoken)
       return;
         let url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLLx5MjucpujXIbusv4yBTCZ49G7T97Ffj&key=AIzaSyD9wHTfl06YbkEd6lF6sLn-fYgMuy7sFtY'
        url = (youtubetoken.length===0) ? url : url + "&pageToken="  + youtubetoken;
            fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            setVideocount(data.pageInfo.totalResults);
              let vids =[];
              data.items.forEach((video)=>{
                try{
                  let webpimageurl = video.snippet.thumbnails.high.url;
                  vids.push({id:video.id,title:video.snippet.title,description:video.snippet.description,image:webpimageurl,videoId:video.snippet.resourceId.videoId});
                  }catch(err)
                  {
                    console.log(video);
                  }
                });
          let videocount = 0;
          if (!isCancelled.current)  {
          setVideos(c => {videocount= (vids.length + c.length);return [...c,...vids]});
          }
           if(data.pageInfo.totalResults > videocount){
           loadMoreTrigger(data.nextPageToken);
           }
             })
          .catch(function(error) {
            console.error(error);
          });
      }


      function loadMoreTrigger(newyoutubekotekn)
      {
   const sentinel =  document.getElementById("loadmore");
   const config = {
     rootMargin: '300px 0px',
     threshold: 0.01
   };
   
   let observer = new IntersectionObserver(onIntersection, config);
   observer.observe(sentinel);
   
   function onIntersection(entry) {
     if (entry[0].intersectionRatio > 0) {
       observer.unobserve(entry[0].target);
      loadVideos(newyoutubekotekn);
     }
   } 
   
   }



     loadVideos("");
      return () => {
        isCancelled.current = true;
      };
      },[]);




    let videoslist = videos.map((video)=> {        
        return(<YouTubeSingleBox key={video.id} video={video} setVideoId={setVideoId} currentVideoID={currentVideoID} />)
    });


    const breakpointColumnsObj = {
      default: 5,
      1800: 4,
      1500: 3,
      1200: 2,
      800: 1,
    };


let seotitle = videocount + " Videos"
    return (
            <div className={styles.youtubebox}>
              <Helmet>
               <title>{seotitle}</title>
               <meta property="og:description" content="Lustige YouTube Videos"/>
            </Helmet>
{(videos.length !==0 )? 
<React.Fragment>
<Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column">
  {videoslist}
</Masonry> <div id="loadmore"/> </React.Fragment> : <div></div>}
            </div>
    );

}
export default YouTubeRollup;



