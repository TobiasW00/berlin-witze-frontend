import React,{memo,useContext} from 'react';
import style from './databaseconnector.module.css';
import {WebsocketContext} from '../../provider/WebsocketContext';

function DatabaseConnector(props) {

  const {readyState} = useContext(WebsocketContext);

function getConnectionText(readyState)
{
  switch(readyState)
  {
    case 0:
        return "VERBINDEN";
    case 1:
      return "ONLINE";
    case 2:
      return "Verbindungsabbau";
    case 3:
       return "GETRENNT";
    default:
        return "....";
  }
}

     
    let cssclassname = style.online;
    switch(readyState)
    {
      case 0:
        cssclassname = style.connecting;
        break;
      case 1:
        cssclassname = style.online;
        break;
      case 2:
        cssclassname = style.offline;
        break;
      case 3:
        cssclassname = style.offline;
        break;
      default:
          cssclassname = style.offline;
    }    

    return (<div className={[style.dbconnectorbox, cssclassname].join(' ')}>
   {getConnectionText(readyState)}
     </div>
    );
  }
export default (DatabaseConnector);