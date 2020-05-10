import React,{useState,useEffect,useReducer,useContext} from 'react';
import RichTextEditor from 'react-rte';
import Editor from '../../components/Editor/Editor';
import swal from 'sweetalert';
import Kfbutton from '../../components/Kfbutton';
import RollenListe from '../../components/RollenListe';
import PreviousFantasie from '../../components/PreviousFantasie';
import SeleSelectTagFantasieEdit from '../../components/SelectTagWitzEdit';
import {WebsocketContext} from '../../provider/WebsocketContext';
import { WitzeContext } from '../../provider/WitzeContext';


export const EditFantasieContext = React.createContext(null);

function EditFantasie(props) {
  const {addAction} = useContext(WebsocketContext);
  const initialState = {title:"",story:"",roles:[],id:"",comment:[],ownerid:"",allowcomments:false,public:false,tags:"",imowner:false}; 
  const [witz, dispatch] = useReducer(reducer, initialState);

  const [witztext,setWitztext] = useState(RichTextEditor.createEmptyValue());
 
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_EDITWITZ':
        return action.payload;
      case 'ADD_TAG':
        return {...state,tags:state.tags + action.payload+ ";"};
      case 'REMOVE_TAG':
          return {...state,tags:state.tags.replace(action.payload+";","")};
      case 'SET_TITLE':
            return  {...state,title:action.payload};
      case 'SET_STORY':
              return {...state,story:action.payload};
      case 'TOGGLE_ALLOWCOMMENTS':
                return {...state,allowcomments:!state.allowcomments};
     case 'TOGGLE_PUBLIC':
             return {...state,public:!state.public};
     case 'TOGGLE_IMOWNER':
                return {...state,imowner:!state.imowner};
      case 'ADD_ROLE':
          let newrolle = {
          id : String(state.roles.length+1),
          name : "", genre : "", 
          description : "", storyteller : false};
        return {...state,roles:[...state.roles,newrolle]};
      case "REMOVE_ROLE":
        return ({...state,roles:state.roles.filter(r=>r.id!==action.payload)});
      case "SET_ROLE":   
      let newroles = state.roles;
      newroles[action.payload.index] = action.payload;
      return {...state,roles:newroles};
      case "SET_PREVIOUSWITZ":
          return {...state,previouswitzid:action.payload};
      default:
        throw new Error();
    }
  }


 useEffect(()=>
 {
    if(window.location.href.indexOf("new") > 0)
    {
   
    }else
    {
           addAction("witz.single",props.match.params.witzId,(data)=>
           {
            setWitztext(RichTextEditor.createValueFromString(data.content.story,"html"));
            dispatch({type: 'SET_EDITWITZ',payload:data.content});            
           });
    }
  },[props.match.params.witzId,addAction]);

  function onChangeTitle(e)
  {     
      if(e.target.value.length > 80)
      {
         return;
      }
      dispatch({type: 'SET_TITLE',payload:e.target.value});    
 }
 function handleStoryChange(text)
  {
    setWitztext(text);
  }

function finaledit()
{

  let story = witztext.toString('html')  
  var jsondata = witz;
  jsondata.story = story;
  if(props.match.params.witzId)
  { 	
    addAction("witz.update",jsondata,function(data)
  {
              if(data.state==="OK")
                      {
                            props.history.push('/witze/' + props.match.params.witzId);                            
                      }else
                      {                               
                        swal("Oops...", "Fehler beim Speichern des Witz.", "error");     
                      }
  }); 
  }else
  {   
    addAction("witz.new",jsondata,function(data)
     {
         if(data.state==="OK")
         {                
           props.history.push('/witze/' + data.content.id);                
         }
     });
  }
}

 function saveWitz()
  {
    if(witz.imowner)
    {    
        if(witz.roles.length===0)
        {
         
          swal({
            title: "Sie haben keine Charaktere  definiert",
            text: "Mit der Angabe von Charaktere helfen Sie den Kopflos Mitgliedern den passenden Text zu finden.",
            icon: "warning",
            buttons: ["Ich füge Charaktere hinzu", "Trotzdem speichern!"],
            })
          .then((willDelete) => {
            if (willDelete) {
              finaledit();
             } else {
              swal("Gute Entscheidung, klicken Sie auf 'Charakter hinzufügen."); 
            }
          });
      
        }else
        {
          finaledit();
        }
      }else
      {
        swal("Oops...", "Du musst Urheber des Textes sein. Andernfalls ist eine Veröffentlichung leider nicht möglich.", "error");    
      }
  }


        return (
          <EditFantasieContext.Provider value={{witz,dispatch}}>
            <div id="newfantasiepage">
            <table className="tblEditFantasie">
            <tbody>
            <tr><td><h4>Titel <input maxLength="100" id="editfantasietitleinput" onChange={onChangeTitle}  className="FantasieTitle" type="text"  value={witz.title} /></h4></td></tr>
            <tr><td>
            <div>
            <Editor value={witztext} onChange={handleStoryChange} />
             </div>
            </td></tr>
            </tbody>
            </table><br/>
            <RollenListe roles={witz.roles} /><br/>
            <PreviousFantasie previouswitzId={witz.previouswitzId}/><br/><br/>
            <h4>Tags</h4>
            <SeleSelectTagFantasieEdit selectedtags={witz.tags} />
            <br/>       
          <label title="Kommentare von registrierten Mitgliedern erlauben." className="control control--checkbox">Kommentare von registrierten Mitgliedern erlauben.
          <input type="checkbox" onChange={()=>dispatch({type: 'TOGGLE_ALLOWCOMMENTS'})}   checked={witz.allowcomments} />
          <div className="control__indicator">
           </div>
           </label>



       <label title="Dieser Witz solll öffentlich sichtbar sein." className="control control--checkbox">Dieser Witz solll öffentlich sichtbar sein.
       <input type="checkbox" onChange={()=>dispatch({type: 'TOGGLE_PUBLIC'})} checked={witz.public} />
       <div className="control__indicator">
       </div>
       </label>
       <label title="Ich bin Urheber des Textes" className="control control--checkbox">Ich bin Urheber des Textes und besitze die Rechte an Veröffentlichung, Verbreitung oder Vervielfältigung.
       <input type="checkbox" onChange={()=>dispatch({type: 'TOGGLE_IMOWNER'})}  checked={witz.publishright} />
       <div className="control__indicator">
       </div>
       </label>



            <br/> <br/>   <br/>
            <Kfbutton action={saveWitz} text="Speichern"/> 
           </div>
           </EditFantasieContext.Provider>
            
    );

    
  }


export default EditFantasie;



