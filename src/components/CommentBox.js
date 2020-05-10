
import React,{useState,memo,useContext} from 'react'
import Kfbutton from './Kfbutton'
import { useHistory } from 'react-router-dom';
import { WebsocketContext } from '../provider/WebsocketContext';
function CommentBox(props) {

  const [commenttext, setComment] = useState("");
  const {addAction} = useContext(WebsocketContext);
  const history = useHistory();
  function sendComment()
  {
      var self = this;
      addAction("comment.new",props.witzid,commenttext,function(data)
      {
          history.push('/witze/');   
      });
  }
  
  function onChangeComment(e) {   
       setComment(e.target.value);
  }
  

         var Comments = props.comment.map(function(comment,i) {               
                   return(<div key={comment.id}><strong>{comment.username}</strong><br/>{comment.comment}</div>);
  
    });   
    return (
            <div>
           <h3>Kommentare</h3>
      {Comments}
     <textarea onChange={onChangeComment}  className="tbladdcomment" value={commenttext}/><br/><br/>
    <Kfbutton action={sendComment} text="Kommentar speichern"/> 
    <br/><br/>
            </div>
    );
  
}
export default CommentBox;



