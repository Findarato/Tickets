/*
 * Login script.  Will do the ajax and any other random stuff that needs to happen only for the login screen
 * 
 */

jQuery(document).ready(function () {
	$("#yesLink").live("click",function(){
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"1"},function(data){
			window.opener.window.login(data);
			if(data.error==""){
				window.close();	
			}else{
				alert("Please email the following to automation: "+JSON.stringify(data));
			}
			
		});
	});
	
	$("#newUser").live("click",function(){
		$.getJSON("/ajax/login.php",{"openId":"1","userId":"2"},function(data){
			window.opener.window.login(data);
			window.close();
		});
	});
	$("#noLink").live("click",function(){window.close();});

});