import React from 'react';
function DisplayRoles(props){

  function handleClick(i, props) {
      swal(props.roles[i].name +" (" + props.roles[i].verhalten + ") ", props.roles[i].description)
}
 
      if (this.props.roles == null)
      {
              return (
            <span>
            </span>
    );
      }
      
            var Rolls = props.roles.map(function(rol,i) { 
     var icon = "design/pics/female.png";
     if(rol.genre ==="Mann")
     {
         icon ="design/pics/male.png";         
     }
     
     var erzaehler = "";
    
     if(rol.storyteller)
     {
         erzaehler =<img height="16" width="16"  src="design/pics/erzaehler.png" title="Aus dieser Sicht wurde die Fantasie geschreiben"/>;         
     }
     
     
     
      return (
        <span onClick={handleClick.bind(this, i, props)}  key={rol.id} title={rol.description} className="displayrole">{erzaehler} <img height="16" width="16"  src={icon}/> {rol.name}({rol.age},{rol.verhalten}) </span>
      ); 
        });
    return (
            <span>
            {Rolls}
            </span>
    );
  }


export default DisplayRoles;



