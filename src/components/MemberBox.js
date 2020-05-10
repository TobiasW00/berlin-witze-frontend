import React,{useContext} from 'react';
import Member  from './Member';
import {MemberFilterContext} from '../provider/MemberFilterContext';

function MemberBox(props) {

 const {filter} = useContext(MemberFilterContext);

    var Members = [];
    for(var i=0;i< props.data.length;i++)
    {
      var currentmember = props.data[i];

      if(JSON.stringify(currentmember).toLowerCase().indexOf(filter.searchtext.toLowerCase()) > -1)
      {
      Members.push(<Member member={currentmember} key={currentmember.id} />);
      }
    }   

    return (
      <React.Fragment>
                   {Members}      
                   </React.Fragment>      
    );
  }



export default MemberBox;


