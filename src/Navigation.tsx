import React,{useContext} from "react";
import './App.css';
import { NavLink } from "react-router-dom";
import IUserContext from './types/usercontext';


import {UserContext} from './provider/UserContext';
function NavigationComponent(){

        const {name} = useContext(UserContext);
  return(
<div className="topnavigation">
        <nav>
        <NavLink activeClassName="activebutton" exact to="/"> <div className="stdnavbutton"><img alt="Berlin Witze Logo" className="inboxicon"  title="Inbox"  src="/pics/kopflos.png" />Info</div></NavLink>	  
        <NavLink activeClassName="activebutton" exact to="/videos"> <div className="stdnavbutton"><img alt="Lustige Videos" className="inboxicon"  title="Lustige Videos"  src="/pics/navi-video.webp" />Videos</div></NavLink>	  
        <NavLink activeClassName="activebutton" to="/witze" > <div className="stdnavbutton"><img alt="Witze" className="inboxicon"  title="Witze"  src="/pics/fantasie.png" />Witze</div></NavLink>
        <NavLink activeClassName="activebutton" to="/member" ><div className="stdnavbutton"><img alt="Mitglieder" className="inboxicon"  title="Mitglieder"  src="/pics/members.png"/>Mitglieder</div></NavLink>
        <NavLink activeClassName="activebutton" to="/inbox" ><div className="stdnavbutton"> <img className="inboxicon" alt="Nachrichten" title="Nachrichten"  src="/pics/inbox.png"/>Nachrichten</div></NavLink>
        <NavLink activeClassName="activebutton" to="/editmyprofile"><div className="stdnavbutton"><img  alt="Suche" className="inboxicon"  title="Profilseite" src="/pics/home.png"/>{name}</div></NavLink>
        </nav>
</div>);  
}
NavigationComponent.whyDidYouRender = false;
export default (NavigationComponent);