import React,{useState,useEffect,useContext} from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import Kfbutton from './Kfbutton';
import { WebsocketContext } from '../provider/WebsocketContext';

function SendMsg(props)
{    

const [member,setMember] = useState({});
const [content,setContent] = useState("");
const {addAction} = useContext(WebsocketContext);
const history = useHistory();
    useEffect(()=> {

     function loadMemberFromServer()
     {
          addAction("user.single",props.match.params.memberId,function(data)
          {
             setMember(data.content); 
          });
     }
    loadMemberFromServer();    
  },[props.match.params.memberId,addAction]);



 function onChangeContent(e) {   
       setContent(e.target.value);
  }

  function sendMessage()
  {
     let jsondata = {};
     jsondata.content = content;
     jsondata.receiver = props.match.params.memberId;
    addAction("msg.add",jsondata, function(data)
    {
                       if(data.state==="authrequired")
                                {                                              
                                     history.push('/login');                        
                                }else
                                {                                 
				                      if(data.state==="error")
                                   {
                                    swal("Oops...", data.msg, "error");                                        
                                   }else
                                   {
                                       swal("Nachricht gesendet.","Jetzt geht's zur Inbox", "success"); 
                                       props.history.push('/inbox');    
                                   }
                                   
                                }   
    }); 
  }


    return (
            <div id="sendmessagepage">
            <table className="tblEditFantasie">
            <tbody>
            <tr><td className="tblEditProfileProps" >Empfänger</td><td>{member.name}</td></tr>
            <tr>
            <td colSpan="2">
            <textarea className="tblEditFantasieStory"  onChange={onChangeContent}  value={content}>
            </textarea>
            </td>
            </tr>
            </tbody>
            </table><br/>
            <Kfbutton action={sendMessage} text="Nachricht senden"/> 
            </div>
    );
}

export default SendMsg;