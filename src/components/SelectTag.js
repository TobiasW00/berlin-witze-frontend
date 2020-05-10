import React,{useContext,memo} from 'react';
import Tag from './Tag';
import ITag from '../types/tag';
import {useWitzeFilterDispatch} from '../provider/WitzeFilterContext';
import {TagsContext} from '../provider/TagsContext';

/*
type selectedCardProps = {
  selectedtags: string
}
*/

function SelectTag (props) {  
  const tags = useContext(TagsContext);
  const {selectTag,removeTag} = useWitzeFilterDispatch(); // useContext(FantasieFilterContext);

  function removeTagClick(tagid)
  {
    removeTag(tagid);
  }
  function addTagClick(tagid)
  {
    selectTag(tagid);
  }
    
const tagscomponent = tags.map((tag)=>
{  
  return (<Tag removeTag={removeTagClick} addTag={addTagClick} selected={(props.selectedtags.includes(tag.id))} key={tag.id} id={tag.id} name={tag.name} description={tag.description} />);
});

    return (
            <div>
            {tagscomponent}
            </div>
    );

}

export default (SelectTag);
