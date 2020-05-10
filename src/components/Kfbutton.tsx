import React from 'react';


interface IButton {text:string, action:Function };

function Kfbutton(props:IButton) {
	
 function handleButtonClick() {
          props.action(); 
  }

           return (
                  <span className="kfbutton" onClick={handleButtonClick}>    
                    <span>{props.text}</span>
                  </span>
                  );
            
}

export default (Kfbutton);