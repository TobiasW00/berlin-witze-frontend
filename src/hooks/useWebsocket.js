import {useEffect,useState,useRef} from 'react';
import {WS_URL} from '../api/config';
function useWebsocket() {
  const [ lastMessage, setLastMessage ] = useState(null);
  const [ readyState, setReadyState ] = useState(0);
  const [ queue, setQueue ] = useState([]);
  const webSocketRef = useRef(null);


  useEffect(() => {
    function workQueue()
    {     
        if( webSocketRef.current !==null && webSocketRef.current.readyState ===1)
        {
          for(let i=0;i<queue.length;i++)
          {
            let sendstr = JSON.stringify(queue[i]);
            webSocketRef.current && webSocketRef.current.send(sendstr);
            setQueue(q=> q.filter(f=>f.action !==queue[i].action));
          }
        }
      
    }
    workQueue();

  },[readyState,queue]);


  useEffect(() => {

    const start = () => {
      webSocketRef.current = new WebSocket(WS_URL);
    }
    start();

    webSocketRef.current.onmessage = (message) => {
      setLastMessage(message.data);
    };

    
    webSocketRef.current.onopen = (event) => {
      setReadyState(webSocketRef.current.readyState);
    };

    webSocketRef.current.onclose = (event) => {
     setReadyState(webSocketRef.current.readyState);
    };


    webSocketRef.current.onerror = (error) => {      
       setReadyState(webSocketRef.current.readyState);
      };


  }, []);




function sendMessage(action, parameter)
{
  let sendstr ={
    action: action,
    parameter: parameter
  };
  if(webSocketRef.current !==null && webSocketRef.current.readyState ===1)
  {

    webSocketRef.current && webSocketRef.current.send(JSON.stringify(sendstr));
  }else
  {
   setQueue(q => q.concat([sendstr]));
  }
}

   return {sendMessage, lastMessage, readyState};
}

export default useWebsocket;