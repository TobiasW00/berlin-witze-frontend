import React, {useState,memo} from 'react';
export const InboxContext = React.createContext([]);

function InboxContextWrapper(props) 
{
const [inbox, setInbox] = useState([]);
return(
<InboxContext.Provider value={{inbox,setInbox}}>
    {props.children}
</InboxContext.Provider>
);
}

export default InboxContextWrapper;