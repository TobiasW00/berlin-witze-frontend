import { useHistory } from 'react-router-dom';
import React,{useState,useContext} from 'react';
import Kfbutton from '../../components/Kfbutton';
import {WebsocketContext} from '../../provider/WebsocketContext';
import swal from 'sweetalert';

function ChangePassword(props) {

const [oldpw,setOldPw] = useState("");
const [newpw,setNewPW] = useState("");
const {addAction} = useContext(WebsocketContext);
const history = useHistory();

  function changepassword()
  {   

  var jsondata = {};
  jsondata.old = oldpw;		
  jsondata.new = newpw;
 addAction("user.changepw",jsondata,function(data)
  {
    if(data.state==="OK")
    {
      swal("Password geändert", "Weiterhin viel Spaß!", "success"); 
      history.push("/editmyprofile");
    }else
    {
      console.log(data);
    }
  });                               
  }


  function onChangeold(e) {
    setOldPw(e.target.value);
  }

function onChangenew(e)
{
     setNewPW(e.target.value);
}



    return (
            <div id="newfantasiepage">
            <table className="tblEditFantasie">
            <tbody>
            <tr><td>Aktuelles Passwort</td><td> <input id="newfantasietitleinput"  type="password"  onChange={onChangeold} value={oldpw} /></td></tr>
            <tr><td>
              Neues Passwort
            </td><td><input id="newfantasietitleinput"  type="password"  onChange={onChangenew} value={newpw} />            
            </td></tr>
            </tbody>
            </table><br/>
            <Kfbutton action={changepassword} text="Passwort ändern"/> 
            </div>
            
    );


}
export default ChangePassword;



