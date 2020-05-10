import React, {useEffect,useState,memo,useCallback} from 'react';
import {history} from '../index';
import useWebsocket from '../hooks/useWebsocket';


export const WebsocketContext = React.createContext();


function WebsocketContextWrapper(props) 
{
const  {sendMessage, lastMessage, readyState} = useWebsocket();
const  [actions, setActions] = useState([]);
const  [publicMessage, setPublicMessage] = useState({action:"",parameter:""});

/*
function broadcast (jsonobject)
{
    switch(jsonobject.action)
    {
        case "PUBLIC_MEMBER_ONLINE":
       //         window.setMemberOnline(jsonobject.content);
        break;
        case "PUBLIC_MEMBER_OFFLINE":
        //        window.setMemberOffline(jsonobject.content);
        break;
        default:
    }
}
*/

    

useEffect(() => {
   if (lastMessage===null)
   return;


    var jsonobj = JSON.parse(lastMessage)
    if(jsonobj.action ==="user.authrequired")
    {    
        if((localStorage.getItem("token")===null || localStorage.getItem("token")==="") && window.location.href.indexOf("login") === -1 )
        {
        history.replace('/login')      
        }else
        {
            addAction("user.tokenlogin", localStorage.getItem("token"), function(data){
                if(data.action!=="user.authrequired")
                {
                    let cl = actions.find(f=>f.action===jsonobj.content);
                    addAction(jsonobj.content,cl.parameter,cl.callback);
                }else
                {
                    history.replace('/login')   
                }
        });    
        }
    }else
    {
        if(jsonobj.action.indexOf("PUBLIC_") === 0)
        {
         //   broadcast(jsonobj);
         setPublicMessage(jsonobj);
        }else
        {           
        (actions).forEach((ev,i) => {
            if(ev.action ===jsonobj.action)
            {             
                actions.splice(i, 1); 
                if(ev.callback!==null && ev.callback!==undefined)
                    ev.callback(jsonobj);
            }
        });
        }
    }
    
},[lastMessage]);

 


const addAction = useCallback(function addAction(action,parameter, callback)
  { 
    let newelement = {action,parameter,callback};
    setActions(actions =>{return [...actions,newelement]});
    sendMessage(action,parameter);
  },[]);



return(
<WebsocketContext.Provider value={{readyState,addAction,publicMessage}}>
    {props.children}
</WebsocketContext.Provider>
);
}

export default memo(WebsocketContextWrapper);