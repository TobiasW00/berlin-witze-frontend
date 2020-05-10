import React,{useState,useEffect,useRef,useContext,memo} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import Dropzone from 'dropzone';
import swal from 'sweetalert';
import SelectTagProfile from '../../components/SelectTagProfile';
import Kfbutton from '../../components/Kfbutton';
import RichtextEditor from '../../components/RichtextEditor';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'; 
import {HTTP_URL} from '../../api/config';
import '../../../node_modules/react-geosuggest/module/geosuggest.css';
import Kopflosmap from '../../components/KopflosMap';
import { Marker } from "react-google-maps";
import { setTimeout } from 'core-js';
import Kopflosloadloader from '../../components/Kopflosloader';
import Styles from './EditUserProfile.module.css';
import { WebsocketContext } from '../../provider/WebsocketContext';
import {Helmet}  from 'react-helmet';


function EditMyProfile(props) {
const [crop,setCrop] = useState({aspect: 450/650,unit: '%'});
const [cropdisabled,setCropDisabled] = useState(true);
const [isMarkerShown,setisMarkerShown] = useState(false);
const [currentimg,setCurrentimg] = useState("");
const [imagecut,setImageCut] = useState({});
const {addAction} = useContext(WebsocketContext);
const history = useHistory();
const user = props.value.user;
const setUser = props.value.setUser;
const deleteProfil = props.value.deleteProfil;

useEffect(() => {
const setupDropzone = (data) => {
  try{
  var myDropzone = new Dropzone(document.getElementById("bildzone"), { url: `${HTTP_URL}/fileupload/ `, headers:{"Authorization":localStorage.getItem("token")},   acceptedFiles:"image/jpeg,image/png",paramName: "file",uploadMultiple:false, createImageThumbnails:false,success: (file, response)=>{

    var old = Object.assign({}, user,{picture:true});
    setUser(old);
           setCropDisabled(true);
    reloaduserimage(old.id);
    }});  
  reloaduserimage(data.id);
}catch(err)
{
  console.log(err.message);
}
}
setupDropzone(user);
});


 function addNewFantasie()
  {
       history.push('/newfantasie/');        
  }
  function addNewDate()
  {
    history.push('/newdate/'); 
  }


  function  onChangeName(e) { 
    var u = Object.assign({},user,{name :e.target.value});
    setUser(u);
  }

function onChangeEmail(e) { 
  var u = Object.assign({},user,{email :e.target.value});
  setUser(u);
  }

  function onChangeAgeGroup(e)
  {
           var u = Object.assign({},user,{agegroup :e.target.value});
         setUser(u);
  }

      function changeGenre(e){
        var u = Object.assign({},user,{'genre' :e.target.value});
        setUser(u);
    
     }

  function changePublic(e){
       var u = Object.assign({},user,{public :!user.public});
       setUser(u);
     
      
     }

 function onChangeWebpage(e){
  var u = Object.assign({},user,{webpage :e.target.value});
  setUser(u);
      
     }
 function handleMessageChange(e) {
         var u = Object.assign({},user,{messagetype :e.target.value});
         setUser(u);
  }


  function setcuts(c)
  {
    setImageCut(c);
  }

  function cutimage()
  {
  var jsondata = {};
  jsondata.x = parseInt(crop.x);
  jsondata.y = parseInt(crop.y);
  jsondata.h = parseInt(crop.height);
  jsondata.w = parseInt(crop.width);
  addAction("image.crop",jsondata,function(data)
       {
           if(data.state==='OK')
           {
            /*reload image */    
            reloaduserimage(user.id);
           }else
           {
                 swal("Oops...", "Bild konnte nicht zugeschnitten werden.", "error");
           }
       });      
      
  }
  function handleEditDescription(text)
  {
  setUser({...user,description:text});
  }

const reloaduserimage= (userid) =>
{
  var imagestr = HTTP_URL + "/berlinwitzepictures/orginal_" + userid + ".jpg?" + new Date().toLocaleString().replace(":","").replace(",","");       
  setCurrentimg(imagestr);
/*
setTimeout(()=>{
        document.getElementsByClassName("ReactCrop")[0].style.height = document.getElementsByClassName("ReactCrop__image")[0].naturalHeight + "px";
        document.getElementsByClassName("ReactCrop")[0].style.width = document.getElementsByClassName("ReactCrop__image")[0].naturalWidth + "px";
  
      setCropDisabled(true);
        },5000);
*/
  setCropDisabled(true);
}

  function logOut()
  {
    localStorage.removeItem("token"); 
    props.history.push("/");
  }

  function changepassword()
  {
    props.history.push("/changepassword");
  }
  function updateTags(newtags)
  {
    //var old = this.state.user;
    //old.tags = newtags;
 //   Object.assign({...user,tags:newtags});
setUser( Object.assign({...user,tags:newtags}));
  }


  function locationUpdate(data)
  {
    var u = user;
    u.lat = data.lat();
    u.lng = data.lng();        
setUser(u);
  }

const  onCropChange = (cropper,percentCrop) => {
  setCrop(percentCrop);
  }



  let cropimagecontrol =null;
if(currentimg!=undefined || currentimg==="")
{
  cropimagecontrol = <div className={Styles.cropbox}><ReactCrop  disabled={cropdisabled}  onChange={onCropChange} crop={crop} src={currentimg} /></div>
}

    var imagemap = null;
if(user.lat)
{
  var markers =[];
  var marker = {};
  marker.position={ lat: user.lat, lng: user.lng};
  markers.push(marker) ;
  imagemap =  <Kopflosmap markers={markers} lat={user.lat}  lng={user.lng} valueUpdate={locationUpdate}/>
}

              var WrittenFantasies = user.witze.map(function(currentmember) {
                  var link = "/witze/" + currentmember.id;
                  return (            
             <div key={currentmember.id}><Link  to={link} dangerouslySetInnerHTML={{__html: currentmember.title}}></Link></div>       
      );       
    }); 




 var editor = null;
 if(user.name.length > 0)
 {
 editor = <RichtextEditor htmlcontent={user.description} onChange={handleEditDescription} />
} 

let koerperbereichspeichern = null;
let koerpberbereichausschneiden = null;
if(!cropdisabled){
koerperbereichspeichern =<Kfbutton action={cutimage} text="Körperbereich speichern"/>
}else
{
koerpberbereichausschneiden=<Kfbutton action={()=>{setCropDisabled(false)}} text="Körperbereich ausschneiden"/>
}

    return (
            <div id="edituserprofilepage">
            <table className="tblEditFantasie">
            <tbody>
            <tr><td className="tblEditProfileProps" >Deckname</td><td><input className="FantasieTitle" type="text" onChange={onChangeName}  value={user.name} /></td></tr>
            <tr><td>Jahrgang</td><td><input className="FantasieTitle" type="text" onChange={onChangeAgeGroup}  value={user.agegroup} /> </td></tr>
            <tr><td>E-Mail</td><td>
          <input className="FantasieTitle" type="text" onChange={onChangeEmail}  value={user.email} />
            </td></tr>
            <tr><td>Geschlecht</td><td>
            <select name="gender" onChange={changeGenre} value={user.genre} size="1">
                <option value="1">Mann</option>
                <option value="2">Frau</option>
                <option value="3">Paar</option>
                <option value="4">Transvestit</option>
                </select>
              </td></tr>
              <tr>
              <td>Bild</td><td>
              <div id="bildzone"></div>         
              {cropimagecontrol}
              {koerperbereichspeichern}
              {koerpberbereichausschneiden}
              <br/><br/></td>
              </tr>
           <tr>
                <td>Öffentliches Profil</td><td>
                <select name="public" onChange={changePublic} value={user.public} size="1">
                <option value="false">Nur für Mitglieder sichtbar</option>
                <option value="true">Öffentlich</option>               
                </select>
                </td>
           </tr>
           <tr>
             <td>Standort</td><td>
            {imagemap}
            </td>
             </tr>
              <tr>
                <td>Wer darf mir eine Nachricht senden?</td><td>
                <input id="mstype0" checked={('0'.localeCompare(user.messagetype)===0)} onChange={handleMessageChange} type="radio" name="messagetype" value="0" />
                <label htmlFor="mstype0">Jedes Mitglied darf mir eine Nachricht senden </label><br/> 
                <input id="mstype1" checked={('1'.localeCompare(user.messagetype)===0)} onChange={handleMessageChange} type="radio" name="messagetype" value="1" />
                <label htmlFor="mstype1"> Nur Mitglieder deren Witz ich mag (Witz geliked)</label> <br/> 
                <input id="mstype2" checked={('2'.localeCompare(user.messagetype)===0)} onChange={handleMessageChange} type="radio" name="messagetype" value="2" />
                <label htmlFor="mstype2"> Ich möchte keine Nachrichten erhalten.</label> 
                </td>
           </tr>
           <tr>
           <td>Webseite</td><td>
            <input className="FantasieTitle" type="text" onChange={onChangeWebpage}  value={user.webpage} /> 
              </td></tr>
              <tr>
            <td colSpan="2" ><h3>Informationen für andere Mitglieder</h3></td>
            </tr>
              <tr>
              <td colSpan="2">
            <div>
            {editor}            
            </div>
            </td></tr>
                 </tbody>
            </table><br/>
            <div>
            <h3>Geschreibene Witze:</h3>    
            </div>
            {WrittenFantasies}    
    <br/><br/>
            <span id="likefield" onClick={addNewFantasie}>    
            <span>Witz erstellen</span>
            </span>
            <br/><br/>
            <br/><br/>
            <div id="editprofilefooter">
       
             <Kfbutton action={changepassword} text="Passwort ändern"/> 
             <Kfbutton action={logOut} text="Auslogen"/> 
             <Kfbutton action={props.deleteProfil} text="Profil löschen"/> 
             </div>
             <Helmet>
               <title>Profil</title>
                <meta property="og:description" content="Stelle dich den andern Mitgliedern vor."/>
            </Helmet>
            </div>
            
    );

    
  }


export default EditMyProfile;