import React, {useEffect,useState,memo,useContext} from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import {WebsocketContext} from './WebsocketContext';
import IUser from '../types/user';

const username = "Login";

export const UserContext = React.createContext({name:username,online:false});

//export const UserContext = React.createContext<IUserContext>({user:{name:username,online:false},setUser:null});

function UserContextWrapper(props) 
{
const [user, setUser] = useState({name:username,online:false});
const debouncedUser = useDebounce(user, 2000);
const {addAction}  = useContext(WebsocketContext);
let history = useHistory();


useEffect(() => {
    if(!user.online)
    {
            if(window.location.href.indexOf("login") === -1)
            {        
            if(localStorage.getItem("token")!== null) 
            { 
              addAction("user.mydata",null,(data)=>{
                    if(data.state==="OK")
                    {
                    setUser(data.content); 
                    }
                    
            });
            }
            }
     }
},[history.location]);

useEffect(() => {

    const saveMyUserSettings = () =>
    {
                       var jsondata = user;
                           jsondata.genre =   parseInt(user.genre);        
                         addAction("user.set.edit",jsondata,function(data)
                          {
                            if(data.state ==="OK")
                            {
                               
                             // self.props.history.push('/member/' + data.content.id);   
                            }
                          });
     }
    if(user !== null)
    {
           saveMyUserSettings();
    }
  },[debouncedUser]);


return(
<UserContext.Provider value={{user,setUser}}>
    {props.children}
</UserContext.Provider>
);
}

export default memo(UserContextWrapper);