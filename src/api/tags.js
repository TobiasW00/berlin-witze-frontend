import {tagsState} from '../recoilstate';

function loadTags()
{
    addAction("tag.loadalltags",null,function(data)
    {
      dispatch({type:SET_TAGS, payload:data});   
    });
}

