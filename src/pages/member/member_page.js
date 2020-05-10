import React,{memo,useEffect,useContext} from 'react';
import MemberBox from '../../components/MemberBox';
import {MemberContext} from '../../provider/MemberContext';
import {MemberFilterContext} from '../../provider/MemberFilterContext';
import {Helmet} from 'react-helmet';

function MemberPage(props){

const {members,fetchMembers} = useContext(MemberContext)
const {filter,searchtext} = useContext(MemberFilterContext);


useEffect(()=>
{
 fetchMembers();
},[]);

  function onChangeSearch(e)
  {
    searchtext(e.target.value);
  }
  console.log(members);
  let seotitle = (members.length ===0) ? " Mitglieder" : members.length + " Mitglieder" ;
      return (
              <div id="member_page">
               <div id="searchbox">
       <input id="searchboxinput" key="searchiinput"  placeholder="Nach Mitglied suchen.." type="text" onChange={onChangeSearch} value={filter.searchtext} />

       </div>
              <div id="memberboxespage">
               
              <MemberBox data={members} />
              </div>
              <Helmet>
               <title>{seotitle}</title>
                <meta property="og:description" content="Unsere Mitglieder freuen sich auf dich."/>
            </Helmet>
              </div>
      );   
  }

  MemberPage.whyDidYouRender = true;
export default memo(MemberPage);




