import React from 'react';
import swal from 'sweetalert';
import Rolle from '../types/rolle';

interface IDiyplayRolesProps {
    roles:Rolle[];

}


function DisplayRoles(props:IDiyplayRolesProps){

function handleClick(i:number) {
      swal(props.roles[i].name +"  ", props.roles[i].description)
}
      if (props.roles == null)
      {
              return (<span></span>);
      }
      
     let Rolls = props.roles.map(function(rol,i) { 
        const komma = (i===props.roles.length-1) ? "" : ",";

      return (
      <span onClick={()=>{handleClick(i)}}  key={rol.id} title={rol.description} className="displayrole">{rol.name}{komma}</span>
      ); 
        });
      
    return (
            <span>
            {Rolls}
            </span>
    );
}


export default (DisplayRoles);



