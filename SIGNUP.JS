var login=document.getElementById("login");
var signUp=document.getElementById("signUp");
var userName=document.getElementById("userName");
var password=document.getElementById("password");

signUp.onclick=signupFunction;

function signupFunction()
{
  if(userName.value && password.value)
  {
    var data={ 
      userName : userName.value,
      password :password.value
    }

    var request=new XMLHttpRequest();
    request.open("POST",'/saveData');
    request.setRequestHeader("Content-type","application/json");
    request.send(JSON.stringify(data));
    
    request.addEventListener("load",function()
    {
      if(request.status=200)
      {
         if(request.responseText==='User already exists')
            window.alert('User already exists');
         else
         {
            window.alert('You are registered!');
            window.location.href='/';
         }
         console.log(request.responseText);
      }
      else
       window.alert('Signup failed');
    })

    
  }
}

login.onclick=function()
{
  window.location="/";
}
