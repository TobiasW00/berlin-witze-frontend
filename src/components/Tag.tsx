import React,{memo} from 'react';
import Tag from '../types/tag';

const TagComponent = (tag:Tag) =>
{
function  handleTagClick()
  {     
      if(tag.selected)
      {
        tag.removeTag(tag.id);
      }else
      {
        tag.addTag(tag.id);        
      }
  }

  
if(tag.selected)
      {
      return (                
              <span title={tag.description} onClick={handleTagClick} className="tagbutton tagbuttonselected">{tag.name}</span>            
             );
      }else
      {
    return (           
            <span title={tag.description} onClick={handleTagClick} className="tagbutton">{tag.name}</span>            
          ); 
      }  
}
export default (TagComponent);



