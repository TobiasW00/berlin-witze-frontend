import React from 'react';
import styles from  './youtubesinglebox.module.css';
import AutolinkerWrapper from 'react-autolinker-wrapper'
import IVideo from '../../types/video';


interface SingleVideobox {
  video:IVideo
 setVideoId:Function
 currentVideoID:string
}

function YouTubeSingleBox({video,setVideoId,currentVideoID}:SingleVideobox)
{
   
    const renderShowVideo = () =>{    
     return(
         <div className={styles.youtubecontainer}>
        <iframe title={video.title} className={styles.video} src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>);
}

const renderPreview = () =>
{
    return(<div title="Play" onClick={()=>{setVideoId(video.id);}}><img width="360px" height="270px" loading="lazy" alt={video.title} className={styles.videoclickimage}  src={video.image} /><div className={styles.youtubeplaypicturebox}> <img src="/pics/playvideo.png" alt="Video abspielen" /></div></div>);
}
  return (
    <div className={styles.videopreviewbox} >
    <article>
      <header>
    <div className={styles.header}><h2 dangerouslySetInnerHTML={{ __html: video.title }}></h2></div>    
    </header>
       { (video.id === currentVideoID ) ?  renderShowVideo() :  renderPreview()}
       <div className={ styles.description}>
    <AutolinkerWrapper
  tagName="span"
  text={video.description}
  options={{
    newWindow: true,
    stripPrefix: false,
  }} />
    </div>
    </article>
    </div>
    );

}
export default YouTubeSingleBox;