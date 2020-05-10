import React, {useEffect,useContext,useState,useReducer,useCallback} from 'react';
import {WebsocketContext} from './WebsocketContext';
export const MemberContext = React.createContext();


function MembersContextWrapper(props) 
{
    const [members, dispatch] = useReducer(reducer, []);
    const [isLoading, setLoading] = useState(true);
    const {addAction, publicMessage}  = useContext(WebsocketContext);


    function reducer(state, action) {
           switch (action.type) {
          case 'SET_MEMBERS':
            return action.payload;
          case 'SET_MEMBER':        
            return[...state.filter(f=>f.id !== action.payload.id),action.payload];    
          case 'PUBLIC_MEMBER_OFFLINE':        
            return state.map(f=> f.id === action.payload ? {...f,online:false} : f );   
          case 'PUBLIC_MEMBER_ONLINE':        
            return state.map(f=> f.id === action.payload ? {...f,online:true} : f );  
          default:
            return state;
        }
      }


      useEffect(()=>
      {
          dispatch({type:publicMessage.action, payload:publicMessage.content});        
      },[publicMessage]);

    
   const fetchMember= useCallback(function fetchMembersub(MemberID)
    {     
        addAction("user.single",MemberID,(data)=>{
          dispatch({type:"SET_MEMBER", payload:data.content});        
          setLoading(false);
      });
    },[]);

   const fetchMembers = useCallback(function fetchMemberssub()
    {
      addAction("member.loadallmembers",null,(data)=>{
        dispatch({type:"SET_MEMBERS", payload:data.content});        
        setLoading(false);
    });
    

    },[]);

return(
<MemberContext.Provider value={{members,isLoading,fetchMember,fetchMembers}}>
    {props.children}
</MemberContext.Provider>
);
}

export default MembersContextWrapper;