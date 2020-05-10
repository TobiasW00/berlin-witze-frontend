import React,{useContext} from 'react';
import Tag from './Tag';
import {TagsContext} from '../provider/TagsContext';
import {EditFantasieContext} from '../pages/witz/EditWitz';
function SeleSelectTagWitzEdit(props) {
  const tags = useContext(TagsContext);
  const {dispatch} = useContext(EditFantasieContext);
  const selectedtags = props.selectedtags;

    if(!tags)
        return(<div>Lade Tags...</div>);

        var TagList = [];
        for(var i=0;i<tags.length;i++)
        {
            var tag = tags[i];    
            if(selectedtags.indexOf(tag.id) >= 0)
            {           
                TagList.push(<Tag removeTag={(tagid)=>dispatch({type: 'REMOVE_TAG',payload:tagid})}  addTag={(tagid)=>dispatch({type: 'ADD_TAG',payload:tagid})} selected={true} key={tag.id} id={tag.id} name={tag.name} description={tag.description} />);
            }else
            {
                TagList.push(<Tag removeTag={(tagid)=>dispatch({type: 'REMOVE_TAG',payload:tagid})}  addTag={(tagid)=>dispatch({type: 'ADD_TAG',payload:tagid})} selected={false} key={tag.id} id={tag.id} name={tag.name} description={tag.description} />);
            }
        }       
 
    return (
            <div>
            {TagList}  
            </div>
    );
  }

export default SeleSelectTagWitzEdit;





