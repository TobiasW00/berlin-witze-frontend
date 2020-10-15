import React from 'react';
import { Route } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Videos from './pages/videos/videos';
import Startseite from './pages/start/startpage';
import Witzepage from './pages/witz/witz_page';
import EditUserProfileWrapper from './pages/userprofileedit/Profilewrapper';
import Teilnahmebedingungen  from './pages/Teilnahmebedingungen'
import SingleWitz from './pages/witz/SingleWitz';
import SingleMember from './pages/member/SingleMember';
import sendMessage from './components/sendMessage';
import ChangePassword from './pages/changepassword/ChangePassword';
import EditFantasie from './pages/witz/EditWitz';
import RegisterUser from './pages/registeruser/RegisterUser';
import Login from './pages/Login';
import Inbox from './pages/inbox/Inbox';
import Conversation from './components/Conversation';
import Impressum from './pages/impressum/Impressum';
import MemberPage from './pages/member/member_page';
import Navigation from "./Navigation";
import {Helmet} from "react-helmet";

import DatabaseConnectort from './components/DatabaseConnector/databaseconnector'
import './App.css';

function App(props) {	
    return (    
        <React.Suspense fallback={<div>Loading...</div>}>  
<div>
      <div id="stdNavbar">
            <Helmet>
                <meta http-equiv="language" content="de"/>
                <meta property="og:image" content="/pics/kopflos.png"/>
                <meta property="og:url" content="https://berlin-witze.de/index.html"/>
            </Helmet>
      <Navigation />  
      </div>
     <DatabaseConnectort />
<div id="stdMain">
<Route path='/tags/:tag' component={Witzepage}/>    
<Route path='/witze/:witzId' component={SingleWitz}/>    
<Route exact path='/witze' component={Witzepage}/>
<Route path="/member/:id" component={SingleMember}/>
<Route exact path="/member" component={MemberPage}/>
<Route path="/editmyprofile" component={EditUserProfileWrapper}/>  
<Route path="/changepassword" component={ChangePassword}/>     
<Route path="/teilnahmebedingungen" component={Teilnahmebedingungen}/>            
<Route path="/sendmessage/:memberId" component={sendMessage}/>
<Route path="/editwitz/:witzId" component={EditFantasie}/>  
<Route exact path="/newfantasie" component={EditFantasie} />
<Route exact path="/registeruser" component={RegisterUser} />
<Route exact path="/login" component={Login} />   
<Route exact path="/inbox" component={Inbox} />
<Route  path="/inbox/:id" component={Conversation} />
<Route exact path="/impressum" component={Impressum} />
<Route exact path="/videos" component={Videos} />
<Route exact path="/" component={Startseite} />
</div>
<div className="stdFooter">
© 2020
| <NavLink to="/impressum" >Impressum 	&amp; Datenschutz</NavLink>
</div>
</div></React.Suspense>
    );
  }
export default App;