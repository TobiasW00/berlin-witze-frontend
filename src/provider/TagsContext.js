import React, {useEffect,useState,useContext,memo} from 'react';
import {WebsocketContext} from './WebsocketContext';
export const TagsContext = React.createContext([]);

function TagsContextWrapper(props) 
{
const [tags, setTags] = useState([]);
const {addAction} = useContext(WebsocketContext);

useEffect(() => {
    addAction("tag.loadalltags",null,function gettagdata(data)
    {
        setTags(data.content); 
    }
    );   
   },[]);

return(
<TagsContext.Provider value={tags}>
    {props.children}
</TagsContext.Provider>
);
}

export default memo(TagsContextWrapper);