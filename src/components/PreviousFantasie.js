import React,{useState,useEffect,useContext} from 'react';
import {EditFantasieContext} from '../pages/witz/EditWitz';
import {UserContext} from '../provider/UserContext';
import { WebsocketContext } from '../provider/WebsocketContext';

function PreviousFantasie(props){
    
    const[fantasies,setFantasies] = useState([]);
    const {dispatch} = useContext(EditFantasieContext);
    const {user} = useContext(UserContext);
    const {addAction} = useContext(WebsocketContext);
   useEffect(()=>
   {

    function loaduserfantasies()
    {   
      addAction("fantasies.users",function(data)
          {
              setFantasies(data.content);                  
          });                
    }
  

    loaduserfantasies();
   },[user.id,addAction])

  

  function changePriviousFantasie(e)
  {
      dispatch({type:"SET_PREVIOUSFANTASIE", payload:e.target.value});
  }

       var PreviousFantasies = '';      
       if(fantasies !=null)
       {     
             PreviousFantasies = fantasies.map(function(fantasie) {                               
                          return (<option key={fantasie.id}  value={fantasie.id}>{fantasie.title}</option>);       
            }); 

       return (
                <span>
                <h4>Dieser Text eine Fortsetzung von</h4>
                <select name="public" value={props.previouswitzid} onChange={changePriviousFantasie} size="1">
                    <option value=""></option>
                     {PreviousFantasies}
                    </select>
                 </span>
    );
   }else
   {
       return(null);
   }
  }
export default PreviousFantasie;