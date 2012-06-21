/*
 * Login script.  Will do the ajax and any other random stuff that needs to happen only for the login screen
 * 
 */
jQuery(document).ready(function () {
	$("#yesLink").live("click",function(){
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"1"},function(data){
			if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
				$.getJSON("/ajax/login.php",{"userIdFetch":1},function(data){
					localStorage.setItem("userId",data.user_id);
					window.location = "/#ticketList/all_tickets";
				});	
			}
			if(data.error.length > 1) alert("Please email the following to automation: "+data.error);
		});
	});
	$("#noLink").live("click",function(){
	  window.location = "/";
	});
	$("#newUser").live("click",function(){ // Lets create a new user account
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"2"},function(data){
			if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
				$.getJSON("/ajax/login.php",{"userIdFetch":1},function(data){
					localStorage.setItem("userId",data.user_id);
					window.location = "/#ticketList/all_tickets";
				});	
			}
		});
	});
	$("#noLink").live("click",function(){window.close();});
});

function login(id){ //We need a json array, probably need to parse it, who knows
  $.getJSON("/ajax/get_userinfo.php",{"userId":id},function(data){
    if (data.error.length > 0) {
      alert(data.error);
    } else {
      sessionStorage.LastLogon = data.lastlogon;
      $("#topperUserInfo")
        .html(data.firstname + " " + data.lastname ).attr("href","#");
      
      if($("#headerAvatar").html() != null){
        $("#headerAvatar").css("background-color","#F00").attr("src","http://www.gravatar.com/avatar/"+sessionStorage.mdEmail+"?s=24&d=identicon&r=g"); 
      }else{
        $("#topperUserInfo").append(
          $("<img/>").attr("src","http://www.gravatar.com/avatar/"+sessionStorage.mdEmail+"?s=24&d=identicon&r=g")
        ) 
      }
      $("#newTicketUser_id").val(sessionStorage.userId);
      if (data.departmentname === "" || data.departmentname == "None!") {
        window.location.hash = "#userPage/"+data.userid;
      }else{
        if(sessionStorage.currentTicket >0){
          window.location.hash = "#ticket/"+sessionStorage.currentTicket;
          
        }else{
          window.location.hash ="#ticketList/all_tickets";
        }
      }
      //alert(data.features);
      sessionStorage.setItem("features",JSON.stringify(data.features));
  
      //alert(localStorage.mdEmail);
      if(sessionStorage.currentTicket >0){
        window.document.location = "/#ticket/"+sessionStorage.currentTicket
      }else{
        window.document.location="/"; 
      }
    }
  });
  if(sessionStorage.userId > 100){
    window.location.hash ="#ticketList/all_tickets"; 
  }    
}