import React,{useState,useEffect,useRef,memo,useContext} from 'react';
import EditMyProfile from './EditUserProfile';
import {UserContext} from '../../provider/UserContext';
import swal from 'sweetalert';


function Profilewrapper(props)
{

const {user,setUser,removeuser} = useContext(UserContext);


if(user.name ==="Login")
props.history.push("/login");


  function finalremove()
  {    
    removeuser(function(data){
      
          if(data.state==="OK")
          {
              localStorage.removeItem("username");
              swal("Gelöscht!", "Ihr Profil wurde vollständig gelöscht.", "success"); 
          }else
          {
              swal("Oops...", "Profil konnte nicht gelöscht werden. Bitte an den Support wenden. Sorry.", "error");
          }
          
      });
  }

  function deleteProfil()
  {
    swal({
      title: "Sicher?",
      text: "Wollen Sie wirklich das Profil inkl. Witze, Likes vollständig löschen? Eine Wiederherstellung ist nicht möglich!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        finalremove();
       } else {
        swal("Vielen Dank, weiterhin viel Spaß hier. Feedback nehmen wir sehr gerne entgegen."); 
      }
    });




    swal({   title: "Sicher?",   text: "Wollen Sie wirklich das Profil inkl. Witze, Likes vollständig löschen? Eine Wiederherstellung nicht möglich!",  
        type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Ja, alle Daten löschen!",   closeOnConfirm: false }, 
    function(){ 


    });
  }

  return (<React.Fragment>
      {(user.name==="Login") ? null : <EditMyProfile value={{user,setUser,deleteProfil}} /> }
     </React.Fragment>)

}

  export default Profilewrapper;