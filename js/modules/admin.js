var adminLoaded = true;
var newUserTpl = 
	$("<div/>",{"class":"ticketBox insideBorder roundAll4 border-all-Main-1 newTicketTpl"})
		.html(
			$("<div/>",{id:"userDisplay","class":"ticketItem"})
				.append( // User Icon Box
					$("<div/>",{"class":"ticketUserIconBox colorMain-2 border-all-B-1 roundAll4",id:"userPic"})
				)	
				.append( // Ticket ID
					$("<div/>",{"class":"ticketIdBox colorMain-2 border-all-B-1 roundAll2","html":blankId.toString(16),id:"ticketId"})
				)
				.append( //Ticket Title
					$("<div/>",{"class":"ticketTitleBox ticketTitle",id:"title"}).html("Title of the ticket")
				)
				.append( // Ticket Body
					$("<div/>",{"class":"ticketBodyBox ",id:"body"}).html("Body of the ticket asdf asdfasdf asd fsasdfasdf <br>stuff asddddddd<br>")
				)
		);
var newPermissionTpl = $("<div/>",{"class":" colorMain-2 border-all-B-1 roundBottomRight4 ticketCategoryBox",id:"permInfo"}).html("On: Aug. 8, 1982")

admin = {
	"loadAllUsers":function(){
			Params.Content.html($("#generic").html());
			Tlb = Params.Content.find("#ticketListbody");
			$.getJSON("ajax/admin/users.php",{"allUsers":1},function(json){
				var display = $("<div/>");
				$.each(json.users,function(i,data){
					var userDisplay = newUserTpl.clone();
					userDisplay.find("#userDisplay").attr("id","userDisplay"+data.id)
					userDisplay.find("#ticketId").attr("id","userId-"+data.id).html(data.id);
					
					userDisplay.find("#title").attr("id","UserName-"+data.id).html(
						data.firstname + " " + data.lastname + " (" + data.username + " )"
					);
					userDisplay.find("#userPic").attr("id","userPic-"+data.id).css("background-image","url(http://www.gravatar.com/avatar/"+data.md5Email+"?s=32&d=identicon&r=g)");
					userDisplay.find("#body").attr("id","body-"+data.id).html(
						data.email_address+"<br/>"+data.joined
						
					);
					/*
					
					userDisplay.find("#tickCreatedBy").attr("id","user-"+value.id).html("By: "+value.firstname2+ " " + value.lastname2 );
					userDisplay.find("#tickCreatedOn").attr("id","tickCreatedOn-"+value.id).html("On: "+value.created_on);
					userDisplay.find("#tickCategory").attr("id","tickCategory-"+value.id).html(value.category);
					userDisplay.find("#tickLocation").attr("id","tickLocation-"+value.id).html(value.locationName);
					
					*/
					display.append(userDisplay);
				}); // End of creating the user boxes
				$.each(json.permissions,function(i,data){
					perm = newPermissionTpl.clone();
					perm.attr("id","permInfo."+data.user_id+"."+data.display).html(data.display);
					display.find("#userDisplay"+data.user_id).append(perm);
				});// end of displaying the permissions
				Tlb.append(display);		
			});	
	},"test":"cool"
};

admin.loadAllUsers()
