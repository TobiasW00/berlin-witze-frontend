import React ,{memo} from 'react';
import styles from './startseite.module.css';
import YouTube from '../../components/youtuberollup/youtuberollup';

function Videos() {	
    return(
            <div id="startseite"><br/>
        <div className={styles.maincontent}>
            <YouTube/>
            </div>
         </div>);
}


export default (Videos)