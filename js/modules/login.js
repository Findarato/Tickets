/*
 * Login script.  Will do the ajax and any other random stuff that needs to happen only for the login screen
 * 
 */

jQuery(document).ready(function () {
	$("#yesLink").live("click",function(){
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"1"},function(data){
			// Userid
			if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
				$.getJSON("ajax/login.php",{"userIdFetch":1},function(data){
					localStorage.setItem("userId",data.user_id);
					//window.location = "/#ticketList/all_tickets";
				});	
			}
			if(data.error==""){
				window.close();	
			}else{
				alert("Please email the following to automation: "+data.error);
			}
			
		});
	});
	
	$("#newUser").live("click",function(){
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"2"},function(data){
			// Userid
			if(!localStorage.userId || localStorage.userId == 0 || typeof localStorage.userId=="undefined" || typeof localStorage.userId=="string"){// something broke lets take care of it
				$.getJSON("ajax/login.php",{"userIdFetch":1},function(data){
					localStorage.setItem("userId",data.user_id);
					//window.location = "/#ticketList/all_tickets";
				});	
			}
			window.close();
		});
	});
	$("#noLink").live("click",function(){window.close();});

});