var style = document.createElement('style');
style.innerHTML = `
.disclaimerbox
{
    position: fixed;
    background: black;
    color:white;
    bottom: 35px;
    width: 100%;
    text-align: center;
    z-index: 100;
}
.disclaimerbox button
{
  background:green;
}
`;
document.head.appendChild(style);



if(localStorage.getItem("disclaimer") !== "true")
{
  console.log("show disclamer");
  var disclamerbox = document.createElement("div"); 
  disclamerbox.className = "disclaimerbox";
  var newContent = document.createTextNode("Diese Seite verwendet Cookies. Einige von ihnen sind essenziell, waehrend andere uns helfen, diese Website und Ihre Nutzung zu verbessern. "); 
 let bt = document.createElement("button");
 bt.innerText ="Ich akzeptiere";
 bt.onclick= ()=>{setupGoogle();document.body.removeChild(disclamerbox)}

 disclamerbox.appendChild(newContent); 
 disclamerbox.appendChild(bt);
 document.body.append(disclamerbox); 
console.log("show disclamer");
}else
{
  console.log("allow analytics");
  setupGoogle();
}

function setupGoogle()
{
  localStorage.setItem("disclaimer","true");

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W247GTP');

}



