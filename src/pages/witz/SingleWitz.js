import React, {useEffect,memo,useContext} from 'react';
import moment from 'moment';
import 'moment/locale/de';
import { Link } from 'react-router-dom'
import DisplayRoles from '../../components/DisplayRoles';
import Like from '../../components/Like';
import swal from 'sweetalert';
import CommentBox from '../../components/CommentBox';
import {Helmet} from "react-helmet";
import Kopflosloadloader from '../../components/Kopflosloader';
import {TagsContext} from '../../provider/TagsContext';
import { UserContext } from '../../provider/UserContext';
import { MemberContext } from '../../provider/MemberContext';
import { WitzeContext } from '../../provider/WitzeContext';
import {WebsocketContext} from '../../provider/WebsocketContext';
function Singlewitz (props) {
  const {user} = useContext(UserContext);
  const {members,fetchMember} = useContext(MemberContext);
  const {fetchWitz,witze,addLike,viewWitz} = useContext(WitzeContext);
  const {addAction} = useContext(WebsocketContext);
  const tags = useContext(TagsContext);
  const { witzId } = props.match.params;
  const witz = witze.find(f=>f.id===witzId);


  useEffect(()=>
  {
    window.scrollTo(0, 0);
  },[witzId]);


  useEffect(()=>
  {
    if(witz)
    {
      if(user.name !=="Login")
      {        
        let witzmemberresult = members.find(f=>f.id===witz.ownerid);
        if(witzmemberresult ===undefined)
              fetchMember(witz.ownerid);
      }
    }
  },[witz]);

  useEffect(() => {


     if(!witz)
     {
      fetchWitz(witzId);
    }else
    {
     viewWitz(witzId); 
    }
    },[witzId,user]);




  function twitterpopup()
  {
      let twitterlink = "https://twitter.com/intent/tweet?text=" + witz.title + "&url=https://berlin-witze.de/witze/" + witz.id; 
      window.open(twitterlink,'name','width=600,height=400');
  }
  
  function facebookpopup()
  {
    let facebookurl = "http://www.facebook.com/sharer/sharer.php?u=https://berlin-witze.de/witze/" + witz.id;   
     window.open(facebookurl,'name','width=600,height=400');
  }
  
  
  function deleteWitz()
    {
      addAction("witz.delete",witzId,function(data)
        {
            if(data.state ==="OK")
            {
               props.history.push('/witze');    
            }
        });
        
    }
    function plsdontdelete()
    {
      swal({
        title: "Witz löschen?",
        text: "Möchtest du diesen Text wirklich entfernen? Er kann nicht wiederhergestellt werden.",
        icon: "warning",
        buttons: ["Zurück zum Witz", "Löschen"],
        })
      .then((willDelete) => {
        if (willDelete) {
          deleteWitz();
         } else {
          swal("Gute Entscheidung!"); 
        }
      });
    }

    function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}


function editWitz()
    {      
         props.history.push('/editwitz/'+ witz.id);  
    }
	
    function showOwner()
    {   
        props.history.push('/member/'+ witz.ownerid);  
    }

    function prevwitz()
    { 
          if(witz.previouswitzid.trim() !=="")
                  {     
                    let prevwitzobj = witze.find(f=>f.id === witz.previouswitzid);
                   if(prevwitzobj)
                   {
                    return <div><span className="singfantext">Fortsetzung von: </span><Link alt="Fortsetzung anzeigen" to={'/witz/' + witz.previouswitzid} dangerouslySetInnerHTML={{__html: prevwitzobj.title}}></Link></div>
                   }
                  }
    }
    function getAllowComments()
    {
          if((witz.allowcomments) && (user.isuseronline) )
                  {    
                  
                    return <CommentBox comment={witz.comment} witzid={witz.id} />
                  }       
    }
    
    function getTagsText()
    {    
          if(witz.tags !=="")
                  {     
                    let text ='';
                    for(let i=0;witz.tags.split(";").length > i;i++)
                    {
                      let tagid = witz.tags.split(";")[i];
                      if(tagid.length > 0)
                      {
                         let tagname = tags.find(f=>f.id ===tagid);
                        if (tagname !==undefined)
                        text += tagname.name + "; "
                      }
                  }
                     return <div><span className="singfantext">Tags: </span>{text}</div>
                  }       
    }
             
    function getNextwitz()
    {     
                    let nextwitzobj = witze.find(f=>f.previouswitzid === witz.id);
                    if(nextwitzobj)
                    {  
                    return <div><span>Fortsetzung: </span><Link to={'/witz/' + nextwitzobj.id}   dangerouslySetInnerHTML={{__html: nextwitzobj.title}}></Link></div>
                     }
    }
           
     
    function editanddeletebutton()
    {
          if(user.id===witz.ownerid)
          {
                 return (<div><span className="button" onClick={editWitz}>    
                 <span><img alt="Bearbeiten" src="/pics/edit.png"/>Bearbeiten</span>
                </span>
             <span className="button" onClick={plsdontdelete}>    
                 <span><img alt="Löschen" src="/pics/delete.png"/>Löschen</span>
                </span></div>);
          }  
    }          
    




    if(!witz)
 return(<Kopflosloadloader/>);

 let witzmemberresult = members.find(f=>f.id===witz.ownerid);
 let witzmember = (witzmemberresult===undefined) ? {name:"Login"}: witzmemberresult;

      var createddate = moment(witz.created).locale("de").format("l");
      var modifieddate = moment(witz.modified).locale("de").startOf('day').fromNow(); 
    



 const title = witz.title; //"- von " + author;
 const url = "/witze/" + witz.id + "/" + witz.title.replace(" ","-");
 const trimcontent = strip(witz.story).substring(0, 100);
    return (
            <div id="singlewitzbody"> 
                    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title> 
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={trimcontent}/>
      <meta property="og:type" content="article"/>
      <meta property="og:url" content={url}/>
      <meta property="og:image" content="/pics/Startseite.jpg"/>
      </Helmet>

            <article id="leftsinglewitz">
           <table id="singlewitztbl">
           <tbody>
           <tr>
           <td><h2 dangerouslySetInnerHTML={{__html: witz.title}}></h2>Rollen: (<DisplayRoles roles={witz.roles} />) <br/>{prevwitz()}{getTagsText()}</td>
           </tr>
            <tr>
            <td className="singlewitzcontendtd"><br/><span dangerouslySetInnerHTML={{__html: witz.story}}></span><div><br/><i>Erstellt von <span className="singlewitzownerlink" onClick={showOwner}>{witzmember.name}</span>  am {createddate}, letztes Update {modifieddate} und {witz.views} Personen haben diesen Text betrachtet. {getNextwitz()}</i></div></td>
            </tr>
           </tbody>
           </table>
             </article>
<br/>
   
            <div className="singewitzfooter">
                    <Like addlike={addLike} likecount={witz.likecount} witzid={witz.id} />
                     </div><br/><br/><br/>
                     {editanddeletebutton()}
    <div>
    {getAllowComments()}
    </div>
    <div id="socialboxfooter">
                  <div className="twitterbutton" onClick={twitterpopup} >
                  <img alt="Teilen" src="/pics/tweet.png"/></div>
                   <div  className="twitterbutton"  onClick={facebookpopup}><img alt="Facebook teilen" src="/pics/facebook.png"/></div>
    </div>
  </div>
    );
}
Singlewitz.whyDidYouRender = true;
export default memo(Singlewitz);