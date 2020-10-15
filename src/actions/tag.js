
import {SET_TAGS} from "./actions";
import React,{useContext} from "react";
import { useDispatch,useSelector } from "react-redux";
import { WebsocketContext } from '../provider/WebsocketContext';



//const {addAction} = useContext(WebsocketContext);
export function fetchTags() {
return;
/*  
return (dispatch,getState)=>
    {
      const { tags } = getState();
      if(tags.length ===0)
      {
          addAction("tag.loadalltags",null,function(data)
          {
            dispatch({type:SET_TAGS, payload:data});   
          });
          /*
      TagApi.gettags((data)=>{
           dispatch({type:SET_TAGS, payload:data});        
          });
          
      }

    };
    */
}