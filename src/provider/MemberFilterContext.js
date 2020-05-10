import React, {useState,memo} from 'react';
export const MemberFilterContext = React.createContext({searchtext:"",genre:0});

function MemberFilterContextWrapper(props) 
{
const [filter, setFilter] = useState({searchtext:""});


function searchtext(text) {
        setFilter({...filter,searchtext:text}); 
}

return(
<MemberFilterContext.Provider value={{filter,searchtext}}>
    {props.children}
</MemberFilterContext.Provider>
);
}

export default memo(MemberFilterContextWrapper);