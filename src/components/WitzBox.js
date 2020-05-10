import Witz from './Witz';import React,{memo} from 'react';
import NoResultFound from './SorryNoResult';
function witzbox(props) {
 
    if(props.data.length===0)
    return(<NoResultFound/>);

        var result=props.data.map(function(fan,i) {                 
        return(<Witz roles={fan.roles} title={fan.title} views={fan.views}  modified={fan.modified} likecount={fan.likecount} timetoread={fan.timetoread} id={fan.id} key={fan.id} story={fan.story} />);
			});   
    return (
            <div id="witzboxencontainer">
		            {result}  			
            </div>
    );
}


export default memo(witzbox)



