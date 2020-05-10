import { useHistory } from 'react-router-dom';
import React,{memo,useEffect,useState,useContext} from 'react';
import moment from 'moment';
import {HTTP_URL} from '../api/config';
import Kfbutton from '../components/Kfbutton';
import {MemberContext} from '../provider/MemberContext';
import { WebsocketContext } from '../provider/WebsocketContext';


function Conversation(props) {  

      const [content,setContent] = useState("");
      const [conversation, setConversation] = useState([]);
      const {members,fetchMembers} = useContext(MemberContext);
      const {addAction} = useContext(WebsocketContext);
    const history = useHistory();
  useEffect(()=>
  {
    fetchMembers();
  },[]);

      useEffect(()=>{
        window.scrollTo(0,document.body.scrollHeight);

        addAction("msg.getconversation",props.match.params.id,function getConversation(data)
        {
            setConversation(data.content)
        });
     
    
    },[props.match.params.id]);
     



  function handleUsernameClick(userid)
  {
        history.push('/member/' + userid);   
  }

  function sendMessage()
  {
    var jsondata = {};
    jsondata.content = content;
    jsondata.receiver = props.match.params.i;
    addAction("msg.add",jsondata, function addmessage(data){
      setConversation( [...conversation,data.content]);
    });
  setContent("");
  }

function onChangeContent(e) {   
      setContent(e.target.value);
  }



   var chatprotokoll = conversation.map(function(msg) { 

       var usepicture ="/pics/person.jpg";
       let username = '';
       let user = members.find(f=>f.id === msg.sender);
       if(user !==undefined)
        {
          username = user.name;
          let urlpic = HTTP_URL +"/berlinwitzepictures/tumb_" + msg.sender + ".jpg";
          usepicture = user.picture ? urlpic : "/pics/person.jpg";
        }
       var modifieddays = moment(msg.senddate).fromNow();
        return (
        <div className="chatbox" key={msg.id}>
            <div className="userpicturebox">
            <img alt="Benutzerbild" className="imgconversation" src={usepicture}/>
            </div>
            <div>
            <span onClick={handleUsernameClick.bind(this, msg.sender)}   className="usernameconversation"> {username}</span> <span className="msgsend"> {modifieddays}</span>
            </div>
            <div dangerouslySetInnerHTML={{__html:msg.content}}></div>
        </div>
      ); 
       
    });  
    return (<div>
<div>{chatprotokoll}</div>
<div className="chatbox">
 <textarea className="tblEditFantasieStory"  onChange={onChangeContent}  value={content}/><br/><br/>
     <Kfbutton action={sendMessage} text="Nachricht senden"/> 
     <br/><br/>
     </div>
     </div>
    );
  }


export default Conversation;
