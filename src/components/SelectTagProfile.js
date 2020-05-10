import React,{useContext} from 'react';
import {TagsContext} from '../provider/TagsContext';
import Tag from './Tag';



function SelectTagProfile(props) {
  
const tags = useContext(TagsContext);
 


  function UpdateVal(tagids)
  {
    props.updateValue(tagids);
  }

  function removetag(tagid)
  {
    var newtags = props.selectedtags.replace(tagid+";","");
    UpdateVal(newtags);
  }
  function addtag(tagid)
  {
    var newtags = props.selectedtags + tagid +";";
    UpdateVal(newtags);
  }


   
    if(!tags)
        return(<div>Lade Tags...</div>);

        var TagList = [];
        for(var i=0;i<tags.length;i++)
        {
            var tag = tags[i];    
            if(props.selectedtags.indexOf(tag.id) >= 0)
            {           
                TagList.push(<Tag removeTag={removetag} addTag={addtag} selected={true} key={tag.id} id={tag.id} name={tag.name} description={tag.description} />);
            }else
            {
                if(!props.displayonly)
                {
                TagList.push(<Tag removeTag={removetag} addTag={addtag} selected={false} key={tag.id} id={tag.id} name={tag.name} description={tag.description} />);
                }
              }
        }       
 
    return (
            <div>
            {TagList}  
            </div>
    );
  }


export default SelectTagProfile;





