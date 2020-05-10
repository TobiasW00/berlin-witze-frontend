import { useHistory } from 'react-router-dom';
import React,{useState,useContext} from 'react';
import { NavLink } from "react-router-dom";
import swal from 'sweetalert';
import {WebsocketContext} from '../../provider/WebsocketContext'
import styles from './RegisterUser.module.css';
import ReCAPTCHA from "react-google-recaptcha";

function RegisterUser(props){  
  const {addAction} = useContext(WebsocketContext);
  const [email,setEmail] = useState("");
  const [emailrepeat,setEmailRepeat] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [passwordrepeat,setPasswordRepeat] = useState("");
  const [acceptteilnahmebedingungen,setAcceptteilnahmebedingungen] = useState(false);
  const [acceptcaptcha,setAcceptcaptcha] = useState(false);
  const history = useHistory();
    function onCaptchaChange(value) {
      setAcceptcaptcha(true);
    }

   function handleRegisterUser(){
       if(acceptteilnahmebedingungen===false)
       {
           swal("Oops...", "Bitte Teilnahmebedingungen akzeptieren.", "error");     
           
       }else
        
			 var jsondata = {};
			 jsondata.email = email;
			 jsondata.username = username;
			 jsondata.password = password;			 
			 addAction("user.register",jsondata,function(data)
        {            
            if(data.state==="OK")
            {
              localStorage.setItem("token", data.content);
              swal("Registrierung erfolgreich.", "Sie können sich jetzt einloggen!", "success");
              history.push("/editmyprofile/");
            }else
            {    
              localStorage.setItem("token", "");            
              swal("Oops...", "Fehler bei der Registrierung. Vielleicht existiert die E-Mail oder das Pseudonym bereits im System.", "error");      
            }
        });
    }
    
    function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangeEmailRepeat(e)
  {
    setEmailRepeat(e.target.value);
  }
   function onChangeUsername(e) {
    setUsername(e.target.value);
  }
  
  function onChangePassword(e) {
   setPassword(e.target.value);
  }
  function onChangePasswordRepeat(e)
  {
    setPasswordRepeat(e.target.value);
  }
  function onChangeteilnahmebedingungen(e)
  {   
      setAcceptteilnahmebedingungen(e.target.checked);
  }
 function openPopupTeilnehmerbedingungen()
  {
   window.open("/teilnehmerbedingungen.html", "Teilnehmerbedingungen", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=400");
  }

  function openPopupImpressumundDatenschutz()
  {
   window.open("/datenschutz.html", "Datenschutz", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=400");
  }



     
    return (
            <div className={styles.registerform}>
            <h1>Herzlich willkommen,</h1>
            auf Berlin-Witze.de! Hier werden <NavLink to="/witze" >Witze</NavLink> geteilt und interessante Videos, Blogbeiträge, Podcasts über Berlin verlinkt.<br/>
            Als registriertes Mitglied kannst Du selbst einen Witz ver&ouml;ffentlichen.


            <h2>Registration auf berlin-witze.de</h2>
            <div className={styles.registeruserbox}>
            <table>
            <tbody>
            <tr>
           <td>
          Dein Pseudonym
            </td><td><input id="username" type="text"  onChange={onChangeUsername} value={username} /></td>
            <td>{(username.length > 3) ? ' ✔':''}</td>
            </tr>
             <tr><td>
            E-Mail
            </td><td><input id="email" type="email" onChange={onChangeEmail} value={email} />        
              </td>
              <td>{(email.indexOf('@') > 0 && email.indexOf('.') > 0  ) ? ' ✔':''}</td>
              </tr>
              <tr><td>
            E-Mail wiederholen
            </td><td><input id="email" type="email" onChange={onChangeEmailRepeat} value={emailrepeat} />        
              </td>
              <td>{(email === emailrepeat && email.length > 5 ) ? ' ✔':''}</td>
              </tr>
           <tr>
            <td>Passwort</td>
            <td>
                <input id="password" type="password" onChange={onChangePassword} value={password} />
            </td>
            <td>{(password.length > 5) ? ' ✔':''}</td>
            </tr>
            <tr>
            <td>Passwort wiederholen</td>
            <td>
                <input id="password2" type="password" onChange={onChangePasswordRepeat} value={passwordrepeat} />
            </td>
            <td>{(password === passwordrepeat ) ? ' ✔':''}</td>
            </tr>
            <tr>
            <td></td><td>

            <label title="Teilnahmebedingungen" className="control control--checkbox">
            <div className="registerpopuptext" onClick={openPopupTeilnehmerbedingungen}>Teilnahmebedingungen</div>
          <input type="checkbox" onChange={onChangeteilnahmebedingungen} checked={acceptteilnahmebedingungen}    />
          <div className="control__indicator">
           </div>
           </label> und                   
           <div className="registerpopuptext" onClick={openPopupImpressumundDatenschutz}> Datenschutzerklärung</div> akzeptieren</td>
           <td>{(acceptteilnahmebedingungen ) ? ' ✔':''}</td>
              </tr>
            <tr>
             <td></td><td>             
           <br/>
           <ReCAPTCHA
    sitekey="6LcNiaUUAAAAAEyqTErksQFyZb3NQRTC4asxOQxg"
    onChange={onCaptchaChange}
  /><br/>
</td>
<td>{(acceptcaptcha ) ? ' ✔':''}</td></tr>
<tr><td></td>
  <td>
            <span className={styles.likefield} onClick={handleRegisterUser}>    
              <span>Registrieren</span>
            </span>
            <br/>
            </td>
            </tr>
            </tbody>
            </table>
             </div>
     
           </div>
    );
  }

export default RegisterUser;
