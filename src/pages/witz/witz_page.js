import React,{useEffect,useContext} from 'react';
import SelectTag from '../../components/SelectTag';
import Witzbox from '../../components/WitzBox';
import Kopflosloadloader from '../../components/Kopflosloader';
import '../../components/inputsearchbox.css';
import '../../components/checkboxen.css';
import {WitzeContext} from '../../provider/WitzeContext';
import {useWitzeFilterState,useWitzeFilterDispatch} from '../../provider/WitzeFilterContext';
import {Helmet} from "react-helmet";
import {TagsContext} from '../../provider/TagsContext';
import { useHistory } from 'react-router-dom';


function WitzPage(props)
{
    const tags = useContext(TagsContext);
    const {selectTag,searchtext} = useWitzeFilterDispatch(); //useContext(FantasieFilterContext);
    const {witze,isLoading,fetchWitze} = useContext(WitzeContext)
  const filter = useWitzeFilterState();
    const history = useHistory();
    const { tag } = props.match.params;
useEffect(
  ()=>
  {
    if(witze.length < 2 && !isLoading)
    fetchWitze(); 
  }
,[]);

useEffect(
  ()=>
  {
    if(tags.length > 0)
    {
    const tagfilter = tags.find(f=> f.name === tag)
    if(tagfilter)
    {
      selectTag(tagfilter.id);
    }
  }
  }
,[tags]);


 function onChangeSearch(e) {
  searchtext(e.target.value);
}

let seotitle = (witze.length ===0) ? "" : witze.length + " Witze" ;
return(
         <div id="fantasiepage">
       <div id="searchbox">
       <input id="searchboxinput" key="searchiinput" placeholder="Witz suchen.." type="text" onChange={onChangeSearch} value={filter.searchtext} />

  
<SelectTag selectedtags={filter.selectedtags}/> 
</div>
{(isLoading) ? <div><Kopflosloadloader /></div> : <Witzbox data={witze} />}
            <Helmet>
               <title>{seotitle}</title>
                <meta property="og:description" content="Sammlung von Witzen über Berlin."/>
            </Helmet>
  </div>
  );
}


WitzPage.whyDidYouRender = true;
export default (WitzPage)
