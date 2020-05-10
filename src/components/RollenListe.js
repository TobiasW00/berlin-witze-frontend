/* import Dispatcher from './Dispatcher'; */
import Rolle from './Rolle';
import React,{useContext} from 'react';
import {EditFantasieContext} from '../pages/witz/EditWitz';

function RollenListe(props) {

  const {dispatch} = useContext(EditFantasieContext);
  let roles = props.roles;
  function addRoll()
  {  
    dispatch({type:"ADD_ROLE"});
  }
  console.log(roles);
        var Rolls = roles.map(function(currentmember,i) {            
      return (
        <Rolle key={i} index={i} rolle={currentmember}/>
      ); 
       
    });  
      
    return (
            <div >
            <br/>
            <span className="kfbutton" onClick={addRoll}>    
            <span>Charakter hinzufügen</span>
            </span><br/><br/>
            {Rolls}
            </div>
    );
  }



export default RollenListe;



