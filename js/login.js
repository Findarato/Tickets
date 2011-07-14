/*
 * Login script.  Will do the ajax and any other random stuff that needs to happen only for the login screen
 * 
 */


jQuery(document).ready(function () {


	$("#yesLink").live("click",function(){
		alert("yes");
		$.getJSON("",function(json){
			
		});
	});
	
	$("#noLink").live("click",function(){window.close();});

});