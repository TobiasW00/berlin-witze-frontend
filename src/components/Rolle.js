import React,{useContext} from 'react';
import {EditFantasieContext} from '../pages/witz/EditWitz';



function Rolle(props){
    const {dispatch} = useContext(EditFantasieContext);
   const rolle = props.rolle;
   rolle.index = props.index;
  
function deleterole()
{
    dispatch({type:"REMOVE_ROLE",payload:rolle.id});
}
function onChangeName(e)
{
  const val = e.target.value;
 dispatch({type:"SET_ROLE",payload:{...rolle, 'name': val}});
}

const changeGenre = (e) =>
{
  const val = e.target.value;
  dispatch({type:"SET_ROLE",payload:{...rolle, genre: val}});
 // setRolle(prefstate => {return ({...prefstate, 'genre': val})});
}
function changeVerhalten(e)
{
  const val = e.target.value;
  dispatch({type:"SET_ROLE",payload:{...rolle, verhalten: val}});
  //setRolle(prefstate => {return ({...prefstate, 'verhalten': val})});
    
}

function onChangeRoledescription(e)
{
   
  const val = e.target.value;
  dispatch({type:"SET_ROLE",payload:{...rolle, description: val}});
  //setRolle(prefstate => {return ({...prefstate, 'description': val})});
}
function onChangeStoryteller(e)
{
  dispatch({type:"SET_ROLE",payload:{...rolle, storyteller : !rolle.storyteller}});
 // setRolle(prefstate => {return ({...prefstate, 'storyteller': val})});
}

    return (
            <div className="rolle">
            <table className="tblrolle">
            <tbody>
            <tr>
            <td>Name <br/><input maxLength="25" onChange={onChangeName}  type="text"  value={rolle.name} /></td>
      
            <td> Geschlecht <br/>
            <select name="genre" onChange={changeGenre} value={rolle.genre} size="1">
                <option>Mann</option>
                <option>Frau</option>
                <option>Transvestit</option>
                </select></td>           
<td>
                Erzähler
                <br/>
                <input type="checkbox" onChange={onChangeStoryteller} checked={rolle.storyteller} />
                </td>
         
         
         
    <td> Beschreibung <input className="inputroledescription" onChange={onChangeRoledescription}  type="text"  value={rolle.description} />
    </td><td>  <br/>
    <span className="kfbutton btremoverole"  onClick={deleterole}>    
            <span>Löschen</span>
            </span></td>
                </tr>
            </tbody>
            </table>
         </div>
    );
}
export default Rolle;