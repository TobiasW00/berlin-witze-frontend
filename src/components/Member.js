import React from 'react';
import {HTTP_URL} from '../api/config';
import { useHistory } from "react-router-dom";

function Member(props){
let history = useHistory();
function getNameAndAge()
{
 return props.member.name +" (" + ((new Date().getFullYear())-props.member.agegroup ) + ")";
}
  
  function getIcon()
  {
   
     switch(props.member.genre)
     {
     case 1:
       return("/pics/male.png")     ;   
    break;
    case 2:
      return ("/pics/female.png")     ;
         break;
    case 3:
      return("/pics/malefemale.png")     ;
    break;
    case 4:
      return("/pics/malefemale.png")     ; 
    break;
    default:
      return("/pics/female.png")     ; 
    break;

    }
  }
  
    function handleShowMember()
    {
      history.push("/member/"+ props.member.id);
    }
	
    function errorimgload(e)
    {
    e.target.style.display = "none"; 
    }
	

    if(!props.member)
    {
      return(<div>..</div>);
    }

    let imgtag = null;
if(props.member.picture)
{
  let imagestr = `${HTTP_URL}/berlinwitzepictures/tumb_` + props.member.id+ ".jpg"; 
  imgtag= <img className="member-description-img" alt="Benutzer" src={imagestr} onError={errorimgload} />
}
    
    let onlinebox = null;
    let boxcssclassnames ='memberbox';
    if(props.member.online)
    {
      onlinebox = <div className="useronlinestatusbox userboxisonline">ONLINE</div>;
    }else
    {
     
      onlinebox = <div className="useronlinestatusbox userboxoffline">OFFLINE</div>; 
      if(props.member.picture)
      {
        boxcssclassnames += " middlebox";
      }else
      {
        boxcssclassnames += " smallbox";
      }
    }  
           
    return (
            <div className={boxcssclassnames} onClick={handleShowMember}>
             {onlinebox}
            <table className="fantasietbl">
            <tbody>
            <tr><td><img alt="Geschlecht" src={getIcon()} /> <h4 dangerouslySetInnerHTML={{__html: getNameAndAge()}}></h4></td></tr>
            <tr><td><div className="memberdescription" >{imgtag}<div dangerouslySetInnerHTML={{__html: props.member.description}}/></div></td></tr>
            </tbody>
            </table>
            </div>
    );
  }


export default Member;



