import React,{memo,useEffect,useContext} from 'react';
import { Link } from "react-router-dom";
import { MemberContext } from '../../provider/MemberContext';
import Kfbutton from '../../components/Kfbutton';
import {HTTP_URL} from '../../api/config';
import Kopflosloadloader from '../../components/Kopflosloader';
import SingleUserMap from '../../components/SingleUserMap';
import SelectTagProfile from '../../components/SelectTagProfile';
import styles from './SingleMember.module.css';
import { UserContext } from '../../provider/UserContext';

function SingleMember(props) {	

    const { id } = props.match.params;
    const {user} = useContext(UserContext);
    const {members,fetchMember} = useContext(MemberContext);
    const member = members.find(f=>f.id===id);
    useEffect(()=>{
      fetchMember(id);
    },[id]);



function sendMessage()
{    
    props.history.push('/sendmessage/' + props.match.params.id);     
}


 if(!member || !member.hasOwnProperty("tags"))
    {
    return (<Kopflosloadloader/>);
    }



        var markers =[];
        var marker = {};
        marker.position={ lat: member.lat, lng: member.lng};
        markers.push(marker) ;
        var imagemap =  <SingleUserMap markers={markers} lat={member.lat}  lng={member.lng}/>


   var nameandagetg = member.name +" (" + ((new Date().getFullYear())-member.agegroup ) + ")";
   var genreicon ="";
   switch(member.genre)
   {
   case 1:
  genreicon="/pics/male.png";       
  break;
  case 2:
  genreicon= "/pics/female.png";
       break;
  case 3:
  genreicon= "/pics/malefemale.png";  
  break;
  case 4:
  genreicon= "/pics/malefemale.png";  
  break;
  default:
  genreicon= "/pics/malefemale.png";  
  break;

  }

     
     function getwebpage()
     {
     if(member.webpage)
     {
        if(member.webpage.length > 4)
        {
               return <div id="memberurlbox"><a rel="noopener noreferrer" target="_blank" href={member.webpage} ><div id="webpageurldiv">{member.webpage}</div></a></div>
        }
     }
    }
    var WrittenFantasies ="";
    if(member.fantasies && member.fantasies.length>0)
    {
        
        WrittenFantasies = member.fantasies.map(function(currentmember,index) {
                      var link = "/witz/" + currentmember.id;
                      var name = index+1 + "." + currentmember.title
                      return (            
                 <div key={currentmember.id}><Link  to={link} dangerouslySetInnerHTML={{__html: name}}></Link></div>       
          );       
        }); 
        var fantasietext = <div id="singleuserwrittenfantasies"><div id="fantasieheadersingleuser">Witze</div><div id="fantasietextessingleuser">{WrittenFantasies}</div></div>
    }
    
var messagebutton = ''
var msgbox=null;

            switch (member.messagetype) {
                case 'nologin' : 
                    messagebutton = null;
                    msgbox =<div id="notloginedbox">Achtung: Du bist nicht eingeloggt und kannst deshalb keine Nachricht senden.</div>
                    break;
                case '0' : 
                    messagebutton = <Kfbutton action={sendMessage} text="Nachricht senden"/>
                    break;
                case '1' : 
                   messagebutton = <Kfbutton action={sendMessage} text="Nachricht senden"/>
                    break;
                case '2' : 
                    msgbox =<div id="notloginedbox">Achtung: Sie haben keinen Like auf einer Ihren Witzen von diesem Mitglider. Deshalb können Sie keine Nachricht schreiben.</div>          
                    break;
                default:
                  break;
              }

 if(user.id === member.id)
 {
  messagebutton =null;        
 }             
                
var tags = null;
if(member.tags.length > 5)
{
    tags = <div id="singleusertags"><div id="singleusertagsheader">Interessen</div><div><SelectTagProfile updateValue={(tagids)=>{}} displayonly selectedtags ={member.tags} />  </div></div>;
}
let profilepicture;
if(member.picture)
{
  let imagestr = `${HTTP_URL}/berlinwitzepictures/` + props.match.params.id+ ".jpg";   
  profilepicture = <img alt={member.name} src={imagestr} />
}
let cssonlineclass = 'memberisoffline';
if(member.online)
{
  cssonlineclass = "memberisonline"
}
              
         
    return (
            <div>
            {msgbox}
              <div id="SingleMemberPage">
             <div id="singlemember-header-div" className={cssonlineclass}>
               <img alt="Geschlecht" src={genreicon}/> <h2 dangerouslySetInnerHTML={{__html:nameandagetg}}></h2>
               {getwebpage()}
               </div>
               <div className={styles.singlemembercontentbox}>
                           <span className="memberpicture">{profilepicture}<br/>
               {tags}      
               </span>
           
               <div id="singlemember-description-div" dangerouslySetInnerHTML={{__html: member.description}}/>
                <div id="memberleftimagebox">
                <br/>       

          </div>
   
          <br/> <br/> 
          {fantasietext}        
          
        
          <div id="singleusermapbox">
          {imagemap}
          </div>          

               <br/>
               <div id="singlemember-footer-div">
               {messagebutton}
               </div>
            </div>
            </div>
            </div>
    );
  }


  
  export default (SingleMember);