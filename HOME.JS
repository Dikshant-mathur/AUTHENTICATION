var logout=document.createElement("button");
logout.innerHTML="Logout";
document.body.appendChild(logout);

logout.onclick=function()
{
  var request=new XMLHttpRequest;
  request.open("GET","/logout");
  request.send();
  request.addEventListener("load",function()
  {
    if(request.responseText ==='logout success'){
      window.location.href = '/'
    }else{
      window.alert('logout failed')
    }
  })
}
