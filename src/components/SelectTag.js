import React,{useContext} from 'react';
import Tag from './Tag';
import ITag from '../types/tag';
//import {fetchTags} from '../actions/tag';
import {tagsState} from '../recoilstate';
import {useWitzeFilterDispatch} from '../provider/WitzeFilterContext';
import {TagsContext} from '../provider/TagsContext';
import { useDispatch,useSelector } from "react-redux";
import {WebsocketContext} from '../provider/WebsocketContext';
import {tagsQuery} from '../recoilstate';
import {  useRecoilState,useRecoilValue,atom} from 'recoil';

function SelectTag (props) {  
 // const tags = useSelector(state => state.tags)//useContext(TagsContext);
 //const [tags, setTags] = useRecoilState(tagsState);

 const tags = useRecoilValue(tagsQuery);

  //const dispatch = useDispatch();
  const {selectTag,removeTag} = useWitzeFilterDispatch(); // useContext(FantasieFilterContext);
  //dispatch(fetchTags);

 

  function removeTagClick(tagid)
  {
    removeTag(tagid);
  }
  function addTagClick(tagid)
  {
    selectTag(tagid);
  }
   console.log(tags); 
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
