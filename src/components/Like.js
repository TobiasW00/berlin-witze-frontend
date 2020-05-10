import React,{memo,useContext} from 'react'
import sweetAlert from 'sweetalert'
import { WebsocketContext } from '../provider/WebsocketContext';
function Like(props) {

const {addAction} = useContext(WebsocketContext);

function handleAddLike(){
  addAction("fantasie.addlike",props.witzid,function(data)
        {
            if(data.state ==="OK")
            {     
               props.addlike(props.witzid);            
            }else
            {
                sweetAlert("Oops...", data.content, "error");    
            }
          
        });
		
    }
	

      var counttest = props.likecount + " Mitglieder spricht der Text an";
    return (
            <div className="likebutton" onClick={handleAddLike} title={counttest}>    
              <img alt="Like geben" src="/pics/like.png" /><span className="liketext">({props.likecount})</span>
            </div>
    );
}
export default memo(Like);