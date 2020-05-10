import React, {useState,useCallback} from 'react';
const initState = {selectedtags:[],searchtext:""};
const FantasieFilterContext = React.createContext(initState);
const FantasieFilterDispatchContext = React.createContext();

export function useWitzeFilterState() {
        const context = React.useContext(FantasieFilterContext)
        if (context === undefined) {
      throw new Error('useFantasieFilterState must be used within a FantasieFilterContextWrapper')
    }
    return context
  }

  export function useWitzeFilterDispatch() {
    const context = React.useContext(FantasieFilterDispatchContext)

    if (context === undefined) {
      throw new Error('useWitzeFilterDispatch must be used within a FantasieFilterContextWrapper')
    }
    return context
  }


function modcontext(filter,setFilter)
{
   
    function selectTag(TagID) {
        var newfilter = Object.assign({}, filter);
        const newtaglist = [...filter.selectedtags];
        newtaglist.push(TagID);
        newfilter.selectedtags = newtaglist;
        setFilter(newfilter);
    }
    function removeTag(TagID) {
            var newfilter = Object.assign({}, filter);
            newfilter.selectedtags = filter.selectedtags.filter(e => e !== TagID);
            setFilter(newfilter);          
    }

    function searchtext(text) {
            setFilter({...filter,searchtext:text}); 
    }
    function dommale() {
        setFilter({...filter,dommale:!filter.dommale}); 
    }
    function domfemale() {
        setFilter({...filter,domfemale: !filter.domfemale}); 
    }
return {domfemale,dommale,searchtext,removeTag,selectTag};

}





function WitzeFilterContextWrapper(props) 
{

const [filter, setFilter] = useState(initState);
const modder = useCallback(modcontext(filter,setFilter),[filter]);
return(
<FantasieFilterContext.Provider value={filter}>
    <FantasieFilterDispatchContext.Provider value={modder}  >
       {props.children}
    </FantasieFilterDispatchContext.Provider>
</FantasieFilterContext.Provider>
);
}

export default WitzeFilterContextWrapper;