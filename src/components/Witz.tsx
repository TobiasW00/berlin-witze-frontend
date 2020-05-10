import React from 'react';
import moment from 'moment';
import DisplayRoles from './DisplayRoles';
import { Link } from "react-router-dom";

import  IFantasie  from '../types/fantasie';

function Witz(props :IFantasie)  {

moment.locale('de');
   

        var liketext = ""  
        switch(props.likecount) {
            case 0:
                liketext = "Kein Mitglied findet diesen Text ansprechend.";
                break;
            case 1:
                liketext = "Ein Mitglied findet diesen Text ansprechend.";
                break;
            default:
                liketext = props.likecount +" Mitglieder findet diesen Text ansprechend.";
        } 
       var timetext = ""  
        switch(props.timetoread) {
            case 0:
                timetext = "Dieser Text ist extrem kurz.";
                break;
            case 1:
                timetext = "Sie benötigen nur eine Minute";
                break;
            default:
                timetext = "Sie benötigen " + props.timetoread + " Minuten für diesen Text.";
        } 
    
         var modifieddate = "Erstellt " +  moment(props.modified).startOf('day').fromNow();
         var modifieddays = moment().diff(props.modified, 'days') + 1;
         var viewstext = props.views + " Personen haben diesen Text betrachtet."
         var newimage;       
         if(modifieddays < 7)
         {            
             newimage = <img alt="Fantasie wurde diese Woche veröffentlicht."  className="newiconwitzbox" title="Fantasie wurde diese Woche veröffentlicht." src="/pics/new.png"/>      
         }
        

    return (
            <article>
			 <Link className="btn btn-primary" to={`/witze/${props.id}/${props.title.replace(/\s/g,'-').replace("?","").replace("&","-und-")}`}>
            <div className="witzbox">
            <table className="fantasietbl">
            <tbody>
            <tr><td className="witzboxheader"><h4 dangerouslySetInnerHTML={{__html: props.title}}></h4></td></tr>
            <tr><td><span className="rolheader">Rollen: </span><DisplayRoles roles={props.roles}/></td></tr>
            <tr><td><div className="fantasietbltext" dangerouslySetInnerHTML={{__html: props.story}}></div></td></tr>
            <tr>
            <td className="witzboxfootertd">
            <span className="footerspan">
              <span title={liketext} className="likecount">{props.likecount} <img alt={liketext} height="20px" src="/pics/like.png" title={liketext}/> | 
            </span><span title={timetext} className="likecount">{props.timetoread}<img alt={timetext}  height="20px" src="/pics/sandglass.png" /></span>
            <span title={modifieddate} className="likecount"> | {modifieddays} <img alt={modifieddate} height="20px" src="/pics/createdicon.png" /></span>
            <span title={viewstext} className="likecount"> | {props.views} <img alt={viewstext} height="20px" src="/pics/reader.png" /></span>
            </span>
              </td>
            </tr>
            </tbody>
            </table>
            {newimage}         
            </div>
			</Link>
            </article>
    );
  }

export default Witz




