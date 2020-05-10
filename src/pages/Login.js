import React,{useState,useEffect,useContext} from 'react';
import {WebsocketContext} from '../provider/WebsocketContext';
import swal from 'sweetalert';
import Kfbutton from '../components/Kfbutton';
import { Link } from "react-router-dom";

function Login(props) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {addAction}  = useContext(WebsocketContext);
    function downHandler({ key }) {
      if (key === 'Enter') {
        handleLogin();
      }
    }
  

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
      return () => {
        window.removeEventListener('keydown', downHandler);
      };
    });


const  handleLogin = () =>{


  var jsondata = {};
  jsondata.email = email;		
  jsondata.password = password;
  addAction("user.login",jsondata,function(data)
        {           
             if(data.state==="OK")
             {  
               localStorage.setItem("token",data.content);          
              swal("Willkommen!", "Viel Spaß auf berlin-witze.de", "success");      
              props.history.push("/witze/");
             }else
             {
               console.log("Login nicht erfolgreich..");
              swal("Oops...", "Diese Zugangsdaten funktionieren nicht.", "error");                 
             }
             
        });

    }

    function onChangeEmail(e) {
         setEmail(e.target.value);
  }

  function onChangePassword(e) {
    setPassword(e.target.value);
  }
  
 
    return (
            <div id="loginpage">
            <div className="loginblock">
            <table>
            <tbody>
            <tr><td>
            E-Mail
            </td><td><input id="email" type="text" onChange={onChangeEmail} value={email} /></td></tr>
            <tr>
            <td>Passwort</td>
            <td>
            <input id="passwordfield" type="password" onChange={onChangePassword} value={password} />
            </td>
            </tr><tr>
    <td></td><td><br/>
    <Kfbutton action={handleLogin} text="Login"/>
    <br/><br/>
            Kein Zugang?  <Link to="/registeruser">Kostenlos registrieren</Link>
   </td>
    </tr>
    </tbody>
            </table>
    </div>
    <br/>
    <div className="MemberLoginBlock">
            <h1>Vorteile als registriertes Mitglied</h1>
          <ul>
                <li>Sie können die <b>Autoren kontaktieren</b> (nur wenn diese eine Kontaktinformation hinterlegt haben)</li>
                <li>Eigene <b>Witze veröffentlichen</b></li>
                <li>Sie bleiben <b>anonym</b>, lediglich ein E-Mail Adresse und ein Deckname wird benötigt</li>
                <li><b>Kostenlos</b></li>
         </ul>  
   </div>
            
            </div>
    );
  
}

export default Login;

