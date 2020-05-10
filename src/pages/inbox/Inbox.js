import React,{useEffect,useContext} from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import {UserContext} from '../../provider/UserContext';
import {MemberContext} from '../../provider/MemberContext';
import { InboxContext } from '../../provider/InboxContext';
import { WebsocketContext } from '../../provider/WebsocketContext';
import {Helmet}  from 'react-helmet';

function Inbox(props){  

   const {inbox,setInbox} = useContext(InboxContext);
   const {members} = useContext(MemberContext)
   const {user} = useContext(UserContext)
   const {addAction} = useContext(WebsocketContext);
   const pushHistory = props.history.push;
   const history = useHistory();
   useEffect(() => {
 
    addAction("msg.getmgs",null,(data)=>{
        if(data.state ==="authrequired")
        {
          history.push('/');
        }else
        {        
          setInbox(data.content);
        }
      });
   },[]);
 
 function handleShowMessage(msg)
  { 
    if(msg.sender===user.id)
    {
      pushHistory('/inbox/' + msg.receiver);  
      }else
      {
        pushHistory('/inbox/' + msg.sender);  
      }
  }

   function handleShowUser(userid,e)
  { 
       
    pushHistory('/member/' + userid);  
       e.preventDefault();
       e.stopPropagation();
  }

  if(user===undefined)
  return null;

      var selfmg = this;
      var msgs ="";
      if(inbox == null || inbox.length===0)
      {
        return(<div className="nomessagebox"><h1>Keine Nachrichten im Postfach.</h1></div>);
      }
      
      if(inbox)
      {
            msgs = inbox.map(function(msg) {   
              let username = '';
              if(members.length > 0)
              {
                username = members.find(f=>f.id ===msg.sender).name;    
              }    
               var modifieddays = moment(msg.senddate).fromNow();
                return (          
            <div key={msg.id} onClick={handleShowMessage.bind(selfmg, msg)} className="msgboxitem"><div className="timefield">{modifieddays}</div><span className="inboxusername" onClick={handleShowUser.bind(selfmg, msg.sender)}>{username}</span><span  className="inboxmessagetext" dangerouslySetInnerHTML={{__html:msg.content}}></span></div>
          );       
        });   
      }
      
      let seotitle = (inbox.length ===0) ? "Keine Nachrichten" : inbox.length + " Gespräche" ;
      return (
        <div id="inboxpage">
        <div>
              {msgs}
        </div>
        <Helmet>
               <title>{seotitle}</title>
                <meta property="og:description" content="Tolle erotische Geschichten. Lass dein Kopfkino in Fahrt kommen."/>
            </Helmet>
        </div>
      );   
  }


export default Inbox;

