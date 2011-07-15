/*
 * Login script.  Will do the ajax and any other random stuff that needs to happen only for the login screen
 * 
 */


jQuery(document).ready(function () {


	$("#yesLink").live("click",function(){
		//alert("yes");
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"1"},function(json){
			window.opener.window.login(json);
			//window.opener.window.setHash("#ticketList/all_tickets");
			//window.opener.window.checkHash();
			window.close();
		});
	});
	
	$("#noLink").live("click",function(){window.close();});

});