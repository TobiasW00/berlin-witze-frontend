import React, {useEffect,useState,useContext,useReducer,useMemo,useCallback} from 'react';
import {useWitzeFilterState} from './WitzeFilterContext';
import useDebounce from '../hooks/useDebounce';
import {HTTP_URL} from '../api/config';
import {WebsocketContext} from './WebsocketContext';
export const WitzeContext = React.createContext();


function WitzeContextWrapper(props) 
{
    const [witze, dispatch] = useReducer(reducer, []);
    const [isLoading, setLoading] = useState(false);
    const filter = useWitzeFilterState();
    const debouncedFilter = useDebounce(filter, 500);
    const {addAction}  = useContext(WebsocketContext);

    function reducer(state, action) {
           switch (action.type) {
          case 'SET_WITZE':
            return action.payload;
          case 'SET_WITZ':        
            return[...state.filter(f=>f.id !== action.payload.id),action.payload];    
            case 'ADD_LIKE':  
             return state.map((witz)=>{return (witz.id ===action.payload)  ? {...witz,likecount:witz.likecount++} : witz})
          case 'ADD_ROLLE':        
          return state.map((witz) => {
            if(witz.id !==action.payload)
            return witz;

            return {...witz,roles: [...witz.roles,action.payload]};
          });      
          case 'VIEW_WITZ':        
            return state.map((witz) => {
              if(witz.id !==action.payload)
              return witz;

              return {...witz,views:++witz.views};
            });        

           default:
            throw new Error();
        }
      }

useEffect(() =>
{
if(!filter)
return;

  function filterWitze(searchfilter)
  {
      setLoading(true);  
      searchfilter.searchtext = searchfilter.searchtext.toLowerCase();  
      addAction("witze.search",searchfilter, function(data)
        {
          dispatch({type:'SET_WITZE', payload:data.content});       
          setLoading(false);   
        }); 
  }


if(filter.searchtext ==="" && filter.selectedtags.length===0)
{
  if(window.location.pathname === "/witze")
  {
  fetchWitze();
  }
}else
{ 
  filterWitze(debouncedFilter);
}
},[debouncedFilter]);

const addLike = useCallback(function addlike(id)
{
  dispatch({type:'ADD_LIKE', payload:id});  
},[]);


const viewWitz = useCallback(function viewwitzsub(ID)
{       
  addAction("witz.view",ID,(data)=>{    
      dispatch({type:"VIEW_WITZ",payload:ID});
     });
},[]);



const fetchWitz = useCallback(async function fetchwitzSub(ID)
  {    
    return new Promise(function (resolve) 
    {  
    setLoading(true);  

    fetch(`${HTTP_URL}/api/witz/${ID}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      dispatch({type:"SET_WITZ", payload:data.content})
      setLoading(false);    
      resolve(data.content);
    })
    .catch(function(error) {
      console.error(error);
    });

   });
  },[]);


  const fetchWitze = useCallback(async function fetchwitzsSub()
  {
    return new Promise(function(resolve)
    {    
      setLoading(true);  
      fetch(`${HTTP_URL}/api/witze`)
      .then(function(response) {
        return response.json();
      })
      .then((data)=>{
          dispatch({type:"SET_WITZE", payload:data.content});  
          setLoading(false);    
          resolve(data.content);
         })
         .catch(function(error) {
          console.error(error);
        });
   });
},[]);


const valuememo = useMemo(() => {return {witze,addLike,isLoading,fetchWitze,fetchWitz,viewWitz}}, [witze,isLoading]);
return(
<WitzeContext.Provider value={valuememo}>
    {props.children}
</WitzeContext.Provider>
);
}

export default WitzeContextWrapper;